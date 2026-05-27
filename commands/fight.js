const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('fight')
    .setDescription('Fight someone! ⚔️')
    .addUserOption(o => o.setName('user').setDescription('Who to fight').setRequired(true)),
  async execute(interaction) {
    const user = interaction.options.getUser('user');
    const challenger = interaction.user;
    if (user.id === challenger.id) return interaction.reply({ content: '❌ You can\'t fight yourself bro 💀', ephemeral: true });

    const challengerHP = Math.floor(Math.random() * 50) + 50;
    const targetHP = Math.floor(Math.random() * 50) + 50;
    const winner = challengerHP > targetHP ? challenger : user;
    const loser = challengerHP > targetHP ? user : challenger;

    const moves = ['uppercut', 'roundhouse kick', 'headbutt', 'body slam', 'dropkick'];
    const move = moves[Math.floor(Math.random() * moves.length)];

    const embed = new EmbedBuilder()
      .setColor('#ED4245')
      .setTitle('⚔️ Fight!')
      .addFields(
        { name: `${challenger.username}`, value: `❤️ ${challengerHP} HP`, inline: true },
        { name: 'VS', value: '⚔️', inline: true },
        { name: `${user.username}`, value: `❤️ ${targetHP} HP`, inline: true },
        { name: '💥 Final Move', value: `${winner} hits a **${move}**!`, inline: false },
        { name: '🏆 Winner', value: `${winner} wins! ${loser} got destroyed! 💀`, inline: false },
      )
      .setTimestamp();
    await interaction.reply({ embeds: [embed] });
  },
};
