const express = require("express")
const fs = require("fs")

const app = express()
const config = require("/root/config.json")


app.get('/', function (req, res) {
    res.send(`Config test value update mk5: ${config.val}`)
  })

app.listen(3000)
