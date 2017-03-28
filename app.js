//by Ahmed Ibrahim
var express = require('express');
var app = express();
var cfenv = require('cfenv');
var rp = require('request-promise');

app.use(express.static(__dirname + '/public'));
//app.use(express.static('node_module'));
app.set('view engine', 'hbs');

var appEnv = cfenv.getAppEnv();

app.get('/', function(req, res){
    res.render('index');
});

app.get('/test', function(req, res){
    res.render('test');
});

app.listen(appEnv.port, '0.0.0.0', function() {
    console.log("server starting on " + appEnv.url);
});

app.get('/getServices', function(req, res){
    var serviceUrls = ["https://mystery-real-stocks.mybluemix.net/", 'https://mystery-gts.mybluemix.net/', 'https://portfolioservicetest.mybluemix.net/'];
    var finalServiceList = [];
    var servicePromisesRequests = serviceUrls.map(function(el) {
        return rp({ uri: el + "status", json: true })
            .then(function (data) {
                data['url'] = el;
                finalServiceList.push(data);
            })
            .catch(function (err) {
                console.log(err);
            });
    });
    Promise.all(servicePromisesRequests).then(function() { res.send(finalServiceList); });
});
