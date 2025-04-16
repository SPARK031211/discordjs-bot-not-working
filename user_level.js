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

  if (!lv[message.author]) lv[message.author] = {
    msg: '경험치 ',
    xp: 0,
    msge: '레벨 ',
    level: 0
  };
  lv[message.author].xp++;
  let userInfo = lv[message.author];
  if(userInfo.xp > 100) {
    userInfo.level++
    userInfo.xp = 0
    var levelup_embed = new (require("discord.js").MessageEmbed)()
        levelup_embed.addFields('** **', '**```축하합니다. ' + `${message.author}` + '님의 레벨은 ' + `${userInfo.level}` + '입니다.' + '```**')
        levelup_embed.setColor("RANDOM")
    message.channel.send(levelup_embed)
  }

  fs.writeFile("./level.json", JSON.stringify(lv), (x) => {
    if (x) console.error(x)
  });

  if (message.content.startsWith("!랭크")) {
    fs.readFile("./level.json", JSON, function(err, contents) {
      var Rank1 = contents.toString().replace(/{/gi,"");
      var Rank2 = Rank1.replace(/}/gi,"\n");
      var Rank3 = Rank2.replace(/,/gi,"");
      var Rank4 = Rank3.replace(/:/gi,"");
      var Rank5 = Rank4.replace(/"/gi,"");
      var Rank6 = Rank5.replace(/whogi/gi," ");
      var Rank7 = Rank6.replace(/msg/gi," ");
      var Rank8 = Rank7.replace(/msge/gi," ");
      var Rank9 = Rank8.replace(/e/gi," ");
      var Rank10 = Rank9.replace(/xp/gi," ");
      var Rank11 = Rank10.replace(/level/gi," ");
      var Rank12 = Rank11.replace(/levelup/gi," ");
      var Rank13 = Rank12.replace(/v/gi," ");
      var Rank14 = Rank13.replace(/lup0l/gi," ");
      var Rank15 = Rank14.replace(/l l/gi," ");

      var rank_embed = new (require("discord.js").MessageEmbed)()
          rank_embed.setDescription(`${Rank15}`)
          rank_embed.setColor("RANDOM")
      message.channel.send(rank_embed)

      if(err) console.log(err);
    });	
  }
});

client.login(config.token);