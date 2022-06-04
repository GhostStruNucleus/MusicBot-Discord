module.exports = {
  name: 'resume',
  aliases: ['resume', 'unpause'],
  inVoiceChannel: true,
  run: async (client, message) => {
	   const play = "▶️"
	const stop = "⏹️"
	const success = "☑️"
	const repeat = "🔁"
	const error = "❌"
    const queue = client.distube.getQueue(message)
    if (!queue) return message.channel.send(`${error} | There is nothing in the queue right now!`)
    queue.resume()
    message.channel.send('Resumed the song for you :)')
  }
}
