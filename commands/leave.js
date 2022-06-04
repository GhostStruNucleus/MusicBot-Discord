module.exports = {
  name: 'leave',
  run: async (client, message) => {
	   const play = "▶️"
	const stop = "⏹️"
	const queue = "📄"
	const success = "☑️"
	const repeat = "🔁"
	const error = "❌"
    client.distube.voices.leave(message)
  }
}
