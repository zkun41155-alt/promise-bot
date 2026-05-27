const { SlashCommandBuilder, EmbedBuilder, PermissionFlagsBits } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('mute')
    .setDescription('Timeout (mute) a member')
    .addUserOption(o => o.setName('user').setDescription('User to mute').setRequired(true))
    .addIntegerOption(o => o.setName('minutes').setDescription('Duration in minutes').setRequired(true).setMinValue(1).setMaxValue(40320))
    .addStringOption(o => o.setName('reason').setDescription('Reason').setRequired(false))
    .setDefaultMemberPermissions(PermissionFlagsBits.ModerateMembers),
  async execute(interaction) {
    const target = interaction.options.getMember('user');
    const minutes = interaction.options.getInteger('minutes');
    const reason = interaction.options.getString('reason') || 'No reason provided';

    if (!target) return interaction.reply({ content: '❌ User not found.', ephemeral: true });
    if (!target.moderatable) return interaction.reply({ content: '❌ I cannot mute this user.', ephemeral: true });

    await target.timeout(minutes * 60 * 1000, reason);
    const embed = new EmbedBuilder()
      .setColor('#FEE75C')
      .setTitle('🔇 Member Muted')
      .addFields(
        { name: 'User', value: `${target.user.tag}`, inline: true },
        { name: 'Moderator', value: `${interaction.user.tag}`, inline: true },
        { name: 'Duration', value: `${minutes} minute(s)`, inline: true },
        { name: 'Reason', value: reason },
      )
      .setTimestamp();
    await interaction.reply({ embeds: [embed] });
  },
};
