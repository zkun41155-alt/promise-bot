const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('ship')
    .setDescription('Ship two users together 💘')
    .addUserOption(o => o.setName('user1').setDescription('First user').setRequired(true))
    .addUserOption(o => o.setName('user2').setDescription('Second user').setRequired(true)),
  async execute(interaction) {
    const user1 = interaction.options.getUser('user1');
    const user2 = interaction.options.getUser('user2');
    const percent = Math.floor(Math.random() * 101);
    const bar = '💗'.repeat(Math.floor(percent / 10)) + '🖤'.repeat(10 - Math.floor(percent / 10));
    let msg = percent < 30 ? '💔 Not a great match...' : percent < 60 ? '💛 There\'s potential!' : percent < 90 ? '💖 Great match!' : '💞 SOULMATES!!';
    const shipName = user1.username.slice(0, Math.ceil(user1.username.length / 2)) + user2.username.slice(Math.floor(user2.username.length / 2));
    const embed = new EmbedBuilder()
      .setColor('#FF69B4')
      .setTitle(`💘 Ship: ${shipName}`)
      .setDescription(`${user1} + ${user2}`)
      .addFields(
        { name: 'Love Meter', value: `${bar} **${percent}%**` },
        { name: 'Verdict', value: msg }
      )
      .setTimestamp();
    await interaction.reply({ embeds: [embed] });
  },
};
