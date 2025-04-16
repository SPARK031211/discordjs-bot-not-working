// 최초 백업일: Oct 24, 2020
// 최종 수정일: Apr 16, 2025
// 불필요 한 코드 제거

const Discord = require('discord.js');
const fs = require("fs");
const config = require('./config.json');
const client = new Discord.Client();

client.on('ready', () => {
  console.log(client.user.tag)
  console.log(client.user.id)
  console.log('\n봇이 준비 되었습니다.');
});

client.on('message', async (message) => { 
  if (message.author.bot) return;
 
  if (message.content.startsWith('!관리')) {
    message.delete()
    var joined_server_embed = new (require("discord.js").MessageEmbed)()
        joined_server_embed.setColor('RANDOM')
        joined_server_embed.setDescription('**```' + `${client.guilds.cache.size}개의 서버 괸리중\r\r${client.users.cache.size}명을 관리중` + '```**')
    message.channel.send(joined_server_embed)
  }
});

client.login(config.token);