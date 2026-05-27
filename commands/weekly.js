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
    .setName('weekly')
    .setDescription('Claim your weekly coins! 📆'),
  async execute(interaction) {
    const economy = loadEconomy();
    const user = getUser(economy, interaction.guild.id, interaction.user.id);
    const now = Date.now();
    const cooldown = 604800000;

    if (now - user.lastWeekly < cooldown) {
      const left = cooldown - (now - user.lastWeekly);
      const days = Math.floor(left / 86400000);
      const hours = Math.floor((left % 86400000) / 3600000);
      return interaction.reply({ content: `⏳ Come back in **${days}d ${hours}h** for your weekly reward!`, ephemeral: true });
    }

    const reward = 1000;
    user.coins += reward;
    user.lastWeekly = now;
    saveEconomy(economy);

    const embed = new EmbedBuilder()
      .setColor('#9B59B6')
      .setTitle('📆 Weekly Reward Claimed!')
      .addFields(
        { name: '🪙 Reward', value: `${reward} coins`, inline: true },
        { name: '👛 New Balance', value: `${user.coins} coins`, inline: true },
      )
      .setFooter({ text: 'Come back in 7 days!' })
      .setTimestamp();
    await interaction.reply({ embeds: [embed] });
  },
};
