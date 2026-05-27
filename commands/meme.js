const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('meme')
    .setDescription('Get a random meme from Reddit'),
  cooldown: 5,
  async execute(interaction) {
    await interaction.deferReply();
    const subreddits = ['memes', 'dankmemes', 'me_irl', 'AdviceAnimals', 'funny'];
    const sub = subreddits[Math.floor(Math.random() * subreddits.length)];

    try {
      const res = await fetch(`https://www.reddit.com/r/${sub}/random.json?limit=1`, {
        headers: { 'User-Agent': 'DiscordBot/1.0' }
      });
      const data = await res.json();
      const post = data[0]?.data?.children[0]?.data;

      if (!post || post.over_18) {
        return interaction.editReply('❌ Could not fetch a meme. Try again!');
      }

      const embed = new EmbedBuilder()
        .setColor('#FF5700')
        .setTitle(post.title.slice(0, 256))
        .setImage(post.url)
        .setURL(`https://reddit.com${post.permalink}`)
        .addFields(
          { name: '👍', value: `${post.ups}`, inline: true },
          { name: '💬', value: `${post.num_comments}`, inline: true },
          { name: '📌 r/', value: sub, inline: true },
        )
        .setTimestamp();

      await interaction.editReply({ embeds: [embed] });
    } catch {
      await interaction.editReply('❌ Failed to fetch meme. Try again later.');
    }
  },
};
