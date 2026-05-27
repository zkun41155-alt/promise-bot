const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

const responses8ball = [
  '✅ It is certain.', '✅ It is decidedly so.', '✅ Without a doubt.', '✅ Yes definitely.',
  '✅ You may rely on it.', '✅ As I see it, yes.', '✅ Most likely.', '✅ Outlook good.',
  '✅ Yes.', '✅ Signs point to yes.', '⚠️ Reply hazy, try again.', '⚠️ Ask again later.',
  '⚠️ Better not tell you now.', '⚠️ Cannot predict now.', '⚠️ Concentrate and ask again.',
  '❌ Don\'t count on it.', '❌ My reply is no.', '❌ My sources say no.',
  '❌ Outlook not so good.', '❌ Very doubtful.',
];

const jokes = [
  'Why don\'t scientists trust atoms? Because they make up everything!',
  'I told my wife she was drawing her eyebrows too high. She looked surprised.',
  'Why can\'t you give Elsa a balloon? Because she\'ll let it go.',
  'I asked the librarian if they had books about paranoia. She whispered, "They\'re right behind you!"',
  'What do you call fake spaghetti? An impasta.',
  'Why did the scarecrow win an award? Because he was outstanding in his field.',
];

const roasts = [
  '{user} is the human equivalent of a participation trophy.',
  'I\'d roast {user} but my mom said I\'m not allowed to burn trash.',
  '{user} has the charisma of a wet paper bag.',
  'If {user} were any more basic, they\'d be pH 14.',
  '{user}\'s brain is like a browser with 100 tabs open, all of them loading.',
];

const compliments = [
  '{user} is genuinely one of the coolest people around!',
  'The world is a better place with {user} in it. 🌟',
  '{user} radiates good energy and everyone notices.',
  'Spending time with {user} is always the highlight of the day.',
  '{user} has an amazing ability to make everyone feel welcome.',
];

module.exports = {
  data: new SlashCommandBuilder()
    .setName('8ball')
    .setDescription('Ask the magic 8-ball a question')
    .addStringOption(o => o.setName('question').setDescription('Your question').setRequired(true)),
  async execute(interaction) {
    const question = interaction.options.getString('question');
    const answer = responses8ball[Math.floor(Math.random() * responses8ball.length)];
    const embed = new EmbedBuilder()
      .setColor('#5865F2')
      .setTitle('🎱 Magic 8-Ball')
      .addFields({ name: '❓ Question', value: question }, { name: '🎱 Answer', value: answer })
      .setTimestamp();
    await interaction.reply({ embeds: [embed] });
  },
};
