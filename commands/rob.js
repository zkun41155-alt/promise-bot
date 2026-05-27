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
    .setName('rob')
    .setDescription('Rob someone\'s wallet! 🔫')
    .addUserOption(o => o.setName('user').setDescription('Who to rob').setRequired(true)),
  async execute(interaction) {
    const target = interaction.options.getUser('user');
    if (target.id === interaction.user.id) return interaction.reply({ content: '❌ You can\'t rob yourself!', ephemeral: true });
    if (target.bot) return interaction.reply({ content: '❌ You can\'t rob a bot!', ephemeral: true });

    const economy = loadEconomy();
    const robber = getUser(economy, interaction.guild.id, interaction.user.id);
    const victim = getUser(economy, interaction.guild.id, target.id);

    if (victim.coins < 50) return interaction.reply({ content: `❌ ${target.username} is too broke to rob! They only have ${victim.coins} coins.`, ephemeral: true });

    const success = Math.random() > 0.45;
    if (success) {
      const stolen = Math.floor(Math.random() * Math.min(victim.coins * 0.3, 300)) + 50;
      robber.coins += stolen;
      victim.coins -= stolen;
      saveEconomy(economy);
      const embed = new EmbedBuilder()
        .setColor('#57F287')
        .setTitle('🔫 Robbery Successful!')
        .setDescription(`You robbed **${stolen} coins** from ${target}!`)
        .addFields({ name: '👛 Your Balance', value: `${robber.coins} coins`, inline: true })
        .setTimestamp();
      await interaction.reply({ embeds: [embed] });
    } else {
      const fine = Math.floor(Math.random() * 150) + 50;
      robber.coins = Math.max(0, robber.coins - fine);
      victim.coins += fine;
      saveEconomy(economy);
      const embed = new EmbedBuilder()
        .setColor('#ED4245')
        .setTitle('🚔 Robbery Failed!')
        .setDescription(`${target} caught you trying to rob them! You paid **${fine} coins** as a fine!`)
        .addFields({ name: '👛 Your Balance', value: `${robber.coins} coins`, inline: true })
        .setTimestamp();
      await interaction.reply({ embeds: [embed] });
    }
  },
};
