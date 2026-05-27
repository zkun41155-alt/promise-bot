const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

const rizzLines = [
  'Are you a WiFi signal? Because I\'m feeling a strong connection. 📶',
  'Do you have a map? I keep getting lost in your eyes. 🗺️',
  'Are you a bank loan? Because you have my interest. 💰',
  'Is your name Google? Because you have everything I\'ve been searching for. 🔍',
  'Are you a keyboard? Because you\'re just my type. ⌨️',
  'Do you have a sunburn or are you always this hot? ☀️',
  'Are you a parking ticket? Because you\'ve got FINE written all over you. 🎫',
  'Is your name Bluetooth? Because I feel like we\'re connecting. 📡',
  'Are you a light switch? Because you turn me on. 💡',
  'Do you like science? Because we have great chemistry. ⚗️',
  'Are you a camera? Because every time I look at you I smile. 📸',
  'Is your name Wi-Fi? Because I\'m really feeling a connection. 💕',
  'Are you a magnet? Because I\'m attracted to you. 🧲',
  'Do you play chess? Because you\'ve got all the right moves. ♟️',
  'Are you a star? Because your beauty is out of this world. ⭐',
];

module.exports = {
  data: new SlashCommandBuilder()
    .setName('rizz')
    .setDescription('Get a rizz line to use 😏')
    .addUserOption(o => o.setName('user').setDescription('Who to rizz up').setRequired(false)),
  async execute(interaction) {
    const user = interaction.options.getUser('user');
    const line = rizzLines[Math.floor(Math.random() * rizzLines.length)];
    const embed = new EmbedBuilder()
      .setColor('#FF69B4')
      .setTitle('😏 Rizz Line')
      .setDescription(user ? `${interaction.user} to ${user}:\n\n*"${line}"*` : `*"${line}"*`)
      .setFooter({ text: 'Use responsibly 😂' })
      .setTimestamp();
    await interaction.reply({ embeds: [embed] });
  },
};
