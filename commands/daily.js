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
    .setName('daily')
    .setDescription('Claim your daily coins! 📅'),
  async execute(interaction) {
    const economy = loadEconomy();
    const key = `${interaction.guild.id}-${interaction.user.id}`;
    const user = getUser(economy, interaction.guild.id, interaction.user.id);
    const now = Date.now();
    const cooldown = 86400000;

    if (now - user.lastDaily < cooldown) {
      const left = cooldown - (now - user.lastDaily);
      const hours = Math.floor(left / 3600000);
      const mins = Math.floor((left % 3600000) / 60000);
      return interaction.reply({ content: `⏳ You already claimed your daily! Come back in **${hours}h ${mins}m**`, ephemeral: true });
    }

    // Streak system
    if (now - user.lastDaily < cooldown * 2) {
      user.streak = (user.streak || 0) + 1;
    } else {
      user.streak = 1;
    }

    const baseCoins = 200;
    const streakBonus = Math.min(user.streak * 10, 200);
    const total = baseCoins + streakBonus;
    user.coins += total;
    user.lastDaily = now;
    saveEconomy(economy);

    const embed = new EmbedBuilder()
      .setColor('#F1C40F')
      .setTitle('📅 Daily Reward Claimed!')
      .addFields(
        { name: '🪙 Base Reward', value: `${baseCoins} coins`, inline: true },
        { name: '🔥 Streak Bonus', value: `+${streakBonus} coins`, inline: true },
        { name: '💰 Total Earned', value: `${total} coins`, inline: true },
        { name: '🔥 Current Streak', value: `${user.streak} day(s)`, inline: true },
        { name: '👛 New Balance', value: `${user.coins} coins`, inline: true },
      )
      .setFooter({ text: 'Come back tomorrow for more coins!' })
      .setTimestamp();
    await interaction.reply({ embeds: [embed] });
  },
};
