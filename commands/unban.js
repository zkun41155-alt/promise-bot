const { SlashCommandBuilder, EmbedBuilder, PermissionFlagsBits } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('unban')
    .setDescription('Unban a user by ID')
    .addStringOption(o => o.setName('userid').setDescription('User ID to unban').setRequired(true))
    .addStringOption(o => o.setName('reason').setDescription('Reason').setRequired(false))
    .setDefaultMemberPermissions(PermissionFlagsBits.BanMembers),
  async execute(interaction) {
    const userId = interaction.options.getString('userid');
    const reason = interaction.options.getString('reason') || 'No reason provided';

    try {
      const user = await interaction.guild.bans.fetch(userId);
      await interaction.guild.members.unban(userId, reason);
      const embed = new EmbedBuilder()
        .setColor('#57F287')
        .setTitle('✅ Member Unbanned')
        .addFields(
          { name: 'User', value: `${user.user.tag}`, inline: true },
          { name: 'Moderator', value: `${interaction.user.tag}`, inline: true },
          { name: 'Reason', value: reason },
        )
        .setTimestamp();
      await interaction.reply({ embeds: [embed] });
    } catch {
      await interaction.reply({ content: '❌ User not found in ban list.', ephemeral: true });
    }
  },
};
