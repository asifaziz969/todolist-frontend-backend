const express = require('express')
const app = express()
const port = 3000

app.get('/', (req, res) => {
  
    var today= new Date();
    if (today.getDay()===0 || today.getDay()===6)
    {
        res.send("horayyyyyy")
    }
    else{
        res.send("uff hooo")
    }
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})