const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('wordcount')
    .setDescription('Count words and characters in a text 📝')
    .addStringOption(o => o.setName('text').setDescription('Text to analyze').setRequired(true)),
  async execute(interaction) {
    const text = interaction.options.getString('text');
    const words = text.trim().split(/\s+/).filter(Boolean).length;
    const chars = text.length;
    const charsNoSpace = text.replace(/\s/g, '').length;
    const sentences = text.split(/[.!?]+/).filter(Boolean).length;
    const embed = new EmbedBuilder()
      .setColor('#5865F2')
      .setTitle('📝 Word Count')
      .addFields(
        { name: '📊 Words', value: `${words}`, inline: true },
        { name: '🔤 Characters', value: `${chars}`, inline: true },
        { name: '🔡 Chars (no spaces)', value: `${charsNoSpace}`, inline: true },
        { name: '📖 Sentences', value: `${sentences}`, inline: true },
      )
      .setTimestamp();
    await interaction.reply({ embeds: [embed] });
  },
};
