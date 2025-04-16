// 최초 백업일: Oct 23, 2020
// 최종 수정일: Apr 16, 2025
// 불필요 한 코드 제거

const Discord = require('discord.js');
const fs = require("fs");
const config = require('./config.json');
const blacklist = require("./blacklist.json");
const client = new Discord.Client();

client.on('ready', () => {
  console.log(client.user.tag)
  console.log(client.user.id)
  console.log('\n봇이 준비 되었습니다.');
});

client.on('message', async (message) => { 
  if (message.author.bot) return;

  if (message.content.startsWith(prefix + "블랙리스트추가")) {
    const user = message.mentions.members.first();
    if (!user) return message.reply("유저를 멘션하세요.");

    const text = message.content.split(' ').slice(2).join(' ');
    if (!text) return message.reply("사유를 작성해주세요.");
  
    const role = message.guild.roles.cache.get('블랙리스트 역할id');
    user.roles.add(role);
  
    const type = 'O'
    const type2 = 'X'
  
    if(!blacklist[user.id]) blacklist[user.id] = {
      blacklist: type2
    };
  
    if(!blacklist[user.id]) blacklist[user.id] = {
      blacklist: type
    };

    blacklist[user.id].blacklist = type;
    fs.writeFile("./blacklist.json", JSON.stringify(blacklist), (err) => {
      if(err) console.log(err);
    });

    var blacklist_add_embed = new (require("discord.js").MessageEmbed)()
        blacklist_add_embed.setDescription(`${user} 님이 블랙리스트에 추가 되었습니다. 사유는 로그 채널에서 확인해 주세요.`)
        blacklist_add_embed.setColor("RANDOM")
    message.channel.send(blacklist_add_embed)

    var blacklist_add_log_embed = new (require("discord.js").MessageEmbed)()
        blacklist_add_log_embed.setDescription(`${user} 님이 블랙리스트에 추가 되었습니다. 블랙리스트 등록이유: ${text}`)
        blacklist_add_log_embed.setColor("RANDOM")
    client.channels.cache.get("로그 채널id").send(blacklist_add_log_embed)
  }

  if (message.content.startsWith(prefix + "블랙리스트해제")) {
    const user = message.mentions.members.first();
    if (!user) return message.reply("유저를 멘션하세요.");
    
    const role = message.guild.roles.cache.get('블랙리스트 역할id');
    user.roles.remove(role);
    
    const type = 'O'
    const type2 = 'X'
    
    if(!blacklist[user.id]) blacklist[user.id] = {
      blacklist: type2
    };

    blacklist[user.id].blacklist = type2;
    fs.writeFile("./blacklist.json", JSON.stringify(blacklist), (err) => {
      if(err) console.log(err);
    });

    var blacklist_romove_embed = new (require("discord.js").MessageEmbed)()
        blacklist_romove_embed.setDescription(`${user} 님이 블랙리스트에서 해제 되었습니다.`)
        blacklist_romove_embed.setColor("RANDOM")
    message.channel.send(blacklist_romove_embed)

    var blacklist_romove_log_embed = new (require("discord.js").MessageEmbed)()
        blacklist_romove_log_embed.setDescription(`${user} 님이 블랙리스트에서 해제 되었습니다.`)
        blacklist_romove_log_embed.setColor("RANDOM")
    client.channels.cache.get("로그 채널id").send(blacklist_romove_log_embed)
  }

  if (message.content.startsWith("!블랙조회")) {
    const user = message.mentions.members.first();
    if (!user) return message.reply("유저를 멘션하세요.");
  
    if(!blacklist[user.id]) blacklist[user.id] = {};
  
    const type = 'O'
    const type2 = 'X'
  
    fs.readFile("./blacklist.json", JSON, function(err, contents) {
      if(err) console.log(err);
    });

    var blacklist_check_embed = new (require("discord.js").MessageEmbed)()
        blacklist_check_embed.setDescription(`${user}님의 블랙리스트 상태는 ${blacklist[user.id].blacklist}입니다.`)
        blacklist_check_embed.setFooter("O가 나오면 블랙리스트가 맞습니다. | X가 나오면 블랙리스트가 아닙니다 | 만약등록이 안되있어 영어단어가 뜨면 블랙리스트가 아닙니다..")
        blacklist_check_embed.setColor("RANDOM")
    message.channel.send(blacklist_check_embed)
  }
});

client.login(config.token);