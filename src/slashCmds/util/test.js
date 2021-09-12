const { SlashCommandBuilder } = require('@discordjs/builders');
const rbx_request = require('../../handler/functions/csrf')
module.exports = {
	data: new SlashCommandBuilder()
		.setName('test')
		.setDescription('Replies with the status code.'),
	async execute(interaction) {
		const req = await rbx_request("POST", "https://auth.roblox.com/")	
		interaction.reply({content: req.status.toString()})
	},
};