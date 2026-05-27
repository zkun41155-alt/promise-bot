const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

const compliments = [
  '{user} is genuinely one of the coolest people around! 🌟',
  'The world is a better place with {user} in it. 💫',
  '{user} radiates good energy and everyone notices.',
  'Spending time with {user} is always the highlight of the day.',
  '{user} has an amazing ability to make everyone feel welcome.',
  '{user} is smarter than they give themselves credit for.',
  'Everything {user} does, they do with heart. ❤️',
  "{user}'s smile is genuinely contagious.",
  '{user} is the kind of person legends are made of. 🏆',
  'If {user} was a song, they\'d be everyone\'s favourite. 🎵',
  '{user} could make even a bad day feel like sunshine. ☀️',
  'Meeting {user} is genuinely one of life\'s great gifts.',
  '{user} has a level of coolness that most people can only dream of.',
  'The universe clearly put extra effort into making {user}. ✨',
  '{user} is proof that some people are just built different — in the best way.',
  'If loyalty had a face, it would look exactly like {user}.',
  '{user} doesn\'t just light up a room — they light up everyone in it. 💡',
  'There\'s something about {user} that just makes you want to be a better person.',
  '{user} is that rare kind of human that actually makes a difference. 🌍',
  'Honestly? {user} is just built for greatness. 👑',
];

module.exports = {
  data: new SlashCommandBuilder()
    .setName('compliment')
    .setDescription('Compliment someone! 💖')
    .addUserOption(o => o.setName('user').setDescription('Who to compliment').setRequired(true)),
  async execute(interaction) {
    const user = interaction.options.getUser('user');
    const compliment = compliments[Math.floor(Math.random() * compliments.length)].replace(/{user}/g, user.toString());
    const embed = new EmbedBuilder()
      .setColor('#57F287')
      .setTitle('💖 Compliment!')
      .setDescription(compliment)
      .setTimestamp();
    await interaction.reply({ embeds: [embed] });
  },
};
