var fs = require('fs');

var readFile = function(fileName) {
	return new Promise(function(resolve, reject) {
		fs.readFile(fileName, function(error, data) {
			if(error) {
				reject(error);
			}

			resolve(data);
		})
	})
};

var asyncReadFile = async function () {
	var f1 = await readFile(__dirname + '/file1');
	var f2 = await readFile(__dirname + '/file2');

	return [f1.toString(), f2.toString()]
}

asyncReadFile().then(([s1, s2]) => {
	console.log(s1, s2);
});