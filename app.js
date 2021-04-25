const express = require("express")
const config = require("config")
const mongoose = require("mongoose")

const app = express()

/*app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "http://localhost:3000/"); // update to match the domain you will make the request from
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });*/

app.use(express.json({ extended: true }))
app.use("api/auth", require("./routes/auth.routes"))

const PORT = config.get('port') || 8080
const connectionString = config.get("mongoUri")


async function start() {
    try {
        await mongoose.connect(connectionString, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true

        })
    } catch (e) {
        console.log(e)
    }
}

//start()
app.listen(PORT, () => {
    console.log("App running on port: " + PORT)
})