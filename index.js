const Discord = require('discord.js');
const fetch = require('node-fetch')

//Adds Gateway Intents
const bot = new Discord.Client({ ws: { intents:['GUILDS','GUILD_MESSAGES']}});

//Token
//const token = 'ODEwMzM4MjI0MTI3NzM3ODY2.YCiMRw._q1IpGHNORpbq0N-dXJ7uWif0L0';

//Date Vars
var today = new Date();
var dd = String(today.getDate()).padStart(2,'0');
var mm = String(today.getMonth()+1).padStart(2,'0');

//Console Log
bot.on('ready',() => {
    console.log('Bot Logged In');
    bot.user.setActivity('arafat-iqbal.netlify.app')

})

//If no prefix it will give an error
const prefix = '+'
bot.on('message',(msg) => {
    if(msg.content[0] !== prefix){
        console.log('No Prefix, Enter "!" Prefix Before Command');
        return;
    }

    const args = msg.content.slice(prefix.length).trim().split(' ');
    console.log(args);
    const command = args.shift().toLowerCase();
    console.log(command);
    
    //Commands
    if(command == 'prayer'){
        //No Arguments provided for prayer function, print out info about  Portland Oregon
        if(!args.length){

            msg.channel.send(`
\`\`\`
Error: Enter in Location
[ !prayer city state ]
\`\`\`
            `)

        }
        else{
        var c = args[0]
        var city = c.charAt(0).toUpperCase() + c.slice(1)
        var s = args[1]
        var state = s.charAt(0).toUpperCase() + s.slice(1)

        let getPrayer = async () => {
            let result = await fetch(`http://api.aladhan.com/v1/calendarByCity?city=${city}&state=${state}&country=UnitedStates&method=2&month=${mm}`)
            let json = await result.json()
            return json
        }
        (async function(){
            let prayer = await getPrayer()
            msg.channel.send(`
Here are the prayer times for **${city} ${state}**:
\`\`\`
Fajr: ${JSON.stringify(prayer.data[dd-1].timings['Fajr'],null,'\t')}
Dhuhr: ${JSON.stringify(prayer.data[dd-1].timings['Dhuhr'],null,'\t')}
Asr: ${JSON.stringify(prayer.data[dd-1].timings['Asr'],null,'\t')}
Maghrib: ${JSON.stringify(prayer.data[dd-1].timings['Maghrib'],null,'\t')}
Isha: ${JSON.stringify(prayer.data[dd-1].timings['Isha'],null,'\t')}
\`\`\`
           `)
        })()
        }
    }

    if(command == 'haram'){
        let num = 2;
        if (args[0]) {
            num = parseInt(args[0]) + 1;
        }
        console.log(num);
        msg.channel.bulkDelete(num);
        msg.channel.send(`Deleted ${args[0]} Haram Posts..‎. Astaghfirullah  :fire:`);
    }
})
bot.login(process.env.DJS_TOKEN);



