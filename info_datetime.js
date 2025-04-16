// 최초 백업일: Oct 23, 2020
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

  if (message.content.startsWith('!시계')) {
    var d = new Date();
    var currentData = d.getFullYear() + "년 " + (d.getMonth() + 1) + "월 " + d.getDate() + "일 ";
    var currentTime = d.getHours() + "시 " + d.getMinutes() + "분 ";
    var datetime_embed = new (require('discord.js').MessageEmbed)()
        datetime_embed.setTitle('**[한국 서울 기준] 현재 시간**')       
        datetime_embed.addField('현재 날짜', "**```" + `${currentData}` + "```**")
        datetime_embed.addField('현재 시간', "**```" + `${currentTime}` + "```**")
        datetime_embed.setFooter("DateTime Info")
        datetime_embed.setImage("")
        datetime_embed.setColor("RANDOM")
    message.channel.send(datetime_embed)
  }
});

client.login(config.token);