module.exports = {
  name: 'stop',
  aliases: ['disconnect', 'leave'],
  inVoiceChannel: true,
  run: async (client, message) => {
	   const play = "▶️"
	const stop = "⏹️"
	const success = "☑️"
	const repeat = "🔁"
	const error = "❌"
    const queue = client.distube.getQueue(message)
    if (!queue) return message.channel.send(`${error} | There is nothing in the queue right now!`)
    queue.stop()
    message.channel.send(`${success} | Stopped!`)
  }
}
