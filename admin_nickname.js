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
  
  try {
    if (message.content.startsWith('!별명변경')) {
      if (!message.member.hasPermission("MANAGE_MESSAGES")) {
        return message.channel.send(`<@${message.author.id}> 님은 해당 명령어를 쓸 권한이 없습니다.`)
      };
      message.delete()
      let member = message.mentions.members.first();
      if (!member) return message.reply("@멘션 을 이용하서 유저를 선택하세요");
      const text = message.content.substring(28);
      if (!text) return message.reply("변경할 이름을 적어주세요.");
      member = await member.setNickname(text);
      var nink_embed = new (require('discord.js').MessageEmbed)()
          nink_embed.setTitle('닉네임 변경')
          nink_embed.setDescription('``변경완료``')
          nink_embed.addField('변경된 유저', `${member}`, true)
          nink_embed.addField('변경한 관리자', `${message.author}`, true)
          nink_embed.addField('변경된 닉네임',`${text}`, true)
          nink_embed.setColor("RANDOM")
      message.channel.send(nink_embed);
    }
  } catch (e) {
    console.error(e);
    return message.channel.send("오류가 발생하였습니다.");
  }
});

client.login(config.token);