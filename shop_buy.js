// 최초 백업일: Oct 24, 2020
// 최종 수정일: Apr 16, 2025
// 불필요 한 코드 제거

const Discord = require('discord.js');
const request = require('request');
const cheerio = require('cheerio');
const fs = require("fs");
const config = require('./config.json');
const shop = require("./shop.json");
const client = new Discord.Client();

client.on('ready', () => {
  console.log(client.user.tag)
  console.log(client.user.id)
  console.log('\n봇이 준비 되었습니다.');
});

client.on('message', async (message) => { 
  if (message.author.bot) return;
 
  if (message.content.startsWith("!구매")) {
    const user = message.mentions.members.first();
    if (!user) return message.reply("구매자 멘션하세요.");

    const cha = message.mentions.channels.first();
    if (!cha) return message.reply("구매한 채널을 멘션하세요.");
  
    const text = message.content.split(' ').slice(3).join(' ');
    if (!text) return message.reply("상품의 가격을 적어주세요.");
    if (isNaN(text)) return message.reply("상품의 가격은 숫자만 가능합니다");

    if (!shop[user.id]) shop[user.id] = {
      shop: 0
    };

    if (!shop[user.id]) shop[user.id] = {
      shop: text
    };

    shop[user.id].shop +=+ text;
    fs.writeFile("./shop.json", JSON.stringify(shop), (err) => {
      if(err) console.log(err);
    });

    var thanks_embed = new (require("discord.js").MessageEmbed)()
        thanks_embed.setDescription(`${user}님 ${cha} 구매 감사합니다. (누적금액 : ${shop[user.id].shop}원)`)
        thanks_embed.setColor("RANDOM")
    message.channel.send(thanks_embed)

    var purchase_history_embed = new (require("discord.js").MessageEmbed)()
        purchase_history_embed.setDescription(`${user}님 ${cha} 구매(누적금액 : ${shop[user.id].shop}원)`)
        purchase_history_embed.setColor("RANDOM")
    client.channels.cache.get("기록 채널id").send(purchase_history_embed)
  }

  if (message.content.startsWith('!금액조회')) {
    if (!shop[message.author.id]) shop[message.author.id] = {
      shop: 0
    };
  
    fs.readFile("./shop.json", JSON, function(err, contents) {
      if(err) console.log(err);
    });

    var total_used_money_embed = new (require("discord.js").MessageEmbed)()
        total_used_money_embed.setDescription(`${message.author}님의 누적금액은 ${shop[message.author.id].shop}원입니다!`)
        total_used_money_embed.setColor("RANDOM")
    message.channel.send(total_used_money_embed)
  }
});

client.login(config.token);