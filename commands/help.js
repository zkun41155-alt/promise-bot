const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('help')
    .setDescription('Shows all available commands'),
  cooldown: 5,
  async execute(interaction) {
    const embed = new EmbedBuilder()
      .setColor('#5865F2')
      .setTitle('📖 Bot Commands')
      .setDescription('Here are all available commands:')
      .addFields(
        { name: '🎉 Welcome & Server', value: '`/setwelcome` `/serverinfo` `/userinfo` `/roles`', inline: false },
        { name: '🎨 Embeds & Messages', value: '`/embed` `/say` `/announce`', inline: false },
        { name: '🔨 Moderation', value: '`/kick` `/ban` `/unban` `/mute` `/unmute` `/warn` `/warnings` `/clear`', inline: false },
        { name: '🎮 Fun', value: '`/8ball` `/roll` `/coinflip` `/roast` `/compliment` `/meme` `/joke`', inline: false },
        { name: '📊 Utility', value: '`/poll` `/remind` `/avatar` `/ping` `/botinfo` `/calc`', inline: false },
        { name: '🎵 Music (basic)', value: '`/play` `/skip` `/stop` `/queue` `/nowplaying`', inline: false },
        { name: '⭐ Leveling', value: '`/rank` `/leaderboard` `/setxp`', inline: false },
      )
      .setFooter({ text: `Requested by ${interaction.user.tag}`, iconURL: interaction.user.displayAvatarURL() })
      .setTimestamp();

    await interaction.reply({ embeds: [embed] });
  },
};
