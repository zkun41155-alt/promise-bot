const { SlashCommandBuilder, PermissionFlagsBits } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('say')
    .setDescription('Make the bot say something')
    .addStringOption(o => o.setName('message').setDescription('Message to say').setRequired(true))
    .addChannelOption(o => o.setName('channel').setDescription('Channel to send to').setRequired(false))
    .setDefaultMemberPermissions(PermissionFlagsBits.ManageMessages),
  async execute(interaction) {
    const message = interaction.options.getString('message');
    const channel = interaction.options.getChannel('channel') || interaction.channel;

    await channel.send(message);
    await interaction.reply({ content: `✅ Message sent to ${channel}`, ephemeral: true });
  },
};
