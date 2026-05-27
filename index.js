const { Client, GatewayIntentBits, Collection, REST, Routes } = require('discord.js');
const fs = require('fs');
const path = require('path');
require('dotenv').config();

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildVoiceStates,
    GatewayIntentBits.GuildPresences,
    GatewayIntentBits.DirectMessages,
  ],
});

client.commands = new Collection();
client.cooldowns = new Collection();

// Load commands
const commandFiles = fs.readdirSync('./commands').filter(f => f.endsWith('.js'));
const commandsData = [];

for (const file of commandFiles) {
  const command = require(`./commands/${file}`);
  if (command.data && command.execute) {
    client.commands.set(command.data.name, command);
    commandsData.push(command.data.toJSON());
  }
}

// Load events
const eventFiles = fs.readdirSync('./events').filter(f => f.endsWith('.js'));
for (const file of eventFiles) {
  const event = require(`./events/${file}`);
  if (event.once) {
    client.once(event.name, (...args) => event.execute(...args, client));
  } else {
    client.on(event.name, (...args) => event.execute(...args, client));
  }
}

// Register slash commands
client.once('ready', async () => {
  console.log(`✅ Logged in as ${client.user.tag}`);
  const rest = new REST({ version: '10' }).setToken(process.env.BOT_TOKEN);
  try {
    console.log('🔄 Registering slash commands...');
    await rest.put(Routes.applicationCommands(client.user.id), { body: commandsData });
    console.log(`✅ Registered ${commandsData.length} slash commands globally.`);
  } catch (err) {
    console.error('❌ Failed to register commands:', err);
  }
});

// Handle interactions
client.on('interactionCreate', async interaction => {
  if (!interaction.isChatInputCommand()) return;
  const command = client.commands.get(interaction.commandName);
  if (!command) return;

  // Cooldown check
  const { cooldowns } = client;
  if (!cooldowns.has(command.data.name)) cooldowns.set(command.data.name, new Collection());
  const now = Date.now();
  const timestamps = cooldowns.get(command.data.name);
  const cooldownAmount = (command.cooldown || 3) * 1000;
  if (timestamps.has(interaction.user.id)) {
    const expiry = timestamps.get(interaction.user.id) + cooldownAmount;
    if (now < expiry) {
      const left = ((expiry - now) / 1000).toFixed(1);
      return interaction.reply({ content: `⏳ Wait **${left}s** before using \`/${command.data.name}\` again.`, ephemeral: true });
    }
  }
  timestamps.set(interaction.user.id, now);
  setTimeout(() => timestamps.delete(interaction.user.id), cooldownAmount);

  try {
    await command.execute(interaction, client);
  } catch (err) {
    console.error(err);
    const msg = { content: '❌ An error occurred while running this command.', ephemeral: true };
    if (interaction.replied || interaction.deferred) {
      await interaction.followUp(msg);
    } else {
      await interaction.reply(msg);
    }
  }
});

client.login(process.env.BOT_TOKEN);
