// 최초 백업일: Oct 23, 2020
// 최종 수정일: Apr 16, 2025
// 불필요 한 코드 제거

const Discord = require('discord.js');
const fs = require("fs");
const config = require('./config.json');
const client = new Discord.Client();
const words1 = ('욕설1'); //여기에 욕설을 적어주세요
const words2 = ('욕설2'); //여기에 욕설을 적어주세요
const words3 = ('욕설3'); //여기에 욕설을 적어주세요
const words4 = ('욕설4'); //여기에 욕설을 적어주세요
const words5 = ('욕설5'); //여기에 욕설을 적어주세요
const words6 = ('욕설6'); //여기에 욕설을 적어주세요
const words7 = ('욕설7'); //여기에 욕설을 적어주세요
const words8 = ('욕설8'); //여기에 욕설을 적어주세요
const words9 = ('욕설9'); //여기에 욕설을 적어주세요
const words10 = ('욕설10'); //여기에 욕설을 적어주세요

client.on('ready', () => {
    console.log(client.user.tag)
  console.log(client.user.id)
  console.log('\n봇이 준비 되었습니다.');
});

client.on('message', async (message) => { 
  if (message.author.bot) return;
  
  if (message.content.startsWith(words1) || message.content.startsWith(words2) || message.content.startsWith(words3) || message.content.startsWith(words4) || message.content.startsWith(words5) || message.content.startsWith(words6) || message.content.startsWith(words7) || message.content.startsWith(words8) || message.content.startsWith(words9) || message.content.startsWith(words10)) {
    message.delete()
    try {
      var d = new Date();
      var currentData = d.getFullYear() + "년 " + (d.getMonth() + 1) + "월 " + d.getDate() + "일 ";
      var currentTime = d.getHours() + "시 " + d.getMinutes() + "분 ";
      var badword_embed = new (require("discord.js").MessageEmbed)()
          badword_embed.setTitle('욕설 탐지기')
          badword_embed.setDescription('``욕설이 감지됨``')
          badword_embed.addField('감지된 유저', `<@${message.author.id}>`, true)
          badword_embed.addField('메시지 채널', message.channel, true)
          badword_embed.addField('걸린 시간', `${currentData + currentTime}`, true)
          badword_embed.addField('지워진 메시지', message.content)
          badword_embed.setFooter("욕설 LOG")
          badword_embed.setColor("RANDOM")
      client.channels.cache.get('로그 채널id').send(badword_embed)
    } catch (err) {
      message.channel.send("오류가 발생했습니다.\n`" + err + "`")
    }
  }

});

client.login(config.token)