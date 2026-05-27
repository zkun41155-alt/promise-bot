const { SlashCommandBuilder, EmbedBuilder, PermissionFlagsBits } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('lock')
    .setDescription('Lock a channel 🔒')
    .addChannelOption(o => o.setName('channel').setDescription('Channel to lock (default: current)').setRequired(false))
    .addStringOption(o => o.setName('reason').setDescription('Reason').setRequired(false))
    .setDefaultMemberPermissions(PermissionFlagsBits.ManageChannels),
  async execute(interaction) {
    const channel = interaction.options.getChannel('channel') || interaction.channel;
    const reason = interaction.options.getString('reason') || 'No reason provided';
    await channel.permissionOverwrites.edit(interaction.guild.roles.everyone, { SendMessages: false });
    const embed = new EmbedBuilder()
      .setColor('#ED4245')
      .setTitle('🔒 Channel Locked')
      .setDescription(`${channel} has been locked!`)
      .addFields({ name: '📋 Reason', value: reason })
      .setTimestamp();
    await interaction.reply({ embeds: [embed] });
  },
};
