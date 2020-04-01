var express = require('express')
var path = require('path')
var serveStatic = require('serve-static')

var app = express()
app.use(serveStatic(path.join(__dirname, 'dist')))

// Serve only the static files form the dist directory
app.use(express.static(__dirname + '/dist/VINET-CES'));

app.get('/*', function (req, res) {
    res.sendFile(path.join(__dirname + '/dist/VINET-CES/index.html'));
});

// Start the app by listening on the default Heroku port
app.listen(process.env.PORT || 8080);

