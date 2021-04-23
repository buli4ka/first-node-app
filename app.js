const express = require("express")
const config = require("config")
const mongoose = require("mongoose")

const app = express()

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


app.listen(PORT, () => {
    console.log("App running on port: " + PORT)
})