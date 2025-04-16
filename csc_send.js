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

if (message.channel.type === 'dm') {		
  if (message.author.bot) return;
    var MH1_embed = new (require("discord.js").MessageEmbed)()
        MH1_embed.setColor("RANDOM")
        MH1_embed.setTitle("고객센터")
        MH1_embed.setDescription('``문의전송``')
        MH1_embed.addField('문의 작성자', `${message.author}`)
        MH1_embed.addField('문의 작성자 ID', `${message.author.id}`)
        MH1_embed.addField('문의 내용', `${message.content}`)
    client.channels.cache.get("채널id").send(MH1_embed)

    var MH2_embed = new (require("discord.js").MessageEmbed)()
        MH2_embed.setColor("RANDOM")
        MH2_embed.setDescription(`${message.author}님 문의가 정상적으로 전송되었습니다. 답변은 시간이 걸릴수 있습니다.`)
    message.channel.send(MH2_embed)
  }

  if (message.content.startsWith('!답변')) {
    if (!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send("``명령어를 수행시킬 만큼의 권한을 소지하고 있지 않습니다.``");
    const hid = message.mentions.members.first();
    const text = message.content.substring(28);
    if (!hid) return message.reply("`!답변 [유저맨션] [메시지]`가 올바른 명령어입니다.");
    var DM1_embed = new (require("discord.js").MessageEmbed)()
        DM1_embed.setColor('#ED0000')
        DM1_embed.setTitle("고객센터")
        DM1_embed.setDescription('``답변완료``')
        DM1_embed.addField('처리 관리자', `${message.author}`, true)
        DM1_embed.addField('처리 관리자 ID', `${message.author.id}`, true)
        DM1_embed.addField('답변내역', `${text}`)
    hid.send(DM1_embed)
    
    var DM1_embed = new (require("discord.js").MessageEmbed)()
        DM1_embed.setColor('RANDOM')
        DM1_embed.setTitle("전송완료")
    message.channel.send(DM1_embed)
  }
});

client.login(config.token);