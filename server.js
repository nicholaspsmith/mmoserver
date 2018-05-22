require(__dirname + "/Resources/config.js")
var fs = require('fs') // fs and net come packaged with node.js
var net = require('net')
require('./packet.js')

// Load initialiers
var init_files = fs.readdirSync(__dirname + "/Initializers")
init_files.forEach(function(initFile) {
  console.log('Loading Initializer: ' + initFile)
  require(__dirname + "/Initializers/" + initFile)
})

// Load models
var model_files = fs.readdirSync(__dirname + "/Models")
model_files.forEach(function(modelFile) {
  console.log('Loading Model: ' + modelFile)
  require(__dirname + "/Models/" + modelFile)
})

// Load game maps
maps = {}
var map_files = fs.readdirSync(config.data_paths.maps)
map_files.forEach(function(mapFile) {
  console.log('Loading Map: ' + mapFile)
  var map = require(config.data_paths.maps + mapFile)
  maps[map.room] = map
})

// Initialize server
net.createServer(function(socket){

  console.log("socket connected")
  var clientConstructor = new require('./client.js')
  var thisClient = new clientConstructor();

  thisClient.socket = socket
  thisClient.initiate()
  
  socket.on('error', thisClient.error)
  socket.on('end', thisClient.end)
  socket.on('data', thisClient.data)

}).listen(config.port)

console.log("Server running on port " + config.port + " for environment " + config.environment)

