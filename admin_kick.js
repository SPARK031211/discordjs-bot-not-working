// 최초 백업일: Oct 23, 2020
// 최종 수정일: Apr 16, 2025
// 불필요 한 코드 제거

const Discord = require('discord.js');
const request = require('request');
const cheerio = require('cheerio');
const moment = require("moment");
require("moment-duration-format");
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

  if (message.content.startsWith('!추방')) {
    if (!message.member.hasPermission("MANAGE_MESSAGES")) {
      return message.channel.send(`${message.author} 님은 해당 명령어를 쓸 권한이 없습니다.`)
    };
    
    const user = message.mentions.members.first();
    if (!user) return message.reply("추방할 유저를 멘션하세요.");

    const text = message.content.split(' ').slice(2).join(' ');
    if (!text) return message.reply("추방사유를 작성해주세요.");
    
    var d = new Date();
    var currentData = d.getFullYear() + "년 " + (d.getMonth() + 1) + "월 " + d.getDate() + "일 ";
    var currentTime = d.getHours() + "시 " + d.getMinutes() + "분 ";
    var u_a = user.user.avatarURL({ format: 'png', dynamic: true, size: 1024 });
    var u_u = user.user.username;
    var u_d = `#${user.user.discriminator}`;
    var u_i = user.user.id;
    var u_c = moment.utc(message.guild.members.cache.get(user.user.id).user.createdAt).format("YYYY년 M월 D일");
    var u_j = moment.utc(message.guild.members.cache.get(user.user.id).user.joinedAt).format("YYYY년 M월 D일");
    var u_t = `${currentData + currentTime}`;
    
    var kick_embed = new (require("discord.js").MessageEmbed)()
        kick_embed.setColor('RANDOM')
        kick_embed.setTitle(`[${message.guild.name}] 추방 알림`)
        kick_embed.setDescription(`추방 대상: ${user}`)
        kick_embed.setThumbnail(u_a)
        kick_embed.addField(`닉네임`, '```' + u_u + '```', true)
        kick_embed.addField(`태그`, '```' + u_u + u_d + '```', true)
        kick_embed.addField(`아이디`, '```' + u_i + '```')
        kick_embed.addField(`사유`, '```' + `${text}` + '```')
        kick_embed.addField(`가입한 날`, '```' + u_c + '```', true)
        kick_embed.addField(`들어온 날`, '```' + u_j + '```', true)
        kick_embed.setFooter("처리 날짜 " + u_t)
    message.channel.send(kick_embed);
    user.kick(user)
  } 
});

client.login(config.token);