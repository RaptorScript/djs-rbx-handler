module.exports = () => {
    const { REST } = require('@discordjs/rest');
    const { Routes } = require('discord-api-types/v9');
    const token = process.env.TOKEN
    const fs = require('fs');
    const client = require('../index').client
    const commands = [];
    

    const clientId = '830010970285277234';
    const guildId = '803326517718679574';

    fs.readdirSync('./src/slashCmds/').forEach(dir => {
        const commandFiles = fs.readdirSync(`./src/slashCmds/${dir}/`).filter(file => file.endsWith('.js'));
        for (const file of commandFiles) {
            const command = require(`../slashCmds/${dir}/${file}`);
            commands.push(command.data.toJSON());
            client.commands.set(command.data.name, command);
        }
    })
    

    const rest = new REST({ version: '9' }).setToken(token);

    (async () => {
        try {
            console.log('Started refreshing application (/) commands.');

            await rest.put(
                Routes.applicationGuildCommands(clientId, guildId),
                { body: commands },
            );

            console.log('Successfully reloaded application (/) commands.');
        } catch (error) {
            console.error(error);
        }
    })();
    
    client.on('interactionCreate', async(interaction) => {
        const command = client.commands.get(interaction.commandName);

        if (!command) return;
    
        try {
            await command.execute(interaction);
        } catch (error) {
            console.error(error);
            await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
        }
    })
}