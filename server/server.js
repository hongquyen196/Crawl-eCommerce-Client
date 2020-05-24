
let express = require('express');
//setup express app 
let app = express();
var bodyParser = require('body-parser');
app.use(bodyParser.json());
const fs = require('fs');
const path = require('path');
const DIST_FOLDER = path.join(process.cwd(), '');
const options = {
    key: fs.readFileSync(path.join(DIST_FOLDER, 'server', 'privateKey.key')),
    cert: fs.readFileSync(path.join(DIST_FOLDER, 'server', 'certificate.crt'))
};

let https = require('https');

var cors = require('cors');

var whitelist = ['http://localhost:4200'];
var corsOptions = {
    origin: function (origin, callback) {
        if (!origin || whitelist.indexOf(origin) !== -1) {
            callback(null, true)
        } else {
            callback(new Error('Not allowed by CORS'))
        }
        // callback(null, true)
    }
}
app.use(cors(corsOptions));
//basic route for homepage
app.get('/', (req, res) => {
    res.json('welcome to express app');
});

app.get('/node/search/p/sendo', (req, res) => {
    let keyword = req.query.keyword;
    let start = req.query.start;
    let size = req.query.size;
    //shows all the cookies
    https.get('https://www.sendo.vn/m/wap_v2/search/product?p=' + start + '&platform=web&q=' + keyword + '&s=' + size + '&search_algo=algo6&sortType=rank', (ress) => {
        let rawData = '';
        ress.on('data', (chunk) => { rawData += chunk; });
        ress.on('end', () => {
            try {
                const parsedData = JSON.parse(rawData);
                res.status(200).json(parsedData);
            } catch (e) {
                console.error(e.message);
            }
        });
    });
});

https.createServer(options, app).listen(4000);

