const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('calc')
    .setDescription('Calculate a math expression')
    .addStringOption(o => o.setName('expression').setDescription('Math expression (e.g. 2+2, 10*5, sqrt(16))').setRequired(true)),
  async execute(interaction) {
    const expr = interaction.options.getString('expression');

    // Safe evaluation - only allow math chars
    if (!/^[\d\s+\-*/().^%,a-z]+$/i.test(expr)) {
      return interaction.reply({ content: '❌ Invalid expression.', ephemeral: true });
    }

    try {
      // Replace common math functions
      const safe = expr
        .replace(/sqrt/g, 'Math.sqrt')
        .replace(/abs/g, 'Math.abs')
        .replace(/ceil/g, 'Math.ceil')
        .replace(/floor/g, 'Math.floor')
        .replace(/round/g, 'Math.round')
        .replace(/pow/g, 'Math.pow')
        .replace(/pi/gi, 'Math.PI')
        .replace(/log/g, 'Math.log')
        .replace(/sin/g, 'Math.sin')
        .replace(/cos/g, 'Math.cos')
        .replace(/tan/g, 'Math.tan');

      // eslint-disable-next-line no-eval
      const result = eval(safe);
      if (typeof result !== 'number' || isNaN(result)) throw new Error();

      const embed = new EmbedBuilder()
        .setColor('#57F287')
        .setTitle('🧮 Calculator')
        .addFields(
          { name: 'Expression', value: `\`${expr}\``, inline: true },
          { name: 'Result', value: `\`${result}\``, inline: true },
        )
        .setTimestamp();
      await interaction.reply({ embeds: [embed] });
    } catch {
      await interaction.reply({ content: '❌ Could not evaluate that expression.', ephemeral: true });
    }
  },
};
