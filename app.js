// read and cache index file, this is the only file we can serve

var homepagecontent;
var fs = require('fs');
fs.readFile('./rszme.html', function read(err, data) {
    if (err) {
        throw err;
    }
    homepagecontent = data;
});


var alphabet, base, i, _i;

alphabet = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789".split("");

base = alphabet.length;

exports.encode = function(i) {
  var s;
  if (i === 0) {
    return alphabet[0];
  }
  s = "";
  while (i > 0) {
    s += alphabet[i % base];
    i = parseInt(i / base, 10);
  }
  return s.split("").reverse().join("");
};


var connect = require("connect");
var app = connect();
connect()
    .use(function (req, res, next) {

      path = req.url.split('/');
      console.log(path);
      switch (path[1]){
   case "": case "index.html": // Display the homepage
      fs.readFile('./rszme.html', function read(err, data) {
          if (err) {
              throw err;
          }
          homepagecontent = data;
      });
      res.end(homepagecontent);
      break;
   case "api": case "API": // /API
           switch(path[2]){
           case 'post': case 'POST': // POST API (add url)
           res.end('S93Key');
             break;
           default:
             res.end();
           break;
           }
   break;
    default:
     res.statusCode = 303;
      res.setHeader('Location', '/index.html');
      res.end('Redirected');

    }
  }).listen(3000);
