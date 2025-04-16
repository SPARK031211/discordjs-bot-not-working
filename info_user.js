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

  if (message.content.startsWith('!정보')) {
    var d = new Date();
    var currentData = d.getFullYear() + "년 " + (d.getMonth() + 1) + "월 " + d.getDate() + "일 ";
    var currentTime = d.getHours() + "시 " + d.getMinutes() + "분 ";
    var user = message.author;
    var u_a = user.avatarURL({ format: 'png', dynamic: true, size: 1024 });
    var u_u = user.username;
    var u_d = `#${user.discriminator}`;
    var u_i = user.id;
    var u_p = user.presence.status;
    var u_c = moment.utc(message.guild.members.cache.get(user.id).user.createdAt).format("YYYY년, M월 D일");
    var u_j = moment.utc(message.guild.members.cache.get(user.id).user.joinedAt).format("YYYY년, M월 D일");

    var userdata_embed = new (require("discord.js").MessageEmbed)()
      userdata_embed.setColor('RANDOM')
      userdata_embed.setDescription("**멘션 " + `${message.author}` + "**")
      userdata_embed.setThumbnail(u_a)
      userdata_embed.addField('** **', "**```이름: " + u_u + u_d + "```**", true)
      userdata_embed.addField('** **', "**```닉네임: " + u_u + "```**", true)
      userdata_embed.addField('** **', "**```태그: " + u_d + "```**", true)
      userdata_embed.addField('** **', "**```아이디: " + u_i + "```**")
      userdata_embed.addField('** **', "**```가입한 날: " + u_c + "```**", true)
      userdata_embed.addField('** **', "**```들어온 날: " + u_j + "```**", true)
    message.channel.send(userdata_embed)
  }
});

client.login(config.token);