const mongoose = require('mongoose')
const Player = require('../models/player')
const Team = require('../models/teams')
const randomName = require('random-name')

mongoose.connect('mongodb://localhost:27017/cricket', {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
})

const db = mongoose.connection;
db.on("error", console.error.bind(console, "Connection Error:"))
db.once("open", () => {
    console.log("Database Connected!")
})

const images = [
    "https://static.generated.photos/vue-static/face-generator/landing/wall/14.jpg",
    "https://static.wikia.nocookie.net/dreamfiction/images/e/e7/Vladimir_Vu%C4%8Dkovi%C4%87.jpg/revision/latest?cb=20200124204134",
    "https://i.imgur.com/dBRXFFE.jpg",
    "https://elearningimages.adobe.com/files/2019/10/100k-ai-faces-3.jpg",
    "https://blenderartists.org/uploads/default/original/4X/f/7/a/f7a0a3a97695c83f4780973eb73b8f20ecc29df9.jpg",
    "https://generated.photos/vue-static/home/feed/adult.png",
    "https://images.generated.photos/7fQIk3HHDrptS2-OPXmde5DdjhBFNBXUBkWsV4a1dXE/rs:fit:256:256/Z3M6Ly9nZW5lcmF0/ZWQtcGhvdG9zL3Yz/XzA2MDEzNjQuanBn.jpg",
    "https://static.generated.photos/vue-static/face-generator/landing/wall/23.jpg",
    "https://pbs.twimg.com/profile_images/974736784906248192/gPZwCbdS.jpg",
    "https://pbs.twimg.com/profile_images/1055263632861343745/vIqzOHXj.jpg",
    "https://pbs.twimg.com/profile_images/1055263632861343745/vIqzOHXj.jpg",
    "https://miro.medium.com/max/3752/1*nxBpQNZx2pmLWr5lVsYkPA.png",
    "https://static1.fjcdn.com/comments/Iamthebestfapper+rolled+a+random+image+posted+in+comment+63+at+_a4096c284eba93cfb31486a84705bdb1.jpg",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTEFB_k7bIKrZ1keE6UsbHd86ChltXpMn7ojxKmOFEBrRve9tqYmu8rRzI1Hl5AZVGWk9Q&usqp=CAU",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSYid-KUEyhs0mIYI8HHhnWTzWUsCy_da_fzl_FOHNj6lQhEBfE5C6SSxiU4qJ1hxDqWKg&usqp=CAU"
]

const roles = ["Batsman", "Bowler", "Wicket-Keeper", "All Rounder"]

const seedDB = async () => {
    // await TestPlayer.deleteMany({})
    const teams = ['India', 'Australia', 'England', 'New Zealand', 'Pakistan', 'South Africa', 'Sri Lanka', 'West Indies',
        'Bangladesh', 'Zimbabwe'
    ]
    for (let tea of teams) {
        const team = await Team.find({
            name: tea
        });
        for (let i = 0; i < 10; i++) {
            const played = Math.floor(Math.random() * 300) + 20
            const run = Math.floor(Math.random() * 12000) + 300
            const avg = Math.floor(run / played)
            const player = new Player({
                name: `${randomName.first()} ${randomName.last()}`,
                age: Math.floor(Math.random() * 20) + 20,
                image: images[Math.floor(Math.random() * 15)],
                role: roles[Math.floor(Math.random() * 4)],
                matchPlayed: played,
                runs: run,
                average: avg,
                wickets: Math.floor(Math.random() * 350),
                catches: Math.floor(Math.random() * 200)
            })
            team[0].players.push(player)
            await player.save()
            await team[0].save()
        }
    }
}

seedDB().then(() => {
    mongoose.connection.close()
})