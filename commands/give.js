const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const fs = require('fs');

function loadEconomy() {
  if (!fs.existsSync('./data')) fs.mkdirSync('./data');
  if (!fs.existsSync('./data/economy.json')) fs.writeFileSync('./data/economy.json', '{}');
  return JSON.parse(fs.readFileSync('./data/economy.json'));
}
function saveEconomy(data) { fs.writeFileSync('./data/economy.json', JSON.stringify(data, null, 2)); }
function getUser(data, guildId, userId) {
  const key = `${guildId}-${userId}`;
  if (!data[key]) data[key] = { coins: 100, bank: 0, lastDaily: 0, lastWeekly: 0, lastWork: 0, lastCrime: 0, streak: 0 };
  return data[key];
}

module.exports = {
  data: new SlashCommandBuilder()
    .setName('give')
    .setDescription('Give coins to someone 🎁')
    .addUserOption(o => o.setName('user').setDescription('Who to give coins to').setRequired(true))
    .addIntegerOption(o => o.setName('amount').setDescription('How many coins').setRequired(true).setMinValue(1)),
  async execute(interaction) {
    const target = interaction.options.getUser('user');
    const amount = interaction.options.getInteger('amount');
    if (target.id === interaction.user.id) return interaction.reply({ content: '❌ You can\'t give coins to yourself!', ephemeral: true });
    if (target.bot) return interaction.reply({ content: '❌ You can\'t give coins to a bot!', ephemeral: true });

    const economy = loadEconomy();
    const giver = getUser(economy, interaction.guild.id, interaction.user.id);
    const receiver = getUser(economy, interaction.guild.id, target.id);

    if (giver.coins < amount) return interaction.reply({ content: `❌ You only have **${giver.coins} coins**!`, ephemeral: true });

    giver.coins -= amount;
    receiver.coins += amount;
    saveEconomy(economy);

    const embed = new EmbedBuilder()
      .setColor('#57F287')
      .setTitle('🎁 Coins Given!')
      .setDescription(`${interaction.user} gave **${amount} coins** to ${target}!`)
      .addFields(
        { name: '👛 Your Balance', value: `${giver.coins} coins`, inline: true },
        { name: `${target.username}'s Balance`, value: `${receiver.coins} coins`, inline: true },
      )
      .setTimestamp();
    await interaction.reply({ embeds: [embed] });
  },
};
