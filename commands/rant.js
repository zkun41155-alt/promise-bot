const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

const rants = [
  '{user} what on EARTH were you thinking?! My goldfish makes better decisions and it has a 3 second memory! 🐟',
  'OH. MY. GOODNESS. {user}! You absolute LEGEND of stupidity! Even my alarm clock has more sense and all it does is beep! ⏰',
  '{user}!! Are you KIDDING me right now?! I\'ve seen better decisions made by a blindfolded monkey throwing darts! 🎯',
  'EXCUSE ME?! {user} you absolute walnut!! My SHOE has more intelligence and it just sits there all day doing nothing! 👟',
  '{user} you NUMSKULL! What even was that?! I\'ve seen better plans from a toddler with a crayon and a dream! 🖍️',
  'OH COME ON {user}!! Are you for REAL right now?! Even autocorrect is embarrassed by you and it once corrected "hello" to "helicopter"! 🚁',
  '{user} YOU ABSOLUTE CLOWN!! 🤡 My WiFi router makes better connections than you and it disconnects every 5 minutes!!',
  'BROOOO {user}!! What in the name of burnt toast was that?! My cat knocks things off tables with more strategy than you!! 🐱',
  '{user} I am FLABBERGASTED! Genuinely! You have managed to be more confusing than IKEA instructions written in reverse!! 🪑',
  'OH WOW {user}!! Just... WOW!! You\'ve achieved a new level of chaos that scientists haven\'t even named yet!! 🔬',
  'LISTEN HERE {user}!! You beautiful disaster!! You\'ve outdone yourself in the most spectacularly wrong way possible!! 🌪️',
  '{user} you GOOFBALL!! I\'m not mad, I\'m just... actually no I\'m a little mad. Okay I\'m very mad. BUT ALSO IMPRESSED!! 😤',
];

module.exports = {
  data: new SlashCommandBuilder()
    .setName('rant')
    .setDescription('Bot goes on a funny rant at someone 😤')
    .addUserOption(o => o.setName('user').setDescription('Who to rant at').setRequired(true)),
  async execute(interaction) {
    const user = interaction.options.getUser('user');
    const rant = rants[Math.floor(Math.random() * rants.length)].replace(/{user}/g, user.toString());
    const embed = new EmbedBuilder()
      .setColor('#FF4500')
      .setTitle('😤 BOT IS RANTING!')
      .setDescription(rant)
      .setFooter({ text: 'Just for fun! No hate! 😄' })
      .setTimestamp();
    await interaction.reply({ embeds: [embed] });
  },
};
