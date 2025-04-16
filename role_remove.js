// 최초 백업일: Oct 23, 2020
// 최종 수정일: Apr 16, 2025
// 불필요 한 코드 제거 및 오타 수정

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
 
  if (message.content.startsWith('!역할제거')) {
    if (message.member.hasPermission("MANAGE_MESSAGES")) {
      userAnswers1 = message.mentions.members.first();
      if (!userAnswers1) {
        return message.reply("`!역할제거 [역활]`이 올바른 명령어입니다.")
      };
      const roleid = '역할id'
      const role = message.guild.roles.cache.get(roleid);
      userAnswers1.roles.add(role);
      var add_embed = new (require("discord.js").MessageEmbed)()
          add_embed.setColor('RANDOM')
          add_embed.setTitle("역할 제거기")
          add_embed.setDescription('``제거완료``')
          add_embed.addField('관리자', `${message.author}`, true)
          add_embed.addField('제거유저', `${userAnswers1}`)
          add_embed.addField('제거유저 id', `${message.author.id}`)
          add_embed.addField('제거역할', `${role}`, true)
      message.channel.send(add_embed)
    } else {
      message.channel.send("당신은 권한이 없습니다.")
    }
  }
});

client.login(config.token);