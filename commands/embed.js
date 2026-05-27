const { SlashCommandBuilder, EmbedBuilder, PermissionFlagsBits } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('embed')
    .setDescription('Create a custom embed message')
    .addStringOption(o => o.setName('title').setDescription('Embed title').setRequired(true))
    .addStringOption(o => o.setName('description').setDescription('Embed description').setRequired(true))
    .addStringOption(o => o.setName('color').setDescription('Hex color (e.g. #FF0000)').setRequired(false))
    .addStringOption(o => o.setName('footer').setDescription('Footer text').setRequired(false))
    .addStringOption(o => o.setName('image').setDescription('Image URL').setRequired(false))
    .addStringOption(o => o.setName('thumbnail').setDescription('Thumbnail URL').setRequired(false))
    .setDefaultMemberPermissions(PermissionFlagsBits.ManageMessages),
  cooldown: 5,
  async execute(interaction) {
    const title = interaction.options.getString('title');
    const description = interaction.options.getString('description');
    const color = interaction.options.getString('color') || '#5865F2';
    const footer = interaction.options.getString('footer');
    const image = interaction.options.getString('image');
    const thumbnail = interaction.options.getString('thumbnail');

    const embed = new EmbedBuilder()
      .setTitle(title)
      .setDescription(description)
      .setTimestamp();

    try { embed.setColor(color); } catch { embed.setColor('#5865F2'); }
    if (footer) embed.setFooter({ text: footer });
    if (image) embed.setImage(image);
    if (thumbnail) embed.setThumbnail(thumbnail);

    await interaction.reply({ content: '✅ Embed sent!', ephemeral: true });
    await interaction.channel.send({ embeds: [embed] });
  },
};
