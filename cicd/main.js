const express = require("express")
const util = require('util');
const exec = util.promisify(require('child_process').exec);
const app = express()

app.post('/', async function (req, res) {
  try {
      console.log("push trigger")
      res.status(202)
      res.send()
      console.log("begin build and deploy")
      await exec('./scripts/build_deploy.sh')
      console.log("begin build and deploy")
  }
  catch (error) {
      console.log(error)
  }
})
   
app.listen(8585)
