'use strict';
var express = require('express'),
    config = require('../config/server.conf.js'),
    compression = require('compression'),
    app = express();

app.use(compression({
    filter: function(req, res) {
        return (/json|text|javascript|css/).test(res.getHeader('Content-Type'));
    },
    level: 9
}));

app.use(express.static('client'));
app.set('views', 'server/views');
app.set('view engine', 'jade');

app.all('*', function(req, res) {
    res.render('index', {req: req});
});

// Error handling
app.use(function(err, req, res, next) {
    if (err) {
        return res.status(500).send(err);
    }
    next(err);
});

//Assume 404 since no middleware responded
app.use(function(req, res) {
    res.status(404).render('404', {
        url: req.originalUrl,
        error: 'Not found'
    });
});

app.listen(config.port, function() {
    console.log('Express app started on port ' + config.port);
});
