const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const fs = require('fs');
const path = './data/xp.json';

function loadXP() {
  if (!fs.existsSync('./data')) fs.mkdirSync('./data');
  if (!fs.existsSync(path)) fs.writeFileSync(path, '{}');
  return JSON.parse(fs.readFileSync(path));
}
function getLevel(xp) { return Math.floor(0.1 * Math.sqrt(xp)); }
function xpForLevel(l) { return Math.pow(l / 0.1, 2); }

module.exports = {
  data: new SlashCommandBuilder()
    .setName('rank')
    .setDescription('Check your or another user\'s rank')
    .addUserOption(o => o.setName('user').setDescription('User to check').setRequired(false)),
  async execute(interaction) {
    const user = interaction.options.getUser('user') || interaction.user;
    const xpData = loadXP();
    const key = `${interaction.guild.id}-${user.id}`;
    const data = xpData[key] || { xp: 0, level: 0 };
    const level = getLevel(data.xp);
    const currentLevelXP = xpForLevel(level);
    const nextLevelXP = xpForLevel(level + 1);
    const progress = data.xp - currentLevelXP;
    const needed = nextLevelXP - currentLevelXP;
    const percent = Math.min(100, Math.floor((progress / needed) * 100));
    const bar = '█'.repeat(Math.floor(percent / 10)) + '░'.repeat(10 - Math.floor(percent / 10));

    const embed = new EmbedBuilder()
      .setColor('#5865F2')
      .setTitle(`⭐ ${user.tag}'s Rank`)
      .setThumbnail(user.displayAvatarURL({ dynamic: true }))
      .addFields(
        { name: '🏆 Level', value: `${level}`, inline: true },
        { name: '✨ XP', value: `${Math.floor(data.xp)}`, inline: true },
        { name: '📈 Progress', value: `${bar} ${percent}%\n${Math.floor(progress)} / ${Math.floor(needed)} XP to level ${level + 1}` },
      )
      .setTimestamp();
    await interaction.reply({ embeds: [embed] });
  },
};
