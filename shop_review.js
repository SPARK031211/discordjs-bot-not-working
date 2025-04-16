// 최초 백업일: Oct 25, 2020
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

  if (message.content.startsWith("!후기")) {
    const user = message.mentions.members.first();
    if (!user) return message.reply("후기를 남길유저를 멘션하세요.");
  
    const text = message.content.split(' ').slice(2).join(' ');
    if (!text) return message.reply("후기내용을 입력해주세요.");
  
    const wgmsg = '님에게 등록된 후기는 __총'
  
    if (!review[user]) review[user] = {
      msg: '님에게 등록된 후기는 **__총 ',
      review: 0,
      msge: '개__** 입니다.'
    };

    if (!review[user]) review[user] = {
      msg: '님에게 등록된 후기는 __총 ',
      review: 1,
      msge: '개__** 입니다.'
    };

    review[user].review +=+ 1;
    fs.writeFile("./review.json", JSON.stringify(review), (err) => {
      if(err) console.log(err);
    });

    var review1_embed = new (require("discord.js").MessageEmbed)()
      review1_embed.setDescription(`** ${message.author}님이 ${user}에게 후기를 남겼습니다. 후기 감사합니다 ! **`)
      review1_embed.addFields(
        { name: '** **', value: `** '`+ `** ${text} **` + `' **`},
        { name: '** **', value: `** [현재 ${user}님의 후기 개수 총 ${review[user].review}개] **`, inline: true },
      )
      review1_embed.setColor("RANDOM")
    message.channel.send(review1_embed)
  }	

  const d = new Date();
  const currentData = d.getFullYear() + "-" + (d.getMonth() + 1) + "-" + d.getDate();

  if (message.content.startsWith(`${currentData}`)) {
    if(!review[1]) review[1] = {
      review: 0
    };

    fs.readFile("./review.json", JSON, function(err, contents) {
      var review1 = contents.toString().replace(/{/gi,"");
      var review2 = review1.replace(/}/gi,"\n");
      var review3 = review2.replace(/,/gi,"");
      var review4 = review3.replace(/:/gi,"");
      var review5 = review4.replace(/"/gi,"");
      var review6 = review5.replace(/review/gi," ");
      var review7 = review6.replace(/msg/gi," ");
      var review8 = review7.replace(/msge/gi," ");
      var review9 = review8.replace(/e/gi," ");
      var review10 = review9.replace(/1 0/gi," ");

      var review2_embed = new (require("discord.js").MessageEmbed)()
          review2_embed.setDescription(`${review10}`)
          review2_embed.setColor("RANDOM")
      message.channel.send(review2_embed)

      if(err) console.log(err);
    });	
  }
});

client.login(config.token);