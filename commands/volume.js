module.exports = {
  name: 'volume',
  aliases: ['v', 'set', 'set-volume'],
  inVoiceChannel: true,
  run: async (client, message, args) => {
	   const play = "▶️"
	const stop = "⏹️"
	const success = "☑️"
	const repeat = "🔁"
	const error = "❌"
    const queue = client.distube.getQueue(message)
    if (!queue) return message.channel.send(`${error} | There is nothing in the queue right now!`)
    const volume = parseInt(args[0])
    if (isNaN(volume)) return message.channel.send(`${error} | Please enter a valid number!`)
    queue.setVolume(volume)
    message.channel.send(`${success} | Volume set to \`${volume}\``)
  }
}
