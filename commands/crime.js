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

const crimes = [
  'robbed a convenience store',
  'hacked into a bank',
  'sold fake NFTs',
  'stole a car',
  'ran a scam call center',
  'counterfeited money',
  'picked pockets at the mall',
];

module.exports = {
  data: new SlashCommandBuilder()
    .setName('crime')
    .setDescription('Commit a crime for big rewards... or big fines! 🦹'),
  async execute(interaction) {
    const economy = loadEconomy();
    const user = getUser(economy, interaction.guild.id, interaction.user.id);
    const now = Date.now();
    const cooldown = 7200000; // 2 hours

    if (now - user.lastCrime < cooldown) {
      const left = cooldown - (now - user.lastCrime);
      const mins = Math.floor(left / 60000);
      return interaction.reply({ content: `⏳ Lay low for **${mins} more minutes** before committing another crime!`, ephemeral: true });
    }

    const success = Math.random() > 0.4;
    const crime = crimes[Math.floor(Math.random() * crimes.length)];
    const amount = Math.floor(Math.random() * 400) + 100;
    user.lastCrime = now;

    if (success) {
      user.coins += amount;
      saveEconomy(economy);
      const embed = new EmbedBuilder()
        .setColor('#57F287')
        .setTitle('🦹 Crime Successful!')
        .setDescription(`You **${crime}** and got away with **${amount} coins**!`)
        .addFields({ name: '👛 New Balance', value: `${user.coins} coins`, inline: true })
        .setTimestamp();
      await interaction.reply({ embeds: [embed] });
    } else {
      const fine = Math.floor(amount / 2);
      user.coins = Math.max(0, user.coins - fine);
      saveEconomy(economy);
      const embed = new EmbedBuilder()
        .setColor('#ED4245')
        .setTitle('🚔 Caught by Police!')
        .setDescription(`You tried to **${crime}** but got caught! You paid a fine of **${fine} coins**!`)
        .addFields({ name: '👛 New Balance', value: `${user.coins} coins`, inline: true })
        .setTimestamp();
      await interaction.reply({ embeds: [embed] });
    }
  },
};
