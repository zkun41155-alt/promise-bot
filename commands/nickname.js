const { SlashCommandBuilder, EmbedBuilder, PermissionFlagsBits } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('nickname')
    .setDescription('Change someone\'s nickname 📝')
    .addUserOption(o => o.setName('user').setDescription('User').setRequired(true))
    .addStringOption(o => o.setName('nickname').setDescription('New nickname (leave empty to reset)').setRequired(false))
    .setDefaultMemberPermissions(PermissionFlagsBits.ManageNicknames),
  async execute(interaction) {
    const member = interaction.options.getMember('user');
    const nickname = interaction.options.getString('nickname') || null;
    if (!member.manageable) return interaction.reply({ content: '❌ I cannot change this user\'s nickname!', ephemeral: true });
    await member.setNickname(nickname);
    const embed = new EmbedBuilder()
      .setColor('#5865F2')
      .setTitle('📝 Nickname Changed')
      .addFields(
        { name: 'User', value: `${member}`, inline: true },
        { name: 'New Nickname', value: nickname || 'Reset to default', inline: true },
      )
      .setTimestamp();
    await interaction.reply({ embeds: [embed] });
  },
};
