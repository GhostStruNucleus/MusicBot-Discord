module.exports = {
  name: 'autoplay',
  inVoiceChannel: true,
  run: async (client, message) => {
	  const play = "▶️"
	const stop = "⏹️"
	const success = "☑️"
	const repeat = "🔁"
	const error = "❌"
    const queue = client.distube.getQueue(message)
    if (!queue) return message.channel.send(`${error} | There is nothing in the queue right now!`)
    const autoplay = queue.toggleAutoplay()
    message.channel.send(`${success} | AutoPlay: \`${autoplay ? 'On' : 'Off'}\``)
  }
}
