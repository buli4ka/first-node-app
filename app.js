const express = require("express")
const config = require("config")
const mongoose = require("mongoose")
const cors = require("cors")
const path = require("path")
const app = express()

app.use(cors())
app.use(express.json({ extended: true }))
app.use("/api/auth", require("./routes/auth.routes"))
app.use("/api/link", require("./routes/link.routes"))
app.use("/t", require("./routes/redirect.routes"))

if (process.env.NODE_ENV === 'production') {
    app.use('/', express.static(path.join(__dirname, 'client', 'build')))
    app.get('*', () => {
        res.sendFile(path.resolve(__dirname, "client", 'build', 'index.html'))
    })
}


const PORT = config.get('port') || 5000
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

start()
app.listen(PORT, () => {
    console.log("App running on port: " + PORT)
})