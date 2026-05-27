const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

const questions = [
  { q: 'What is the capital of Japan?', a: 'Tokyo', options: ['Beijing', 'Tokyo', 'Seoul', 'Bangkok'] },
  { q: 'How many sides does a hexagon have?', a: '6', options: ['5', '6', '7', '8'] },
  { q: 'What planet is closest to the Sun?', a: 'Mercury', options: ['Venus', 'Earth', 'Mercury', 'Mars'] },
  { q: 'Who painted the Mona Lisa?', a: 'Leonardo da Vinci', options: ['Picasso', 'Van Gogh', 'Leonardo da Vinci', 'Michelangelo'] },
  { q: 'What is the largest ocean?', a: 'Pacific', options: ['Atlantic', 'Indian', 'Pacific', 'Arctic'] },
  { q: 'How many bones are in the human body?', a: '206', options: ['196', '206', '216', '226'] },
  { q: 'What gas do plants absorb?', a: 'Carbon dioxide', options: ['Oxygen', 'Nitrogen', 'Carbon dioxide', 'Hydrogen'] },
  { q: 'What is the fastest land animal?', a: 'Cheetah', options: ['Lion', 'Horse', 'Cheetah', 'Leopard'] },
  { q: 'How many continents are there?', a: '7', options: ['5', '6', '7', '8'] },
  { q: 'What is the smallest country in the world?', a: 'Vatican City', options: ['Monaco', 'Vatican City', 'San Marino', 'Liechtenstein'] },
];

const emojis = ['1️⃣', '2️⃣', '3️⃣', '4️⃣'];

module.exports = {
  data: new SlashCommandBuilder()
    .setName('trivia')
    .setDescription('Answer a trivia question! 🧠'),
  async execute(interaction) {
    const q = questions[Math.floor(Math.random() * questions.length)];
    const shuffled = [...q.options].sort(() => Math.random() - 0.5);
    const answerIndex = shuffled.indexOf(q.a);

    const embed = new EmbedBuilder()
      .setColor('#F1C40F')
      .setTitle('🧠 Trivia Time!')
      .setDescription(`**${q.q}**\n\n${shuffled.map((o, i) => `${emojis[i]} ${o}`).join('\n')}`)
      .setFooter({ text: 'You have 15 seconds to react!' })
      .setTimestamp();

    const msg = await interaction.reply({ embeds: [embed], fetchReply: true });
    for (let i = 0; i < shuffled.length; i++) await msg.react(emojis[i]);

    const filter = (reaction, user) => emojis.includes(reaction.emoji.name) && !user.bot;
    const collector = msg.createReactionCollector({ filter, time: 15000, max: 1 });

    collector.on('collect', async (reaction, user) => {
      const chosen = emojis.indexOf(reaction.emoji.name);
      const correct = chosen === answerIndex;
      const result = new EmbedBuilder()
        .setColor(correct ? '#57F287' : '#ED4245')
        .setTitle(correct ? '✅ Correct!' : '❌ Wrong!')
        .setDescription(`${user} answered **${shuffled[chosen]}**\n\nThe correct answer was **${q.a}**`)
        .setTimestamp();
      await interaction.followUp({ embeds: [result] });
    });

    collector.on('end', collected => {
      if (collected.size === 0) {
        interaction.followUp({ content: `⏰ Time's up! The answer was **${q.a}**` });
      }
    });
  },
};
