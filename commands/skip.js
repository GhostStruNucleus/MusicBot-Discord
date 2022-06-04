module.exports = {
  name: 'skip',
  inVoiceChannel: true,
  run: async (client, message) => {
	   const play = "▶️"
	const stop = "⏹️"
	const success = "☑️"
	const repeat = "🔁"
	const error = "❌"
    const queue = client.distube.getQueue(message)
    if (!queue) return message.channel.send(`${error} | There is nothing in the queue right now!`)
    try {
      const song = await queue.skip()
      message.channel.send(`${success} | Skipped! Now playing:\n${song.name}`)
    } catch (e) {
      message.channel.send(`${error} | ${e}`)
    }
  }
}
