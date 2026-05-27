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

function getCard() {
  const suits = ['♠️', '♥️', '♦️', '♣️'];
  const values = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'];
  return { suit: suits[Math.floor(Math.random() * 4)], value: values[Math.floor(Math.random() * 13)] };
}

function cardValue(card) {
  if (['J', 'Q', 'K'].includes(card.value)) return 10;
  if (card.value === 'A') return 11;
  return parseInt(card.value);
}

function handValue(hand) {
  let total = hand.reduce((sum, c) => sum + cardValue(c), 0);
  let aces = hand.filter(c => c.value === 'A').length;
  while (total > 21 && aces > 0) { total -= 10; aces--; }
  return total;
}

function formatHand(hand) {
  return hand.map(c => `${c.value}${c.suit}`).join(' ');
}

module.exports = {
  data: new SlashCommandBuilder()
    .setName('blackjack')
    .setDescription('Play Blackjack against the bot! 🃏')
    .addIntegerOption(o => o.setName('bet').setDescription('Coins to bet').setRequired(true).setMinValue(10).setMaxValue(1000)),
  async execute(interaction) {
    const bet = interaction.options.getInteger('bet');
    const economy = loadEconomy();
    const user = getUser(economy, interaction.guild.id, interaction.user.id);

    if (user.coins < bet) return interaction.reply({ content: `❌ You only have **${user.coins} coins**!`, ephemeral: true });

    const playerHand = [getCard(), getCard()];
    const dealerHand = [getCard(), getCard()];
    const playerTotal = handValue(playerHand);
    const dealerTotal = handValue(dealerHand);

    let result, won;
    if (playerTotal === 21) {
      result = '🃏 BLACKJACK! You win!';
      won = Math.floor(bet * 1.5);
    } else if (dealerTotal === 21) {
      result = '❌ Dealer Blackjack! You lose!';
      won = -bet;
    } else if (playerTotal > dealerTotal) {
      result = '🎉 You win!';
      won = bet;
    } else if (playerTotal === dealerTotal) {
      result = '🤝 Push! It\'s a tie!';
      won = 0;
    } else {
      result = '❌ Dealer wins!';
      won = -bet;
    }

    user.coins += won;
    saveEconomy(economy);

    const embed = new EmbedBuilder()
      .setColor(won > 0 ? '#57F287' : won === 0 ? '#FEE75C' : '#ED4245')
      .setTitle('🃏 Blackjack')
      .addFields(
        { name: '👤 Your Hand', value: `${formatHand(playerHand)} = **${playerTotal}**`, inline: true },
        { name: '🤖 Dealer Hand', value: `${formatHand(dealerHand)} = **${dealerTotal}**`, inline: true },
        { name: '🏆 Result', value: result, inline: false },
        { name: won >= 0 ? '🎉 Won' : '💸 Lost', value: `${Math.abs(won)} coins`, inline: true },
        { name: '👛 Balance', value: `${user.coins} coins`, inline: true },
      )
      .setTimestamp();
    await interaction.reply({ embeds: [embed] });
  },
};
