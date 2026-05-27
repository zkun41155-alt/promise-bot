const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

const assumptions = [
  'You definitely text back within 0.2 seconds when you like someone.',
  'You laugh at your own jokes before finishing them.',
  'You have at least 3 unread notification bubbles you\'re ignoring right now.',
  'You say "I\'m fine" when you\'re clearly not fine.',
  'You pretend to be busy when someone calls you unexpectedly.',
  'You have a folder of memes you\'ve never sent to anyone.',
  'You talk to yourself when you\'re alone and it gets surprisingly deep.',
  'You rehearse conversations in your head that never actually happen.',
  'You remember the most embarrassing moment from 5 years ago randomly.',
  'You have strong opinions about which way toilet paper should hang.',
  'You quote movies/shows in real life and hope someone catches it.',
  'You press the elevator button multiple times thinking it goes faster.',
  'You hear a word and then suddenly see it everywhere.',
  'You have a "main character" playlist you listen to while walking.',
  'You\'ve googled a word you already know just to triple check.',
  'You silently judge people\'s music taste when they play it out loud.',
  'You have at least one skill that would surprise people.',
  'You make plans in your head that are way too ambitious.',
  'You hold the door for someone who\'s just a little too far away.',
  'You laugh at a meme alone at 2am like it\'s the funniest thing ever.',
];

module.exports = {
  data: new SlashCommandBuilder()
    .setName('assume')
    .setDescription('Bot makes assumptions about you 🔮')
    .addUserOption(o => o.setName('user').setDescription('Who to make assumptions about').setRequired(false)),
  async execute(interaction) {
    const user = interaction.options.getUser('user') || interaction.user;
    const assumption = assumptions[Math.floor(Math.random() * assumptions.length)];
    const embed = new EmbedBuilder()
      .setColor('#9B59B6')
      .setTitle(`🔮 Assumption about ${user.username}`)
      .setDescription(assumption)
      .setFooter({ text: 'Am I wrong though? 👀' })
      .setTimestamp();
    await interaction.reply({ embeds: [embed] });
  },
};
