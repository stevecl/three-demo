/*
	content type
	by subying tearlight2008@gmail.com
	根据后缀 转换 content-type
*/
 
var getContentType = function(ext){
	var contentType = '';
	switch(ext){
		case ".html":
			contentType= "text/html";
			break;
		case ".js":
			contentType="text/javascript";
			break;
		case ".css":
			contentType="text/css";
			break;
		case ".gif":
			contentType="image/gif";
			break;
		case ".jpg":
			contentType="image/jpeg";
			break;
		case ".png":
			contentType="image/png";
			break;
		case ".ico":
			contentType="image/icon";
			break;
		default:
			contentType="application/octet-stream";
	}
 
	return contentType;
};
 
module.exports = getContentType;