const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('whowouldwin')
    .setDescription('Who would win in a fight? ⚔️')
    .addStringOption(o => o.setName('option1').setDescription('First option').setRequired(true))
    .addStringOption(o => o.setName('option2').setDescription('Second option').setRequired(true)),
  async execute(interaction) {
    const opt1 = interaction.options.getString('option1');
    const opt2 = interaction.options.getString('option2');
    const percent1 = Math.floor(Math.random() * 91) + 5;
    const percent2 = 100 - percent1;
    const winner = percent1 > percent2 ? opt1 : opt2;
    const bar1 = '🟩'.repeat(Math.floor(percent1 / 10)) + '⬜'.repeat(10 - Math.floor(percent1 / 10));
    const bar2 = '🟥'.repeat(Math.floor(percent2 / 10)) + '⬜'.repeat(10 - Math.floor(percent2 / 10));

    const embed = new EmbedBuilder()
      .setColor('#ED4245')
      .setTitle('⚔️ Who Would Win?')
      .addFields(
        { name: `🥊 ${opt1}`, value: `${bar1} **${percent1}%**`, inline: false },
        { name: `🥊 ${opt2}`, value: `${bar2} **${percent2}%**`, inline: false },
        { name: '🏆 Winner', value: `**${winner}** wins!`, inline: false },
      )
      .setTimestamp();
    await interaction.reply({ embeds: [embed] });
  },
};
