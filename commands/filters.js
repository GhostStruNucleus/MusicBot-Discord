module.exports = {
  name: 'filter',
  aliases: ['filters'],
  inVoiceChannel: true,
  run: async (client, message, args) => {
	  const play = "▶️"
	const stop = "⏹️"
	const success = "☑️"
	const repeat = "🔁"
	const error = "❌"
    const queue = client.distube.getQueue(message)
    if (!queue) return message.channel.send(`${error} | There is nothing in the queue right now!`)
    if (args[0] === 'off' && queue.filters?.length) queue.setFilter(false)
    else if (Object.keys(client.distube.filters).includes(args[0])) queue.setFilter(args[0])
    else if (args[0]) return message.channel.send(`${error} | Not a valid filter`)
    message.channel.send(`Current Queue Filter: \`${queue.filters.join(', ') || 'Off'}\``)
  }
}
