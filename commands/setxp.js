const { SlashCommandBuilder, EmbedBuilder, PermissionFlagsBits } = require('discord.js');
const fs = require('fs');
const path = './data/xp.json';

function loadXP() {
  if (!fs.existsSync('./data')) fs.mkdirSync('./data');
  if (!fs.existsSync(path)) fs.writeFileSync(path, '{}');
  return JSON.parse(fs.readFileSync(path));
}
function saveXP(data) { fs.writeFileSync(path, JSON.stringify(data, null, 2)); }

module.exports = {
  data: new SlashCommandBuilder()
    .setName('setxp')
    .setDescription('Set XP for a user (admin only)')
    .addUserOption(o => o.setName('user').setDescription('User').setRequired(true))
    .addIntegerOption(o => o.setName('xp').setDescription('XP amount').setRequired(true).setMinValue(0))
    .setDefaultMemberPermissions(PermissionFlagsBits.Administrator),
  async execute(interaction) {
    const user = interaction.options.getUser('user');
    const xp = interaction.options.getInteger('xp');
    const xpData = loadXP();
    const key = `${interaction.guild.id}-${user.id}`;
    if (!xpData[key]) xpData[key] = { xp: 0, level: 0, lastMessage: 0 };
    xpData[key].xp = xp;
    xpData[key].level = Math.floor(0.1 * Math.sqrt(xp));
    saveXP(xpData);

    const embed = new EmbedBuilder()
      .setColor('#57F287')
      .setTitle('✅ XP Updated')
      .addFields(
        { name: 'User', value: user.tag, inline: true },
        { name: 'New XP', value: `${xp}`, inline: true },
        { name: 'New Level', value: `${xpData[key].level}`, inline: true },
      )
      .setTimestamp();
    await interaction.reply({ embeds: [embed] });
  },
};
