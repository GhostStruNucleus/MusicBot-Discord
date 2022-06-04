const { DisTube } = require('distube')
const Discord = require('discord.js')
const { MessageEmbed } = require('discord.js');
const client = new Discord.Client({
  intents: [
    Discord.Intents.FLAGS.GUILDS,
    Discord.Intents.FLAGS.GUILD_MESSAGES,
    Discord.Intents.FLAGS.GUILD_VOICE_STATES
  ]
})
const fs = require('fs')
const config = require('./config.json')
const { SpotifyPlugin } = require('@distube/spotify')
const { SoundCloudPlugin } = require('@distube/soundcloud')
const { YtDlpPlugin } = require('@distube/yt-dlp')

client.config = require('./config.json')
client.distube = new DisTube(client, {
  leaveOnStop: false,
  emitNewSongOnly: true,
  emitAddSongWhenCreatingQueue: false,
  emitAddListWhenCreatingQueue: false,
  plugins: [
    new SpotifyPlugin({
      emitEventsAfterFetching: true
    }),
    new SoundCloudPlugin(),
    new YtDlpPlugin()
  ],
  youtubeDL: false
})
client.commands = new Discord.Collection()
client.aliases = new Discord.Collection()
client.emotes = config.emoji

fs.readdir('./commands/', (err, files) => {
  if (err) return console.log('Could not find any commands!')
  const jsFiles = files.filter(f => f.split('.').pop() === 'js')
  if (jsFiles.length <= 0) return console.log('Could not find any commands!')
  jsFiles.forEach(file => {
    const cmd = require(`./commands/${file}`)
    console.log(`Loaded ${file}`)
    client.commands.set(cmd.name, cmd)
    if (cmd.aliases) cmd.aliases.forEach(alias => client.aliases.set(alias, cmd.name))
  })
})

client.on('messageCreate', async message => {
  if (message.author.bot || !message.guild) return
  const prefix = config.prefix
  if (!message.content.startsWith(prefix)) return
  const args = message.content.slice(prefix.length).trim().split(/ +/g)
  const command = args.shift().toLowerCase()
  const cmd = client.commands.get(command) || client.commands.get(client.aliases.get(command))
  if (!cmd) return
  if (cmd.inVoiceChannel && !message.member.voice.channel) {
    return message.channel.send(`${error} | You must be in a voice channel!`)
  }
  try {
    cmd.run(client, message, args)
  } catch (e) {
    console.error(e)
    message.channel.send(`${error} | Error: \`${e}\``)
  }
})

const status = (queue) =>
  `Volume: \`${queue.volume}%\` | Filter: \`${queue.filter || "Off"
  }\` | Loop: \`${queue.repeatMode
    ? queue.repeatMode == 2
      ? "All Queue"
      : "This Song"
    : "Off"
  }\` | Autoplay: \`${queue.autoplay ? "On" : "Off"}\``;
client.distube.on('playSong', (queue, song) => {
	const playSongEmbed = new Discord.MessageEmbed()
		.setTitle('Started Playing')
		.setDescription(`[${song.name}](${song.url})\n \n**Views:** \n${song.views}\n \n**Duration:** \n${song.formattedDuration} \n \n**Status** \n${status(queue)}`)
		.setThumbnail(song.thumbnail)
		.setColor("BLUE")
    queue.textChannel.send({embeds: [playSongEmbed]})
	//message.channel.send(playSongEmbed)
})
client.distube.on('addSong', (queue, song) => {
    const play = new Discord.MessageEmbed()
		.setColor("BLUE")
		.setTitle("Added to Queued")
		.setDescription(`[${song.name}](${song.url})`)
		.addField(`**Duration:**`, song.formattedDuration)
		.addField(`**Added By**`, song.user.username)
		.addField(`**Status**`, status(queue))
		.setThumbnail(song.thumbnail)
		queue.textChannel.send({embeds: [play]})
})
client.distube.on('addList', (queue, playlist) =>
    queue.textChannel.send(
      `${success} | Added \`${playlist.name}\` playlist (${
        playlist.songs.length
      } songs) to queue\n${status(queue)}`
    )
)
client.distube.on('error', (channel, e) => {
    queue.textChannel.send(`${error} | An error encountered: ${e.toString().slice(0, 1974)}`)
    console.error(e)
})
client.distube.on('empty', channel => 
	queue.textChannel.send('Voice channel is empty! Leaving the channel...')
)
client.distube.on('searchNoResult', (message, query) =>
    queue.textChannel.send(`${error} | No result found for \`${query}\`!`)
)
client.distube.on('finish', queue => {
	queue.textChannel.send("Pa")
})

client.login(config.main_token)
