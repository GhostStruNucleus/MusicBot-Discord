const { Constants } = require('discord.js')

module.exports = {
  name: 'join',
  aliases: ['move'],
  run: async (client, message, args) => {
	  const play = "âļī¸"
	const stop = "âšī¸"
	const queue = "đ"
	const success = "âī¸"
	const repeat = "đ"
	const error = "â"
    let voiceChannel = message.member.voice.channel
    if (args[0]) {
      voiceChannel = await client.channels.fetch(args[0])
      if (!Constants.VoiceBasedChannelTypes.includes(voiceChannel?.type)) {
        return message.channel.send(`${error} | ${args[0]} is not a valid voice channel!`)
      }
    }
    if (!voiceChannel) {
      return message.channel.send(
        `${error} | You must be in a voice channel or enter a voice channel id!`
      )
    }
    client.distube.voices.join(voiceChannel)
  }
}
