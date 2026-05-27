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
    .setName('balance')
    .setDescription('Check your coin balance 💰')
    .addUserOption(o => o.setName('user').setDescription('User to check').setRequired(false)),
  async execute(interaction) {
    const economy = loadEconomy();
    const target = interaction.options.getUser('user') || interaction.user;
    const user = getUser(economy, interaction.guild.id, target.id);
    const embed = new EmbedBuilder()
      .setColor('#F1C40F')
      .setTitle(`💰 ${target.username}'s Balance`)
      .setThumbnail(target.displayAvatarURL({ dynamic: true }))
      .addFields(
        { name: '👛 Wallet', value: `🪙 ${user.coins} coins`, inline: true },
        { name: '🏦 Bank', value: `🪙 ${user.bank} coins`, inline: true },
        { name: '💎 Total', value: `🪙 ${user.coins + user.bank} coins`, inline: true },
      )
      .setTimestamp();
    await interaction.reply({ embeds: [embed] });
  },
  loadEconomy, saveEconomy, getUser,
};
