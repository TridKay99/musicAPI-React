const fetch = require('node-fetch')
const express = require('express')
const app = express()
const cors = require('cors')
const axios = require('axios')

const port = process.env.PORT || 5000

app.use(express.json())
app.use(cors())
  
app.get('/charts', async(req, res) => {
  console.log("Got a GET request for the index page");
  const result = await fetch ('https://api.musixmatch.com/ws/1.1/chart.tracks.get?apikey=8085b8906f21b9f20d5dd052c540916d')
  const data = await result.json()


  // const { data } = response
  // const message = data.message
  // const { body } = message
  // const tracks = {track_list: body.track_list}

  console.log(data.message);
  res.json({
    status: 'Get Request Recieved',
    data: data,
    // img: img
  })
  
})


app.get('/express_backend', (req, res) => {
  res.send({ express: 'YOUR EXPRESS BACKEND IS CONNECTED TO REACT' });
});

app.listen(port, () => console.log(`listening on port ${port}...`));