const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

const locations = [
  'Your mom\'s house 😂',
  'McDonald\'s WiFi 🍔',
  'A library in Antarctica 🧊',
  'The moon 🌕',
  'Area 51 👽',
  'A Starbucks in Tokyo ☕',
  'Under your bed 🛏️',
  'The Bermuda Triangle 🔺',
  'A submarine in the Pacific 🌊',
  'Mars 🔴',
  'Your neighbor\'s house 👀',
  'A secret bunker 🏚️',
  'The Dark Web 💻',
  'A rooftop in New York 🗽',
  'Inside the Discord servers 📡',
];

const passwords = [
  'password123!',
  'iloveyou2024',
  'qwerty!@#',
  'monkey123',
  '123456789!',
  'letmein!!',
  'dragon2024',
  'sunshine!!',
  'princess123',
  'football!',
  'shadow123!',
  'master2024',
  'abc123456!',
  'superman!!',
  'batman2024',
];

const steps = [
  '🔍 Locating target...',
  '🌐 Bypassing firewall...',
  '💾 Accessing database...',
  '🔑 Cracking password...',
  '📂 Downloading files...',
  '🧹 Covering tracks...',
];

module.exports = {
  data: new SlashCommandBuilder()
    .setName('hack')
    .setDescription('Fake hack someone 💻 (just for fun!)')
    .addUserOption(o => o.setName('user').setDescription('Who to hack').setRequired(true)),
  async execute(interaction) {
    const user = interaction.options.getUser('user');
    await interaction.deferReply();

    let current = 0;
    const embed = new EmbedBuilder().setColor('#00FF00').setTitle(`💻 Hacking ${user.tag}...`).setDescription(steps[0]);
    const msg = await interaction.editReply({ embeds: [embed] });

    const interval = setInterval(async () => {
      current++;
      if (current >= steps.length) {
        clearInterval(interval);

        const location = locations[Math.floor(Math.random() * locations.length)];
        const password = passwords[Math.floor(Math.random() * passwords.length)];
        const cardNum = '**** **** **** ' + Math.floor(1000 + Math.random() * 9000);
        const email = `${user.username.toLowerCase().replace(/\s/g, '')}@gmail.com`;

        const done = new EmbedBuilder()
          .setColor('#00FF00')
          .setTitle(`✅ ${user.tag} has been hacked!`)
          .addFields(
            { name: '📧 Email', value: email, inline: true },
            { name: '🔑 Password', value: password, inline: true },
            { name: '💳 Card', value: cardNum, inline: true },
            { name: '📍 Location', value: location, inline: true },
          )
          .setFooter({ text: 'This is 100% fake and just for fun! 😄' })
          .setTimestamp();
        await msg.edit({ embeds: [done] });
      } else {
        embed.setDescription(steps.slice(0, current + 1).join('\n'));
        await msg.edit({ embeds: [embed] });
      }
    }, 1000);
  },
};
