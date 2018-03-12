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

var gen = function* () {
	var f1 = yield readFile(__dirname + '/file1');
	var f2 = yield readFile(__dirname + '/file2');

	console.log(f1.toString());
	console.log(f2.toString());
}

// 自动执行
function autoRun(gen) {
	var iter = gen();

	function next(data) {
		var result = iter.next(data);

		if(result.done) {
			return result.value;
		}

		result.value.then(function(data) {
			next(data);
		})
	}

	next();
}

autoRun(gen);