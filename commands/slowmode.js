const { SlashCommandBuilder, EmbedBuilder, PermissionFlagsBits } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('slowmode')
    .setDescription('Set slowmode in a channel ⏱️')
    .addIntegerOption(o => o.setName('seconds').setDescription('Slowmode in seconds (0 to disable)').setRequired(true).setMinValue(0).setMaxValue(21600))
    .addChannelOption(o => o.setName('channel').setDescription('Channel (default: current)').setRequired(false))
    .setDefaultMemberPermissions(PermissionFlagsBits.ManageChannels),
  async execute(interaction) {
    const seconds = interaction.options.getInteger('seconds');
    const channel = interaction.options.getChannel('channel') || interaction.channel;
    await channel.setRateLimitPerUser(seconds);
    const embed = new EmbedBuilder()
      .setColor('#FEE75C')
      .setTitle('⏱️ Slowmode Updated')
      .setDescription(seconds === 0 ? `Slowmode disabled in ${channel}` : `Slowmode set to **${seconds}s** in ${channel}`)
      .setTimestamp();
    await interaction.reply({ embeds: [embed] });
  },
};
