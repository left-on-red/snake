var connect = require('connect');
var serveStatic = require('serve-static');

connect().use(serveStatic(__dirname)).listen(7777, function() {
    console.log('server running on :7777');
});