const TelegramBot = require("node-telegram-bot-api")
require('dotenv').config();
const fs = require('fs')

const mongoose = require('mongoose')
const db = require('./model/connect')

try {
    mongoose.set('strictQuery', false);
    mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true }, console.log("Mongo DB connected"));
}
catch (err) {
    console.log(err);
}

const bot = new TelegramBot(process.env.API_KEY, {polling: true});


bot.on("message", async msg=> {

    
    if(msg.text == "🔝Admin panel"){
        msg.text = "/admin"
    }

    if(msg.text == '/admin'){
        bot.sendMessage(msg.from.id, "admin panel", {
            reply_markup: JSON.stringify({
                keyboard: [
                    [
                        {
                            text: "Xizmatlar (admin)"
                        },
                        
                    ],
                    [
                        
                        {
                            text: "Ustalar (admin)"
                        }
                    ],
                    [
                        
                        {
                            text: "Mijozlar (admin)"
                        }
                    ]
                ],
                resize_keyboard: true
        })
     })
    }

    let xizmatlar = JSON.parse(fs.readFileSync('./model/xizmatlar.json'))
    let array = []
    xizmatlar.forEach(xizmat => {
        array.push([{text: xizmat}])
    })
    array.push([{text: "➕Xizmat qo'shish"}, {text: "🔝Admin panel"}])

    if(msg.text == 'Xizmatlar (admin)'){
        bot.sendMessage(msg.from.id, "Xizmatlar ro'yxati", {
            reply_markup: JSON.stringify({
                keyboard: array,
                resize_keyboard: true
               
        })
     })
    }

    if(msg.text == "➕Xizmat qo'shish"){
        process.message_id_yangi_xizmat = msg.message_id+2;
        console.log(msg.message_id);
        console.log(process.message_id_yangi_xizmat);
        bot.sendMessage(msg.from.id, "Xizmat turini kiriting",
        {
            reply_markup: JSON.stringify({
                keyboard: [
                    [
                        {text: "🔝Admin panel"},
                        
                    ]
                ],
                resize_keyboard: true
               
        })
        }
        )

    }

    if(msg.text == "tasdiqlanganlar ustalar"){
        const filter = {}
        let ustalar = db.find(filter)
        console.log(ustalar);
        bot.sendMessage(msg.from.id, "tasdiqlanganlar ustalar", {
            reply_markup: JSON.stringify({
                keyboard: [
                    [
                        {
                            text: "tasdiqlanganlar ustalar"
                        },
                        
                    ],
                    [
                        
                        {
                            text: "tasdiqlanmaganlar ustalar"
                        }
                    ]
                ],
                resize_keyboard: true
            })
         })
    }

    if(msg.text == "Ustalar (admin)"){
        bot.sendMessage(msg.from.id, "Ustalar", {
            reply_markup: JSON.stringify({
                keyboard: [
                    [
                        {
                            text: "tasdiqlanganlar ustalar"
                        },
                        
                    ],
                    [
                        
                        {
                            text: "tasdiqlanmaganlar ustalar"
                        }
                    ]
                ],
                resize_keyboard: true
            })
         })
    }



    if(msg.message_id == process.message_id_yangi_xizmat && msg.text != "/admin"){
        xizmatlar.push(`${msg.text}`);
        fs.writeFileSync('./model/xizmatlar.json', JSON.stringify(xizmatlar))
        bot.sendMessage(msg.from.id, "admin panel", {
            reply_markup: JSON.stringify({
                keyboard: [
                    [
                        {
                            text: "Xizmatlar (admin)"
                        },
                        
                    ],
                    [
                        
                        {
                            text: "Ustalar (admin)"
                        }
                    ],
                    [
                        
                        {
                            text: "Mijozlar (admin)"
                        }
                    ]
                ],
                resize_keyboard: true
            })
         })
    }
    


})