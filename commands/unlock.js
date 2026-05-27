const { SlashCommandBuilder, EmbedBuilder, PermissionFlagsBits } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('unlock')
    .setDescription('Unlock a channel 🔓')
    .addChannelOption(o => o.setName('channel').setDescription('Channel to unlock (default: current)').setRequired(false))
    .setDefaultMemberPermissions(PermissionFlagsBits.ManageChannels),
  async execute(interaction) {
    const channel = interaction.options.getChannel('channel') || interaction.channel;
    await channel.permissionOverwrites.edit(interaction.guild.roles.everyone, { SendMessages: null });
    const embed = new EmbedBuilder()
      .setColor('#57F287')
      .setTitle('🔓 Channel Unlocked')
      .setDescription(`${channel} has been unlocked!`)
      .setTimestamp();
    await interaction.reply({ embeds: [embed] });
  },
};
