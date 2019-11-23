var express = require("express");
var compression = require("compression")
var app = express();
const slowDown = require("express-slow-down");
var cors = require('cors')

var whitelist = [ 'https://torrentsfreelancer.herokuapp.com/' , 'https://torrentz2.netlify.com']
var corsOptions = {
  origin: function (origin, callback) {
          console.log(1111, origin)
    if (whitelist.indexOf(origin) !== -1) {
      callback(null, true)
    } else {
      callback(new Error('Not allowed by CORS'))
    }
  }
}

app.use(cors(corsOptions))
app.enable("trust proxy")
app.use(compression())
const TorrentSearchApi = require('torrent-search-api');

const speedLimiter = slowDown({
  windowMs: 10 * 60 * 1000, // 15 minutes
  delayAfter: 200, // allow 100 requests per 15 minutes, then...
  delayMs: 500 // begin adding 500ms of delay per request above 100:
});

//  apply to all requests
app.use(speedLimiter);
// TorrentSearchApi.enablePublicProviders(); //slows down
TorrentSearchApi.enableProvider('KickassTorrents'); //doesnt work
TorrentSearchApi.enableProvider('ThePirateBay',);
TorrentSearchApi.enableProvider('Rarbg',);
TorrentSearchApi.enableProvider('Torrentz2',);
TorrentSearchApi.enableProvider('1337x',);
TorrentSearchApi.enableProvider('TorrentProject',);
TorrentSearchApi.enableProvider('ExtraTorrent',);

// TorrentSearchApi.enableProvider('ThePirateBay','Rarbg','Torrentz2','1337x');

const PORT = process.env.PORT || 5000
app.listen(PORT, () => {
    console.log('listening')
});

app.get('/torrents/:query', async (req, res) => {
    //if (req.header('X-From') !== "Netlify"){
    //  res.status(403).send();
    //  return
    //}
    try {
        const query = req.params.query
        if (query == ""){
            return
        }
        const torrents = await TorrentSearchApi.search(query, 'All');
        const magnets = torrents.map(x => TorrentSearchApi.getMagnet(x))
        const magneted = await Promise.all(magnets).then(x => {
            return x.map((y, i) => {
                return Object.assign(torrents[i], { magnet: y })
            })
        })
        res.json({torrents: magneted})
    } catch (e) {
        console.log("err", e)
    }
})

app.get('/', async (req, res) => {
    try {
        res.json("it works")
    } catch (e) {
        console.log("err", e)
    }
})
