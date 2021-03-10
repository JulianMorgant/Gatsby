require('dotenv').config();

const express = require('express');
const app = express();
const mongoose = require("mongoose");

mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true});

const db = mongoose.connection;

db.on("error", error => console.log(error));
db.once("open", () => console.log("connection to db established"));
app.use(express.json());


// const usersRouter = require("./routes/users");
// app.use("/users", usersRouter);
const userSchema = new mongoose.Schema ({
        email: String,
        psw: String
    }
)

const NewUser = mongoose.model('NewUser', userSchema);

const testUser = new NewUser( {email : 'mail', psw : 'psw'});

console.log(testUser.email);
console.log(testUser.psw);

/*
testUser.save(function (err, testUser){
    if (err) return console.error(err);
    console.log(' save => ' + testUser.email + ' ' + testUser.psw)
})
*/

NewUser.find(function (err, users) {
    if (err) return console.error(err);
    console.log(users);
  })

app.listen(process.env.PORT, () => console.log(`server has started at port ${process.env.PORT}`));


