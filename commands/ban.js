const { SlashCommandBuilder, EmbedBuilder, PermissionFlagsBits } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('ban')
    .setDescription('Ban a member from the server')
    .addUserOption(o => o.setName('user').setDescription('User to ban').setRequired(true))
    .addStringOption(o => o.setName('reason').setDescription('Reason for ban').setRequired(false))
    .addIntegerOption(o => o.setName('days').setDescription('Delete message history (days 0-7)').setMinValue(0).setMaxValue(7).setRequired(false))
    .setDefaultMemberPermissions(PermissionFlagsBits.BanMembers),
  async execute(interaction) {
    await interaction.deferReply();

    const targetUser = interaction.options.getUser('user');
    const reason = interaction.options.getString('reason') || 'No reason provided';
    const days = interaction.options.getInteger('days') ?? 0;

    // Check if bot has ban permission
    if (!interaction.guild.members.me.permissions.has(PermissionFlagsBits.BanMembers)) {
      return interaction.editReply({ content: '❌ I don\'t have the **Ban Members** permission. Please give me that permission in Server Settings → Roles.' });
    }

    // Check if user is in the server
    const targetMember = interaction.guild.members.cache.get(targetUser.id);

    if (targetMember) {
      // Check role hierarchy
      if (targetMember.roles.highest.position >= interaction.guild.members.me.roles.highest.position) {
        return interaction.editReply({ content: `❌ I can't ban **${targetUser.tag}** because their role is equal to or higher than mine. Move my role above theirs in Server Settings → Roles.` });
      }

      // Check if target is the server owner
      if (targetMember.id === interaction.guild.ownerId) {
        return interaction.editReply({ content: '❌ I cannot ban the server owner.' });
      }

      // Check if moderator has higher role than target
      if (interaction.member.roles.highest.position <= targetMember.roles.highest.position && interaction.user.id !== interaction.guild.ownerId) {
        return interaction.editReply({ content: `❌ You can't ban **${targetUser.tag}** because their role is equal to or higher than yours.` });
      }
    }

    try {
      // Try to DM the user before banning
      try {
        await targetUser.send(`🔨 You have been **banned** from **${interaction.guild.name}**.\n**Reason:** ${reason}`);
      } catch {
        // User has DMs off, continue anyway
      }

      await interaction.guild.members.ban(targetUser.id, {
        deleteMessageSeconds: days * 86400,
        reason: `${reason} | Banned by ${interaction.user.tag}`
      });

      const embed = new EmbedBuilder()
        .setColor('#ED4245')
        .setTitle('🔨 Member Banned')
        .setThumbnail(targetUser.displayAvatarURL({ dynamic: true }))
        .addFields(
          { name: '👤 User', value: `${targetUser.tag} (${targetUser.id})`, inline: true },
          { name: '🛡️ Moderator', value: `${interaction.user.tag}`, inline: true },
          { name: '📅 Date', value: `<t:${Math.floor(Date.now() / 1000)}:F>`, inline: false },
          { name: '🗑️ Messages Deleted', value: `${days} day(s)`, inline: true },
          { name: '📋 Reason', value: reason, inline: false },
        )
        .setTimestamp();

      await interaction.editReply({ embeds: [embed] });

    } catch (err) {
      console.error('Ban error:', err);
      await interaction.editReply({ content: `❌ Failed to ban **${targetUser.tag}**. Error: ${err.message}` });
    }
  },
};
