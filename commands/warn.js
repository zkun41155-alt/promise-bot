const { SlashCommandBuilder, EmbedBuilder, PermissionFlagsBits } = require('discord.js');
const fs = require('fs');
const path = './data/warnings.json';

function loadWarnings() {
  if (!fs.existsSync('./data')) fs.mkdirSync('./data');
  if (!fs.existsSync(path)) fs.writeFileSync(path, '{}');
  return JSON.parse(fs.readFileSync(path));
}
function saveWarnings(data) {
  fs.writeFileSync(path, JSON.stringify(data, null, 2));
}

module.exports = {
  data: new SlashCommandBuilder()
    .setName('warn')
    .setDescription('Warn a member')
    .addUserOption(o => o.setName('user').setDescription('User to warn').setRequired(true))
    .addStringOption(o => o.setName('reason').setDescription('Reason').setRequired(true))
    .setDefaultMemberPermissions(PermissionFlagsBits.ModerateMembers),
  async execute(interaction) {
    const target = interaction.options.getUser('user');
    const reason = interaction.options.getString('reason');
    const warnings = loadWarnings();
    const key = `${interaction.guild.id}-${target.id}`;
    if (!warnings[key]) warnings[key] = [];
    warnings[key].push({ reason, mod: interaction.user.tag, date: new Date().toISOString() });
    saveWarnings(warnings);

    const embed = new EmbedBuilder()
      .setColor('#FEE75C')
      .setTitle('⚠️ Member Warned')
      .addFields(
        { name: 'User', value: `${target.tag}`, inline: true },
        { name: 'Moderator', value: `${interaction.user.tag}`, inline: true },
        { name: 'Total Warnings', value: `${warnings[key].length}`, inline: true },
        { name: 'Reason', value: reason },
      )
      .setTimestamp();
    await interaction.reply({ embeds: [embed] });

    try {
      await target.send(`⚠️ You were warned in **${interaction.guild.name}** for: **${reason}**`);
    } catch {}
  },
};
