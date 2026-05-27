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

const jobs = [
  { job: 'Pizza Delivery Driver', pay: [50, 150] },
  { job: 'Uber Driver', pay: [80, 200] },
  { job: 'Streamer', pay: [30, 300] },
  { job: 'YouTuber', pay: [40, 250] },
  { job: 'Software Developer', pay: [100, 300] },
  { job: 'Teacher', pay: [60, 150] },
  { job: 'Chef', pay: [70, 180] },
  { job: 'Doctor', pay: [150, 400] },
  { job: 'Janitor', pay: [30, 100] },
  { job: 'Stock Trader', pay: [50, 500] },
];

module.exports = {
  data: new SlashCommandBuilder()
    .setName('work')
    .setDescription('Work to earn coins! 💼'),
  async execute(interaction) {
    const economy = loadEconomy();
    const user = getUser(economy, interaction.guild.id, interaction.user.id);
    const now = Date.now();
    const cooldown = 3600000; // 1 hour

    if (now - user.lastWork < cooldown) {
      const left = cooldown - (now - user.lastWork);
      const mins = Math.floor(left / 60000);
      return interaction.reply({ content: `⏳ You're tired! Rest for **${mins} minutes** before working again.`, ephemeral: true });
    }

    const job = jobs[Math.floor(Math.random() * jobs.length)];
    const earned = Math.floor(Math.random() * (job.pay[1] - job.pay[0])) + job.pay[0];
    user.coins += earned;
    user.lastWork = now;
    saveEconomy(economy);

    const embed = new EmbedBuilder()
      .setColor('#57F287')
      .setTitle('💼 Work Complete!')
      .setDescription(`You worked as a **${job.job}** and earned **${earned} coins**!`)
      .addFields({ name: '👛 New Balance', value: `${user.coins} coins`, inline: true })
      .setFooter({ text: 'You can work again in 1 hour!' })
      .setTimestamp();
    await interaction.reply({ embeds: [embed] });
  },
};
