const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('kiss')
    .setDescription('Kiss someone 😘')
    .addUserOption(o => o.setName('user').setDescription('Who to kiss').setRequired(true)),
  async execute(interaction) {
    const user = interaction.options.getUser('user');
    const gifs = [
      'https://media.tenor.com/yBOcBiRjADEAAAAC/anime-kiss.gif',
      'https://media.tenor.com/s7PeHHCzrDUAAAAC/kiss-anime.gif',
    ];
    const embed = new EmbedBuilder()
      .setColor('#FF69B4')
      .setTitle('😘 Kiss!')
      .setDescription(`${interaction.user} kissed ${user}! 💋`)
      .setImage(gifs[Math.floor(Math.random() * gifs.length)])
      .setTimestamp();
    await interaction.reply({ embeds: [embed] });
  },
};
