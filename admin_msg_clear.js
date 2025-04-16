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
   
  if (message.content.startsWith("!청소하기")) {
    if (!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send("``명령어를 수행시킬 만큼의 권한을 소지하고 있지 않습니다.``");
  
    const gch = message.mentions.channels.first();
    if (!gch) return message.reply("메시지 청소를 하고싶은 채널을 멘션해주세요.");

    const text = message.content.split(' ').slice(2).join(' ');
    if (!text) return message.reply("1 ~ 100 중으로 입력해주세요.");
    if (text > 100) { }
    if (text < 1) { }
  
    const { guild } = message
    const { name } = guild
    const icon = guild.iconURL()
  
    gch.bulkDelete(text)

    var clener_embed = new (require("discord.js").MessageEmbed)()
        clener_embed.setTitle(`${name} 청소기`)
        clener_embed.setDescription("> **삭제한 관리자: " + `${message.author}` + "**\r" + "> **삭제한 수: " + `${text}` +"**\r" + "> **청소된 채널: " + `${gch}` +"**")
        clener_embed.addField('** **', "> **```삭제한 관리자: " + `${message.author.tag}` + "```**")
        clener_embed.addField('** **', "> **```청소된 채널: " + `${gch.name}` + "```**")
        clener_embed.addField('** **', "> **```삭제된 수: " + `${text}` + "```**")
        clener_embed.setColor("RANDOM")
        clener_embed.setThumbnail(icon)
    gch.send(clener_embed)
  }
});

client.login(config.token);