const http = require("http");
const request = require('request');
const fs = require("fs");
const server = http.createServer(function (req, res) {
    let url = req.url.substring(1);
    url = url.startsWith("http") ? url : 'http://' + url;
    let x;
    delete req.headers.host;
    // req.headers.referer = 'https://disqus.com/embed/comments'
    // req.headers.cookie =
    x = request[req.method.toLowerCase()]({
        url: url,
        headers: req.headers,
    })
    req.pipe(x)
    x.pipe(res)
    x.on("error",function(e){
        console.log(e)
    })
    x.on("complete",function(r){
        console.log("complete!")
    })
})
server.listen(8081);
