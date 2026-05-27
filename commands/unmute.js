const { SlashCommandBuilder, EmbedBuilder, PermissionFlagsBits } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('unmute')
    .setDescription('Remove timeout from a member')
    .addUserOption(o => o.setName('user').setDescription('User to unmute').setRequired(true))
    .setDefaultMemberPermissions(PermissionFlagsBits.ModerateMembers),
  async execute(interaction) {
    const target = interaction.options.getMember('user');
    if (!target) return interaction.reply({ content: '❌ User not found.', ephemeral: true });
    if (!target.isCommunicationDisabled()) return interaction.reply({ content: '❌ This user is not muted.', ephemeral: true });

    await target.timeout(null);
    const embed = new EmbedBuilder()
      .setColor('#57F287')
      .setTitle('🔊 Member Unmuted')
      .addFields(
        { name: 'User', value: `${target.user.tag}`, inline: true },
        { name: 'Moderator', value: `${interaction.user.tag}`, inline: true },
      )
      .setTimestamp();
    await interaction.reply({ embeds: [embed] });
  },
};
