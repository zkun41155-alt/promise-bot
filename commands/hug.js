const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('hug')
    .setDescription('Hug someone 🤗')
    .addUserOption(o => o.setName('user').setDescription('Who to hug').setRequired(true)),
  async execute(interaction) {
    const user = interaction.options.getUser('user');
    const gifs = [
      'https://media.tenor.com/BHlzBPvqgpYAAAAC/hug-anime.gif',
      'https://media.tenor.com/od_jxZhDMq4AAAAC/hug.gif',
    ];
    const embed = new EmbedBuilder()
      .setColor('#FF69B4')
      .setTitle('🤗 Hug!')
      .setDescription(`${interaction.user} gives ${user} a warm hug! 💖`)
      .setImage(gifs[Math.floor(Math.random() * gifs.length)])
      .setTimestamp();
    await interaction.reply({ embeds: [embed] });
  },
};
