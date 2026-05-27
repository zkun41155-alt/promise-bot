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
    .setName('gamble')
    .setDescription('Gamble your coins! 🎲')
    .addIntegerOption(o => o.setName('bet').setDescription('Coins to gamble').setRequired(true).setMinValue(10).setMaxValue(5000)),
  async execute(interaction) {
    const bet = interaction.options.getInteger('bet');
    const economy = loadEconomy();
    const user = getUser(economy, interaction.guild.id, interaction.user.id);

    if (user.coins < bet) return interaction.reply({ content: `❌ You only have **${user.coins} coins**!`, ephemeral: true });

    const roll = Math.random();
    let multiplier, result, color;

    if (roll < 0.05) { multiplier = 5; result = '🌟 MEGA WIN! 5x multiplier!'; color = '#F1C40F'; }
    else if (roll < 0.20) { multiplier = 2; result = '🎉 Big Win! 2x multiplier!'; color = '#57F287'; }
    else if (roll < 0.45) { multiplier = 1.5; result = '✅ Win! 1.5x multiplier!'; color = '#57F287'; }
    else { multiplier = 0; result = '❌ You lost!'; color = '#ED4245'; }

    const winnings = Math.floor(bet * multiplier);
    user.coins = user.coins - bet + winnings;
    saveEconomy(economy);

    const embed = new EmbedBuilder()
      .setColor(color)
      .setTitle('🎲 Gamble')
      .setDescription(result)
      .addFields(
        { name: '💸 Bet', value: `${bet} coins`, inline: true },
        { name: multiplier > 0 ? '🎉 Won' : '💸 Lost', value: `${multiplier > 0 ? winnings : bet} coins`, inline: true },
        { name: '👛 Balance', value: `${user.coins} coins`, inline: true },
      )
      .setTimestamp();
    await interaction.reply({ embeds: [embed] });
  },
};
