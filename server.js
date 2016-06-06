var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var sync = require('synchronize');
var cors = require('cors');
var morgan = require('morgan');

// Use fibers in all routes so we can use sync.await() to make async code easier to work with
app.use(function(req, res, next) {
	sync.fiber(next);
});

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(morgan('dev'));

// Since Mixmax calls this API directly from the slide-side, it must be whitelisted
var corsOptions = {
    origin: /^[^.\s]+\.mixmax\.com$/,
    credentials: true
}; 

app.get('/typeahead', cors(corsOptions), require('./api/typeahead'));
app.get('/resolver', cors(corsOptions), require('./api/resolver'));

app.listen(process.env.PORT || 9145);
