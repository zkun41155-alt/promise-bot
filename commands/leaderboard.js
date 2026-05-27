const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const fs = require('fs');
const path = './data/xp.json';

function loadXP() {
  if (!fs.existsSync('./data')) fs.mkdirSync('./data');
  if (!fs.existsSync(path)) fs.writeFileSync(path, '{}');
  return JSON.parse(fs.readFileSync(path));
}
function getLevel(xp) { return Math.floor(0.1 * Math.sqrt(xp)); }

module.exports = {
  data: new SlashCommandBuilder()
    .setName('leaderboard')
    .setDescription('Show the XP leaderboard for this server'),
  async execute(interaction) {
    const xpData = loadXP();
    const guildEntries = Object.entries(xpData)
      .filter(([key]) => key.startsWith(interaction.guild.id))
      .map(([key, val]) => ({ userId: key.split('-')[1], xp: val.xp, level: getLevel(val.xp) }))
      .sort((a, b) => b.xp - a.xp)
      .slice(0, 10);

    if (!guildEntries.length) return interaction.reply({ content: '❌ No XP data yet.', ephemeral: true });

    const medals = ['🥇', '🥈', '🥉'];
    const rows = await Promise.all(guildEntries.map(async (e, i) => {
      let tag = `Unknown User`;
      try {
        const u = await interaction.client.users.fetch(e.userId);
        tag = u.tag;
      } catch {}
      return `${medals[i] || `**${i + 1}.**`} ${tag} — Level **${e.level}** (${Math.floor(e.xp)} XP)`;
    }));

    const embed = new EmbedBuilder()
      .setColor('#FEE75C')
      .setTitle(`🏆 ${interaction.guild.name} Leaderboard`)
      .setDescription(rows.join('\n'))
      .setTimestamp();
    await interaction.reply({ embeds: [embed] });
  },
};
