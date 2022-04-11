var fs = require('fs')
var http = require('http')
var path = require('path')
var getConType = require('./fileTypes')

const hostname = '127.0.0.1';
const port = 80;

const server = http.createServer(function(req, res){
  let _file = req.url.replace(/\?.*/ig,'');
  let _ext = path.extname(_file); // 文件扩展
  if (getConType(_ext)) {
    let fileUrl = __dirname + req.url
    if (fs.existsSync(fileUrl)) {
			res.writeHead(200, {"Content-Type": getConType(_ext) });
			_stream = fs.createReadStream(fileUrl, {flags : "r", encoding : null});//只读模式 读取文件内容
			_stream.on('error', () => errorHandle(res, '404 Read Error'));
			_stream.pipe(res); //连接文件流和http返回流的管道,用于返回实际Web内容
			_stream.on('end', () => _stream = null)
    } else {
      errorHandle(res, '404 Not Found')
    }
  }
})

function errorHandle(res, err) {
  res.writeHead(404, {"Content-Type": "text/html"});
  res.end(`<h1>${err}</h1>`);
}

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});