module.exports = {
  name: 'seek',
  inVoiceChannel: true,
  run: async (client, message, args) => {
	   const play = "▶️"
	const stop = "⏹️"
	const success = "☑️"
	const repeat = "🔁"
	const error = "❌"
    const queue = client.distube.getQueue(message)
    if (!queue) return message.channel.send(`${error} | There is nothing in the queue right now!`)
    if (!args[0]) {
      return message.channel.send(`${error} | Please provide position (in seconds) to seek!`)
    }
    const time = Number(args[0])
    if (isNaN(time)) return message.channel.send(`${error} | Please enter a valid number!`)
    queue.seek(time)
    message.channel.send(`Seeked to ${time}!`)
  }
}
