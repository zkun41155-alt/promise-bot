const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

const questions = {
  easy: [
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
    { q: 'What color is the sky on a clear day?', a: 'Blue', options: ['Green', 'Blue', 'Purple', 'Red'] },
    { q: 'How many legs does a spider have?', a: '8', options: ['6', '8', '10', '12'] },
    { q: 'What is the capital of France?', a: 'Paris', options: ['London', 'Berlin', 'Paris', 'Rome'] },
    { q: 'What is H2O commonly known as?', a: 'Water', options: ['Salt', 'Water', 'Acid', 'Oil'] },
    { q: 'How many days are in a leap year?', a: '366', options: ['364', '365', '366', '367'] },
    { q: 'What is the largest planet in our solar system?', a: 'Jupiter', options: ['Saturn', 'Neptune', 'Jupiter', 'Uranus'] },
    { q: 'Who wrote Romeo and Juliet?', a: 'Shakespeare', options: ['Dickens', 'Shakespeare', 'Hemingway', 'Tolkien'] },
    { q: 'What is the chemical symbol for gold?', a: 'Au', options: ['Go', 'Gd', 'Au', 'Ag'] },
    { q: 'How many players are on a football team?', a: '11', options: ['9', '10', '11', '12'] },
    { q: 'What is the tallest mountain in the world?', a: 'Mount Everest', options: ['K2', 'Mount Everest', 'Kilimanjaro', 'Mont Blanc'] },
  ],
  medium: [
    { q: 'What is the speed of light in km/s?', a: '299,792', options: ['199,792', '299,792', '399,792', '499,792'] },
    { q: 'Which element has the atomic number 79?', a: 'Gold', options: ['Silver', 'Gold', 'Platinum', 'Copper'] },
    { q: 'What year did World War II end?', a: '1945', options: ['1943', '1944', '1945', '1946'] },
    { q: 'Who developed the theory of relativity?', a: 'Einstein', options: ['Newton', 'Einstein', 'Hawking', 'Bohr'] },
    { q: 'What is the longest river in the world?', a: 'Nile', options: ['Amazon', 'Nile', 'Yangtze', 'Mississippi'] },
    { q: 'How many chromosomes do humans have?', a: '46', options: ['42', '44', '46', '48'] },
    { q: 'What is the powerhouse of the cell?', a: 'Mitochondria', options: ['Nucleus', 'Mitochondria', 'Ribosome', 'Golgi body'] },
    { q: 'What language has the most native speakers?', a: 'Mandarin Chinese', options: ['English', 'Spanish', 'Mandarin Chinese', 'Hindi'] },
    { q: 'What is the half-life of Carbon-14?', a: '5,730 years', options: ['1,000 years', '5,730 years', '10,000 years', '50,000 years'] },
    { q: 'Which country invented pizza?', a: 'Italy', options: ['Greece', 'Italy', 'Spain', 'France'] },
    { q: 'What is the square root of 144?', a: '12', options: ['11', '12', '13', '14'] },
    { q: 'What planet has the most moons?', a: 'Saturn', options: ['Jupiter', 'Saturn', 'Uranus', 'Neptune'] },
    { q: 'What is the capital of Australia?', a: 'Canberra', options: ['Sydney', 'Melbourne', 'Canberra', 'Brisbane'] },
    { q: 'Who invented the telephone?', a: 'Alexander Graham Bell', options: ['Thomas Edison', 'Alexander Graham Bell', 'Nikola Tesla', 'James Watt'] },
    { q: 'What is the most abundant gas in Earth\'s atmosphere?', a: 'Nitrogen', options: ['Oxygen', 'Nitrogen', 'Carbon dioxide', 'Argon'] },
    { q: 'What is the hardest natural substance?', a: 'Diamond', options: ['Steel', 'Quartz', 'Diamond', 'Titanium'] },
    { q: 'In what year was the Eiffel Tower built?', a: '1889', options: ['1879', '1889', '1899', '1909'] },
    { q: 'What is the smallest bone in the human body?', a: 'Stapes', options: ['Femur', 'Stapes', 'Radius', 'Clavicle'] },
    { q: 'What is the chemical formula for table salt?', a: 'NaCl', options: ['KCl', 'NaCl', 'CaCl2', 'MgCl2'] },
    { q: 'Who was the first person to walk on the moon?', a: 'Neil Armstrong', options: ['Buzz Aldrin', 'Neil Armstrong', 'Yuri Gagarin', 'John Glenn'] },
    { q: 'How many strings does a standard guitar have?', a: '6', options: ['4', '5', '6', '7'] },
    { q: 'What is the currency of Japan?', a: 'Yen', options: ['Won', 'Yuan', 'Yen', 'Ringgit'] },
    { q: 'What is the pH of pure water?', a: '7', options: ['5', '6', '7', '8'] },
    { q: 'What is the largest desert in the world?', a: 'Antarctic Desert', options: ['Sahara', 'Arabian', 'Antarctic Desert', 'Gobi'] },
    { q: 'Who wrote the Harry Potter series?', a: 'J.K. Rowling', options: ['J.R.R. Tolkien', 'J.K. Rowling', 'C.S. Lewis', 'George R.R. Martin'] },
  ],
  hard: [
    { q: 'What is the Planck constant approximately equal to?', a: '6.626 × 10⁻³⁴ J·s', options: ['3.14 × 10⁻³⁴ J·s', '6.626 × 10⁻³⁴ J·s', '9.109 × 10⁻³¹ J·s', '1.602 × 10⁻¹⁹ J·s'] },
    { q: 'Which mathematician proved Fermat\'s Last Theorem in 1995?', a: 'Andrew Wiles', options: ['Andrew Wiles', 'Grigori Perelman', 'Terence Tao', 'John Nash'] },
    { q: 'What is the name of the protein that carries oxygen in red blood cells?', a: 'Hemoglobin', options: ['Myoglobin', 'Hemoglobin', 'Albumin', 'Fibrinogen'] },
    { q: 'In quantum mechanics, what does the Heisenberg Uncertainty Principle state?', a: 'Position and momentum cannot both be precisely known', options: ['Energy is always conserved', 'Position and momentum cannot both be precisely known', 'Light travels at constant speed', 'Matter cannot be created or destroyed'] },
    { q: 'What is the Schwarzschild radius of a black hole proportional to?', a: 'Its mass', options: ['Its volume', 'Its mass', 'Its temperature', 'Its spin'] },
    { q: 'Which programming language was created by Guido van Rossum?', a: 'Python', options: ['Ruby', 'Python', 'Perl', 'Lua'] },
    { q: 'What is the formula for the area of an ellipse?', a: 'πab', options: ['πr²', 'πab', '2πr', 'πa²b²'] },
    { q: 'What year was the first iPhone released?', a: '2007', options: ['2005', '2006', '2007', '2008'] },
    { q: 'What is the Fibonacci sequence rule?', a: 'Each number is the sum of the two before it', options: ['Each number doubles', 'Each number is the sum of the two before it', 'Each number is squared', 'Each number adds 10'] },
    { q: 'Which organ produces insulin?', a: 'Pancreas', options: ['Liver', 'Pancreas', 'Kidney', 'Spleen'] },
    { q: 'What is the name of the ship that sank in 1912?', a: 'RMS Titanic', options: ['RMS Lusitania', 'RMS Titanic', 'SS Normandie', 'RMS Queen Mary'] },
    { q: 'What does DNA stand for?', a: 'Deoxyribonucleic Acid', options: ['Deoxyribonucleic Acid', 'Diribonucleic Acid', 'Deoxyribonitric Acid', 'Dinitroribonucleic Acid'] },
    { q: 'What is the most dense element on the periodic table?', a: 'Osmium', options: ['Iridium', 'Osmium', 'Platinum', 'Gold'] },
    { q: 'Who formulated the laws of planetary motion?', a: 'Johannes Kepler', options: ['Galileo Galilei', 'Johannes Kepler', 'Tycho Brahe', 'Isaac Newton'] },
    { q: 'What is the name of the longest bone in the human body?', a: 'Femur', options: ['Tibia', 'Femur', 'Humerus', 'Fibula'] },
    { q: 'What is the chemical symbol for Tungsten?', a: 'W', options: ['Tu', 'Tg', 'W', 'Wg'] },
    { q: 'Which country has the most time zones?', a: 'France', options: ['Russia', 'USA', 'France', 'China'] },
    { q: 'What is the name of the galaxy closest to the Milky Way?', a: 'Andromeda', options: ['Triangulum', 'Andromeda', 'Whirlpool', 'Sombrero'] },
    { q: 'How many prime numbers are there between 1 and 50?', a: '15', options: ['13', '14', '15', '16'] },
    { q: 'What is the boiling point of nitrogen in Celsius?', a: '-196°C', options: ['-150°C', '-173°C', '-196°C', '-210°C'] },
    { q: 'Who invented the World Wide Web?', a: 'Tim Berners-Lee', options: ['Bill Gates', 'Tim Berners-Lee', 'Vint Cerf', 'Steve Jobs'] },
    { q: 'What is the name of the effect where light bends around massive objects?', a: 'Gravitational Lensing', options: ['Doppler Effect', 'Gravitational Lensing', 'Redshift', 'Refraction'] },
    { q: 'How many moons does Mars have?', a: '2', options: ['0', '1', '2', '3'] },
    { q: 'What is the largest known prime number type?', a: 'Mersenne prime', options: ['Fermat prime', 'Mersenne prime', 'Sophie Germain prime', 'Wilson prime'] },
    { q: 'What percentage of the human body is water?', a: '60%', options: ['45%', '55%', '60%', '75%'] },
    { q: 'What is the name of the process where plants make food?', a: 'Photosynthesis', options: ['Respiration', 'Photosynthesis', 'Osmosis', 'Transpiration'] },
    { q: 'In which year was the theory of evolution published by Darwin?', a: '1859', options: ['1839', '1849', '1859', '1869'] },
    { q: 'What is the atomic number of Carbon?', a: '6', options: ['4', '6', '8', '12'] },
    { q: 'What is the name of the boundary around a black hole?', a: 'Event Horizon', options: ['Singularity', 'Event Horizon', 'Photon Sphere', 'Ergosphere'] },
    { q: 'Which element is liquid at room temperature besides mercury?', a: 'Bromine', options: ['Gallium', 'Bromine', 'Cesium', 'Francium'] },
  ],
};

const emojis = ['1️⃣', '2️⃣', '3️⃣', '4️⃣'];
const difficultyColors = { easy: '#57F287', medium: '#FEE75C', hard: '#ED4245' };
const difficultyEmoji = { easy: '🟢', medium: '🟡', hard: '🔴' };

module.exports = {
  data: new SlashCommandBuilder()
    .setName('trivia')
    .setDescription('Answer a trivia question! 🧠')
    .addStringOption(o => o.setName('difficulty')
      .setDescription('Choose difficulty level')
      .setRequired(false)
      .addChoices(
        { name: '🟢 Easy', value: 'easy' },
        { name: '🟡 Medium', value: 'medium' },
        { name: '🔴 Hard - Genius Level', value: 'hard' },
      )),
  async execute(interaction) {
    const difficulty = interaction.options.getString('difficulty') || 'medium';
    const pool = questions[difficulty];
    const q = pool[Math.floor(Math.random() * pool.length)];
    const shuffled = [...q.options].sort(() => Math.random() - 0.5);
    const answerIndex = shuffled.indexOf(q.a);

    const embed = new EmbedBuilder()
      .setColor(difficultyColors[difficulty])
      .setTitle(`🧠 Trivia — ${difficultyEmoji[difficulty]} ${difficulty.charAt(0).toUpperCase() + difficulty.slice(1)}`)
      .setDescription(`**${q.q}**\n\n${shuffled.map((o, i) => `${emojis[i]} ${o}`).join('\n')}`)
      .setFooter({ text: 'You have 20 seconds to react!' })
      .setTimestamp();

    const msg = await interaction.reply({ embeds: [embed], fetchReply: true });
    for (let i = 0; i < shuffled.length; i++) await msg.react(emojis[i]);

    const filter = (reaction, user) => emojis.includes(reaction.emoji.name) && !user.bot;
    const collector = msg.createReactionCollector({ filter, time: 20000, max: 1 });

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
