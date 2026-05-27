const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('howcringe')
    .setDescription('How cringe is someone? 😬')
    .addUserOption(o => o.setName('user').setDescription('User to check').setRequired(false)),
  async execute(interaction) {
    const user = interaction.options.getUser('user') || interaction.user;
    const percent = Math.floor(Math.random() * 101);
    const bar = '😬'.repeat(Math.floor(percent / 10)) + '😎'.repeat(10 - Math.floor(percent / 10));
    let verdict = percent < 20 ? 'Totally cool 😎' : percent < 50 ? 'A little cringe 😅' : percent < 80 ? 'Pretty cringe 😬' : '𝗠𝗔𝗫𝗜𝗠𝗨𝗠 𝗖𝗥𝗜𝗡𝗚𝗘 💀';
    const embed = new EmbedBuilder()
      .setColor('#E67E22')
      .setTitle('😬 Cringe Meter')
      .setDescription(`${user} is **${percent}% cringe**\n\n${bar}\n\n${verdict}`)
      .setFooter({ text: 'Just for fun! 😄' })
      .setTimestamp();
    await interaction.reply({ embeds: [embed] });
  },
};
