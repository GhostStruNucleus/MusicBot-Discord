module.exports = {
  name: 'leave',
  run: async (client, message) => {
	   const play = "âļī¸"
	const stop = "âšī¸"
	const queue = "đ"
	const success = "âī¸"
	const repeat = "đ"
	const error = "â"
    client.distube.voices.leave(message)
  }
}
