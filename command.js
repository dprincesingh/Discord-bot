import { REST, Routes } from 'discord.js';
const  token = "MTIwMTQ3MjcxNTgxOTg0NzcyMA.GCY8ev.XtKvVsOj07_nEL4K_-Tr1HzSRBy1JRqyu5IBQA"

// commands 

const commands = [
    {
      name: 'ping',
      description: 'Replies with Pong!',
    },
  ];
  
  const rest = new REST({ version: '10' }).setToken(token);
  
  try {
    console.log('Started refreshing application (/) commands.');
  
    await rest.put(Routes.applicationCommands("1201472715819847720"), { body: commands });
  
    console.log('Successfully reloaded application (/) commands.');
  } catch (error) {
    console.error(error);
  }



