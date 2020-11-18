const Discord = require('discord.js');
const client = new Discord.Client();
const config = require('./config.json');
const ytdl = require('ytdl-core');

client.login(config.token);

client.once('ready', () => {
	console.log('My heart beats. Babam.');
});

client.on('message', message => {
	if (message.author.username !== 'droplet' && message.content[0] === '!') {
		let response = '';
		switch(message.content) {
			case '!ping':
				response = 'Temee! Huzakeruna!';
				break;
			case '!pats':
				response = 'Euhn~ Euhn~';
				break;
			case '!help':
				response = 'HAHA Bakayaro!';
				break;
			default:
				response = 'Wakaranai';
		}
		message.channel.send(response);
	}
});

client.on('voiceStateUpdate', async (oldState, newState) => {
	// if user is a bot do nothing
	if (oldState.member.user.bot) return;

	//  join the same voice channel
	if (oldState.member.voice.channel) {
		const connection = await oldState.member.voice.channel.join();

		const dispatcher = connection.play(ytdl('https://www.youtube.com/watch?v=cBnia4XgjzY', { filter: 'audioonly' }), { volume: 1 });
		dispatcher.on('finish', () => {
			connection.disconnect();
		});

		dispatcher.on('error', err => {
			console.error(err);
		});
	}
});

client.on('unhandledRejection', error => {
	console.error('Unhandled promise rejection', error);
});
