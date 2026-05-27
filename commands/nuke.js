const { SlashCommandBuilder, EmbedBuilder, PermissionFlagsBits } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('nuke')
    .setDescription('Delete and recreate a channel 💣')
    .addChannelOption(o => o.setName('channel').setDescription('Channel to nuke (default: current)').setRequired(false))
    .setDefaultMemberPermissions(PermissionFlagsBits.ManageChannels),
  async execute(interaction) {
    const channel = interaction.options.getChannel('channel') || interaction.channel;
    await interaction.reply({ content: `💣 Nuking ${channel}...`, ephemeral: true });
    const position = channel.position;
    const newChannel = await channel.clone();
    await newChannel.setPosition(position);
    await channel.delete();
    const embed = new EmbedBuilder()
      .setColor('#ED4245')
      .setTitle('💣 Channel Nuked!')
      .setDescription('This channel was nuked and recreated!')
      .setImage('https://media.tenor.com/ey0tgCGEBhYAAAAC/explosion-nuke.gif')
      .setTimestamp();
    await newChannel.send({ embeds: [embed] });
  },
};
