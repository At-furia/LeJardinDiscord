const Discord = require('discord.js');
const low = require('lowdb')
const FileSync = require('lowdb/adapters/FileSync')
const fs = require("fs");
const got = require("got")
const prefix = "<"


const adapter = new FileSync('database.json');
const db = low(adapter);

db.defaults({}).write()

var bot = new Discord.Client();

bot.on('ready', () => {
    bot.user.setPresence({ game: { name: '...', type: 3 } });
    bot.user.setStatus("idle");
    console.log("Bot Ready !");
})

bot.login(process.env.TOKEN);

bot.on('guildMemberAdd', member => {
     let channelBase = member.guild.channels.find(channels => channels.id === "668234806001401868");
     let newMemberName = member.user.tag
     var newMember = new Discord.RichEmbed()

     .setColor("#FF0000")
     //.setAuthor("test", member.user.avatar, member)
     .setTitle(`Bienvenue dans ${member.guild.name} !`)
     .addField(`───────────────────`, `→ Le Jardin est un serveur pour s'amuser et pour la guilde. Les joueurs y vont donc pour s’amuser et communiquer !\n
     → Nous sommes une communauté qui est et restera agréable à vivre. De ce fait, toute personne nuisant à l'ambiance de façon négative pourra être rappelée à l'ordre par les membres du staff et s'il y a récidive, écartée de la communauté et donc du serveur.\n
     → Si vous êtes ici c'est que vous êtes avant tout membre de la guilde ou une connaissance d'une membre.\n
     → Encore une fois, tout propos blessant vis-à-vis d'une personne ou d'une communauté sera jugé par un ban définitif et sans sommation. Réfléchissez bien avant d'enfreindre le règlement.\n
     → Le respect est la règle d'or du serveur. Le mauvais langage est permis uniquement dans un but humoristique, mais en aucun cas d'insulte envers-qui que ce soit, hormis un personnage fictif.`)
     .addField(`───────────────────`, `→ Aucune publicité ne sera tolérée sur le discord, sauf si vous faites la requête au staff. Même chose pour les spams.\n
     → Il vous est demandé d'écrire dans un Français Correct.\n
     → Si vous n'arrivez pas à gérer votre micro correctement, mettez vous en PUSH-TO-TALK. De plus, lorsqu'un membre du staff demande le silence, vous faites silences.`)
     .setTimestamp()

     member.user.send({ embed: newMember })
     member.user.send('https://cdn.discordapp.com/attachments/668235384370757685/668800109454163969/giphy_4.gif')

     channelBase.send(`${member.user.displayAvatarURL}\nBienvenue à <${newMemberName}>`)
})

bot.on('message', async message => {

    if (message.author.bot) return;

if (message.content.startsWith(prefix + 'clear')) {

    let args = message.content.split(" ").slice(1);

    await message.delete();

    if (!message.guild.member(message.author).hasPermission("MANAGE_MESSAGES")) return

    if (args[0] > 100) {
        message.reply("Imposible de supprimer plus de 100 messages.")
    }

    if (!args[0]) return message.reply("Merci d'indiquer un nombre de messages à supprimer (1 à 100)")

    if (args[0] > 100) throw new Error("erreur");

    message.channel.bulkDelete(args[0]).catch(console.error);
}
})
