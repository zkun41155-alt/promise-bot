const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

function parseTime(str) {
  const regex = /(\d+)(s|m|h|d)/g;
  let ms = 0, match;
  const units = { s: 1000, m: 60000, h: 3600000, d: 86400000 };
  while ((match = regex.exec(str)) !== null) ms += parseInt(match[1]) * units[match[2]];
  return ms;
}

module.exports = {
  data: new SlashCommandBuilder()
    .setName('remind')
    .setDescription('Set a reminder')
    .addStringOption(o => o.setName('time').setDescription('Time (e.g. 10m, 1h, 2d)').setRequired(true))
    .addStringOption(o => o.setName('message').setDescription('What to remind you about').setRequired(true)),
  async execute(interaction) {
    const timeStr = interaction.options.getString('time');
    const message = interaction.options.getString('message');
    const ms = parseTime(timeStr);

    if (!ms || ms < 1000) return interaction.reply({ content: '❌ Invalid time format. Use e.g. `10m`, `1h30m`, `2d`.', ephemeral: true });
    if (ms > 86400000 * 30) return interaction.reply({ content: '❌ Maximum reminder time is 30 days.', ephemeral: true });

    await interaction.reply({ content: `⏰ I'll remind you about **${message}** in **${timeStr}**!`, ephemeral: false });

    setTimeout(async () => {
      const embed = new EmbedBuilder()
        .setColor('#5865F2')
        .setTitle('⏰ Reminder!')
        .setDescription(`${interaction.user}, here's your reminder:\n\n**${message}**`)
        .setTimestamp();
      try {
        await interaction.channel.send({ content: `${interaction.user}`, embeds: [embed] });
      } catch {}
    }, ms);
  },
};
