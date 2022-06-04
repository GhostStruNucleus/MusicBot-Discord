module.exports = {
  name: 'playskip',
  aliases: ['ps'],
  inVoiceChannel: true,
  run: async (client, message, args) => {
	   const play = "▶️"
	const stop = "⏹️"
	const success = "☑️"
	const repeat = "🔁"
	const error = "❌"
    const string = args.join(' ')
    if (!string) return message.channel.send(`${error} | Please enter a song url or query to search.`)
    client.distube.play(message.member.voice.channel, string, {
      member: message.member,
      textChannel: message.channel,
      message,
      skip: true
    })
  }
}
