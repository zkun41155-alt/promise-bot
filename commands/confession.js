const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('confession')
    .setDescription('Send an anonymous confession to the server 🤫')
    .addStringOption(o => o.setName('message').setDescription('Your confession').setRequired(true))
    .addChannelOption(o => o.setName('channel').setDescription('Where to send it').setRequired(false)),
  async execute(interaction) {
    const message = interaction.options.getString('message');
    const channel = interaction.options.getChannel('channel') || interaction.channel;

    const embed = new EmbedBuilder()
      .setColor('#9B59B6')
      .setTitle('🤫 Anonymous Confession')
      .setDescription(`*"${message}"*`)
      .setFooter({ text: 'Sent anonymously' })
      .setTimestamp();

    await channel.send({ embeds: [embed] });
    await interaction.reply({ content: '✅ Your confession was sent anonymously!', ephemeral: true });
  },
};
