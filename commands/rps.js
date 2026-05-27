const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('rps')
    .setDescription('Play Rock Paper Scissors against the bot! ✂️')
    .addStringOption(o => o.setName('choice').setDescription('Your choice').setRequired(true)
      .addChoices(
        { name: '🪨 Rock', value: 'rock' },
        { name: '📄 Paper', value: 'paper' },
        { name: '✂️ Scissors', value: 'scissors' },
      )),
  async execute(interaction) {
    const choices = ['rock', 'paper', 'scissors'];
    const emojis = { rock: '🪨', paper: '📄', scissors: '✂️' };
    const userChoice = interaction.options.getString('choice');
    const botChoice = choices[Math.floor(Math.random() * 3)];

    let result;
    if (userChoice === botChoice) result = "🤝 It's a tie!";
    else if (
      (userChoice === 'rock' && botChoice === 'scissors') ||
      (userChoice === 'paper' && botChoice === 'rock') ||
      (userChoice === 'scissors' && botChoice === 'paper')
    ) result = '🎉 You win!';
    else result = '🤖 Bot wins!';

    const embed = new EmbedBuilder()
      .setColor('#5865F2')
      .setTitle('✂️ Rock Paper Scissors')
      .addFields(
        { name: '👤 Your choice', value: `${emojis[userChoice]} ${userChoice}`, inline: true },
        { name: '🤖 Bot choice', value: `${emojis[botChoice]} ${botChoice}`, inline: true },
        { name: '🏆 Result', value: result, inline: false },
      )
      .setTimestamp();
    await interaction.reply({ embeds: [embed] });
  },
};
