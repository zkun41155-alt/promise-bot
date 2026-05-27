const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const fs = require('fs');

function loadEconomy() {
  if (!fs.existsSync('./data')) fs.mkdirSync('./data');
  if (!fs.existsSync('./data/economy.json')) fs.writeFileSync('./data/economy.json', '{}');
  return JSON.parse(fs.readFileSync('./data/economy.json'));
}

module.exports = {
  data: new SlashCommandBuilder()
    .setName('richlist')
    .setDescription('See the richest members! 💰'),
  async execute(interaction) {
    const economy = loadEconomy();
    const entries = Object.entries(economy)
      .filter(([key]) => key.startsWith(interaction.guild.id))
      .map(([key, val]) => ({ userId: key.split('-')[1], total: val.coins + val.bank }))
      .sort((a, b) => b.total - a.total)
      .slice(0, 10);

    if (!entries.length) return interaction.reply({ content: '❌ No economy data yet!', ephemeral: true });

    const medals = ['🥇', '🥈', '🥉'];
    const rows = await Promise.all(entries.map(async (e, i) => {
      let tag = 'Unknown';
      try { const u = await interaction.client.users.fetch(e.userId); tag = u.tag; } catch {}
      return `${medals[i] || `**${i + 1}.**`} ${tag} — 🪙 ${e.total} coins`;
    }));

    const embed = new EmbedBuilder()
      .setColor('#F1C40F')
      .setTitle(`💰 Richest Members in ${interaction.guild.name}`)
      .setDescription(rows.join('\n'))
      .setTimestamp();
    await interaction.reply({ embeds: [embed] });
  },
};
