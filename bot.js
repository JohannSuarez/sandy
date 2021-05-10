const Discord = require('discord.js');      // Import module
const fs = require('fs');                   // File system module


const prefix = "!";                         // Every command starts with "!"
require('dotenv').config()                  // To use .env files


/*
    Client object that connects to the API itself
    to run the bot
*/
const client = new Discord.Client();

/*
    Collections are an extension of JavaScript's native
    map class.
*/
client.commands = new Discord.Collection();
client.login(process.env.BOTTOKEN);



// Whenever the bot is activated.
client.on('ready', () => {
    console.log("Chigurh initialized.");


	// Every five seconds, we check the voice channels for users.
	// We do this by first identifying which servers are voice-type
	// Then listing the current users in each of them.

	setInterval(() => {

		// Filters all the channels available for voice type channnels
		const voiceChannelCount = client.channels.cache.filter(c => c.type ==='voice');


        for (let [key, value] of voiceChannelCount) {

			// This is how you get a channel by name.
			const vchannel_holder = client.channels.cache.find(channel => channel.name === value["name"]);

			console.log(`-------=| Inspected users currently in ${value["name"]} |=------`);


			//----------- Below this line, you must only do these if the collection isn't empty (try-catch)
			try {
				const guild_member_holder = vchannel_holder.members.last();
				console.log(guild_member_holder.user);
			} catch (error) {
				// Errors can be ignored, as empty channels are expected to have no 'user' member/property.
				// console.log(error);

			}

        }

	}, 5000); // Milliseconds

});



// Gathering the commands from the files in "commands" directory.
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
	// set a new item in the Collection
	// with the key as the command name and the value as the exported module
	client.commands.set(command.name, command);
}

client.on('message', message => {
    console.log(message.content);

	if (!message.content.startsWith(prefix) || message.author.bot) return;


	const args = message.content.slice(prefix.length).trim().split(/ +/);
	const commandName = args.shift().toLowerCase();

	if (!client.commands.has(commandName)) return;

    const command = client.commands.get(commandName);

	try {
        command.execute(message, args);
	} catch (error) {
		console.error(error);
		message.reply('There was an error trying to execute that command!');
	}
});





//-------=| Section For Important Code Snippets |=-----------//

/*


	This is how you grab a channel by ID.
	Leave this for now, might need it for reference.

	const chan_stratton = client.channels.cache.get("841115556500602900");





	For voice state updates. Useful for detecting entry to voice servers.
	Save this for now, we might need this for reference.
	Ref:
		https://stackoverflow.com/questions/65961002/discord-js-check-if-user-is-in-an-specific-voice-channel


	client.on('voiceStateUpdate', (oldState, newState) => {
		try {

		//console.log(`User ID: ${newState.member['user']['id']}`);
		//console.log(`Voice Channel ID: ${newState.channel['id']}`); // Confirmed!

		} catch (error) {
			console.log("A user has left a channel.");

		}

	}



	console.log(client.users.cache);  <---- Important: List of all users in the server (online). Tested in voiceStateUpdate event.




*/