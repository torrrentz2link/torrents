var express = require("express");
var compression = require("compression")
var app = express();
app.use(compression())
const TorrentSearchApi = require('torrent-search-api');
// TorrentSearchApi.enablePublicProviders(); //slows down
TorrentSearchApi.enableProvider('KickassTorrents'); //doesnt work
TorrentSearchApi.enableProvider('ThePirateBay',);
TorrentSearchApi.enableProvider('Rarbg',);
TorrentSearchApi.enableProvider('Torrentz2',);
TorrentSearchApi.enableProvider('1337x',);
// TorrentSearchApi.enableProvider('ThePirateBay','Rarbg','Torrentz2','1337x');


app.listen(3000, () => {
    console.log('listening')
});

app.get('/torrents/:query', async (req, res) => {
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