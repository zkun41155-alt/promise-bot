const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('help')
    .setDescription('Shows all available commands'),
  cooldown: 5,
  async execute(interaction) {
    const embed = new EmbedBuilder()
      .setColor('#5865F2')
      .setTitle('📖 ¿Promise? Bot — All Commands')
      .setThumbnail(interaction.client.user.displayAvatarURL())
      .addFields(
        { name: '🔨 Moderation', value: '`/kick` `/ban` `/unban` `/mute` `/unmute` `/warn` `/warnings` `/clear` `/lock` `/unlock` `/slowmode` `/nuke` `/nickname`', inline: false },
        { name: '🎨 Embeds & Announcements', value: '`/embed` `/say` `/announce`', inline: false },
        { name: '🎉 Server Info', value: '`/setwelcome` `/serverinfo` `/userinfo` `/roles` `/avatar`', inline: false },
        { name: '💰 Economy', value: '`/balance` `/daily` `/weekly` `/work` `/crime` `/rob` `/give` `/richlist`', inline: false },
        { name: '🎰 Games & Gambling', value: '`/slots` `/blackjack` `/gamble` `/rps` `/trivia` `/wyr` `/truth` `/dare`', inline: false },
        { name: '💘 Social & Actions', value: '`/ship` `/hug` `/kiss` `/slap` `/fight` `/marry` `/steal`', inline: false },
        { name: '😂 Fun & Rates', value: '`/8ball` `/roll` `/coinflip` `/joke` `/meme` `/roast` `/compliment` `/hack` `/gayrate` `/iq` `/howcringe`', inline: false },
        { name: '📋 Utility', value: '`/poll` `/remind` `/calc` `/quote` `/wordcount` `/ping` `/botinfo`', inline: false },
        { name: '⭐ Leveling', value: '`/rank` `/leaderboard` `/setxp`', inline: false },
      )
      .setFooter({ text: `Requested by ${interaction.user.tag}`, iconURL: interaction.user.displayAvatarURL() })
      .setTimestamp();
    await interaction.reply({ embeds: [embed] });
  },
};
