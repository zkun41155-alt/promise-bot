const { SlashCommandBuilder, EmbedBuilder, PermissionFlagsBits } = require('discord.js');
const fs = require('fs');
const path = './data/warnings.json';

function loadWarnings() {
  if (!fs.existsSync('./data')) fs.mkdirSync('./data');
  if (!fs.existsSync(path)) fs.writeFileSync(path, '{}');
  return JSON.parse(fs.readFileSync(path));
}

module.exports = {
  data: new SlashCommandBuilder()
    .setName('warnings')
    .setDescription('View warnings for a user')
    .addUserOption(o => o.setName('user').setDescription('User to check').setRequired(true))
    .setDefaultMemberPermissions(PermissionFlagsBits.ModerateMembers),
  async execute(interaction) {
    const target = interaction.options.getUser('user');
    const warnings = loadWarnings();
    const key = `${interaction.guild.id}-${target.id}`;
    const userWarns = warnings[key] || [];

    const embed = new EmbedBuilder()
      .setColor('#FEE75C')
      .setTitle(`⚠️ Warnings for ${target.tag}`)
      .setDescription(userWarns.length === 0 ? 'No warnings found.' : userWarns.map((w, i) =>
        `**${i + 1}.** ${w.reason}\n> By ${w.mod} on ${new Date(w.date).toLocaleDateString()}`
      ).join('\n\n'))
      .setFooter({ text: `Total: ${userWarns.length} warning(s)` })
      .setTimestamp();

    await interaction.reply({ embeds: [embed] });
  },
};
