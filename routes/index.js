
/*
 * GET home page.
 */
var fs = require('fs')
exports.index = function(req, res){

  var readstream = fs.createReadStream(__dirname + '/../app/assets/index.html')

  readstream.pipe(res)


};