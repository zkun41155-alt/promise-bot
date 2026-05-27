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

const symbols = ['🍒', '🍋', '🍊', '🍇', '⭐', '💎', '7️⃣'];

module.exports = {
  data: new SlashCommandBuilder()
    .setName('slots')
    .setDescription('Spin the slot machine! 🎰')
    .addIntegerOption(o => o.setName('bet').setDescription('How many coins to bet').setRequired(true).setMinValue(10).setMaxValue(1000)),
  async execute(interaction) {
    const bet = interaction.options.getInteger('bet');
    const economy = loadEconomy();
    const user = getUser(economy, interaction.guild.id, interaction.user.id);

    if (user.coins < bet) return interaction.reply({ content: `❌ You only have **${user.coins} coins**!`, ephemeral: true });

    const s1 = symbols[Math.floor(Math.random() * symbols.length)];
    const s2 = symbols[Math.floor(Math.random() * symbols.length)];
    const s3 = symbols[Math.floor(Math.random() * symbols.length)];

    let multiplier = 0;
    let result = '';

    if (s1 === s2 && s2 === s3) {
      if (s1 === '💎') { multiplier = 10; result = '💎 JACKPOT!! 💎'; }
      else if (s1 === '7️⃣') { multiplier = 7; result = '7️⃣ LUCKY SEVENS! 7️⃣'; }
      else { multiplier = 3; result = '🎉 THREE OF A KIND!'; }
    } else if (s1 === s2 || s2 === s3 || s1 === s3) {
      multiplier = 1.5;
      result = '✅ Two of a kind!';
    } else {
      result = '❌ No match. Better luck next time!';
    }

    const winnings = Math.floor(bet * multiplier);
    user.coins = user.coins - bet + winnings;
    saveEconomy(economy);

    const embed = new EmbedBuilder()
      .setColor(multiplier > 0 ? '#F1C40F' : '#ED4245')
      .setTitle('🎰 Slot Machine')
      .setDescription(`**[ ${s1} | ${s2} | ${s3} ]**\n\n${result}`)
      .addFields(
        { name: '💸 Bet', value: `${bet} coins`, inline: true },
        { name: multiplier > 0 ? '🎉 Won' : '💸 Lost', value: `${multiplier > 0 ? winnings : bet} coins`, inline: true },
        { name: '👛 Balance', value: `${user.coins} coins`, inline: true },
      )
      .setTimestamp();
    await interaction.reply({ embeds: [embed] });
  },
};
