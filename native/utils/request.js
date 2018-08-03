const { net } = require('electron');

module.exports = function(win, data) {
    // console.log(data)  //接收窗口传来的消息
    let res;
	const request = net.request(data.url)
	request.on('response', response => {
		// console.log(`STATUS: ${response.statusCode}`)
		// console.log(`HEADERS: ${JSON.stringify(response.headers)}`)
		response.on('data', chunk => {
            // chunk = chunk.slice(6, -6);
            console.log(chunk)
            // win.webContents.send(data.name, chunk);
            win.webContents.send(data.name, chunk);
		})
		response.on('end', () => {
			console.log('response请求中没有更多数据。')
		})
	})
    request.end();
}

