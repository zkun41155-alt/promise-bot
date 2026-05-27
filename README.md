# 🤖 Discord Bot

A fully-featured Discord bot with 25+ slash commands covering moderation, fun, leveling, embeds, announcements, and more.

---

## ✨ Features

| Category | Commands |
|---|---|
| 🎉 Welcome & Server | `/setwelcome`, `/serverinfo`, `/userinfo`, `/roles` |
| 🎨 Embeds & Messages | `/embed`, `/say`, `/announce` |
| 🔨 Moderation | `/kick`, `/ban`, `/unban`, `/mute`, `/unmute`, `/warn`, `/warnings`, `/clear` |
| 🎮 Fun | `/8ball`, `/roll`, `/coinflip`, `/roast`, `/compliment`, `/meme`, `/joke` |
| 📊 Utility | `/poll`, `/remind`, `/avatar`, `/ping`, `/botinfo`, `/calc` |
| ⭐ Leveling | `/rank`, `/leaderboard`, `/setxp` |

---

## 🚀 Setup Guide

### 1. Create a Discord Bot

1. Go to [Discord Developer Portal](https://discord.com/developers/applications)
2. Click **New Application** → name it → go to **Bot** tab
3. Click **Reset Token** → copy your token
4. Enable these **Privileged Gateway Intents**:
   - ✅ Server Members Intent
   - ✅ Message Content Intent
   - ✅ Presence Intent

### 2. Invite the Bot to Your Server

Use this URL (replace `YOUR_CLIENT_ID` with your app's Client ID from the General tab):

```
https://discord.com/oauth2/authorize?client_id=YOUR_CLIENT_ID&scope=bot+applications.commands&permissions=8
```

### 3. Install & Run

```bash
# Install dependencies
npm install

# Create your .env file
cp .env.example .env
# Then open .env and paste your bot token

# Start the bot
npm start

# Or for development with auto-restart
npm run dev
```

---

## 📁 Project Structure

```
discord-bot/
├── index.js              # Main entry point
├── package.json
├── .env                  # Your secrets (never share!)
├── .env.example          # Template for .env
├── commands/             # All slash commands
│   ├── help.js
│   ├── embed.js
│   ├── kick.js
│   ├── ban.js
│   └── ... (25+ commands)
├── events/               # Discord event handlers
│   ├── ready.js
│   ├── guildMemberAdd.js # Auto welcome messages
│   └── xpHandler.js      # XP gain on messages
└── data/                 # Auto-created runtime data
    ├── xp.json           # XP/leveling data
    ├── warnings.json     # Warning records
    └── config.json       # Per-server settings
```

---

## 🔧 Command Details

### Moderation
- `/kick @user [reason]` — Kick a member
- `/ban @user [reason] [days]` — Ban with optional message deletion
- `/unban <user_id>` — Unban by user ID
- `/mute @user <minutes> [reason]` — Timeout a member
- `/unmute @user` — Remove timeout
- `/warn @user <reason>` — Add a warning (DMs the user)
- `/warnings @user` — View all warnings for a user
- `/clear <amount> [@user]` — Bulk delete messages

### Embeds & Announcements
- `/embed <title> <description> [color] [footer] [image] [thumbnail]`
- `/say <message> [#channel]` — Send a plain message as the bot
- `/announce <title> <message> [#channel] [@ping]`

### Leveling System
- XP is earned automatically by chatting (1 min cooldown, 10–25 XP per message)
- `/rank [@user]` — View XP, level, and progress bar
- `/leaderboard` — Top 10 members by XP
- `/setxp @user <amount>` — Admin override

### Fun
- `/8ball <question>` — Magic 8-ball
- `/roll [sides] [count]` — Dice roller (e.g. 2d20)
- `/coinflip` — Heads or tails
- `/roast @user` — Friendly roast
- `/compliment @user` — Send a compliment
- `/meme` — Random meme from Reddit
- `/joke` — Random joke

### Utility
- `/poll <question> <opt1> <opt2> [opt3] [opt4]` — React-based poll
- `/remind <time> <message>` — e.g. `10m`, `1h30m`, `2d`
- `/avatar [@user]` — Get avatar with download links
- `/ping` — Bot latency
- `/botinfo` — Stats about the bot
- `/calc <expression>` — Math calculator (`sqrt`, `sin`, `cos`, `pi`, etc.)

---

## 🌍 Hosting Options

| Platform | Cost | Notes |
|---|---|---|
| [Railway](https://railway.app) | Free tier | Easiest, deploy from GitHub |
| [Render](https://render.com) | Free tier | Good uptime |
| [VPS (DigitalOcean/Hetzner)](https://hetzner.com) | ~$4/mo | Full control |
| Your own PC | Free | Only online when PC is on |

### Deploy to Railway (Recommended)
1. Push code to a GitHub repo (make sure `.env` is in `.gitignore`!)
2. Go to [railway.app](https://railway.app) → New Project → Deploy from GitHub
3. Add environment variable: `BOT_TOKEN` = your token
4. Done — it runs 24/7!

---

## 🔒 Security

- **Never share your `.env` file or bot token**
- The `.gitignore` already excludes `.env` and `data/`
- If you accidentally expose your token, immediately regenerate it in the Developer Portal

---

## 📝 Adding New Commands

1. Create a new file in `commands/`, e.g. `commands/mycommand.js`
2. Use this template:

```js
const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('mycommand')
    .setDescription('Does something cool')
    .addStringOption(o => o.setName('input').setDescription('Some input').setRequired(true)),
  cooldown: 5, // seconds
  async execute(interaction, client) {
    const input = interaction.options.getString('input');
    await interaction.reply({ content: `You said: ${input}` });
  },
};
```

3. Restart the bot — commands auto-register on startup.
