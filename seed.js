const mongoose = require("mongoose");

const db = require("./models");
const { create } = require("./models/User");

console.log(db.User);

db.User.create({email:"jorr@cat.com", password: "password", profile: null},function (error, created) {
    if (error) return console.log(error)

    console.log(created)
    process.exit();
})



// db.Profile.create({username:"jore cart", country: "aus", highscore: 1000,},function (error, created) {
//     if (error) return console.log(error)
//     console.log(created)

//     db.User.findById("6023697130406273114d7224").exec(function(err, foundUser){
//         if (err) return console.log(error);

//         foundUser.profile.push(created);
//         foundUser.save();
//         console.log(foundUser)

//     })
//     process.exit();

// })

// async function pop () {
//     /*   db.Author
//     .findById(req.params.id)
//     .populate("articles")
//     .exec(function (err, foundAuthor) {
//       if (err) return res.send(err);
      
//       const context = { author: foundAuthor };
//       return res.render("authors/show", context);
//     }) */
  
//     try {
//       const foundUser = await db.User.findById("6023365819c2736dc397474d").populate("profile");
  
//        console.log(foundUser);

//     } catch (error) {
//       console.log(error);
//     }
  
//   }

//   pop();