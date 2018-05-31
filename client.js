var now = require('performance-now')
var _ = require('underscore')

module.exports = function() {
  // These objects will be added at runtime:
  // this.socket = {}
  // this.user = {}

  var client = this

  // Initialization
  this.initiate = function() {
    // Send connection handshake packet
    client.socket.write(packet.build(["HELLO", now().toString()]))
    console.log('client initiated')
  }

  // Client Methods
  this.enterroom = function (selected_room) {
    maps[selected_room].clients.forEach(function(otherClient) {
      otherClient.socket.write(packet.build(["ENTER", client.user.username, client.user.pos_x, client.user.pos_y]))
    })

    maps[selected_room].clients.push(client)
  }

  this.broadcastroom = function(packetData) {
    maps[client.user.current_room].clients.forEach(function(otherClient) {

      if (otherClient.user.username != client.user.username && typeof packetData !== 'undefined') {
        otherClient.socket.write(packetData)
      }

    })
  }

  // Socket Handlers
  this.data = function(data){
    console.log(data)
    //packet.parse(client, data)
  }

  this.error = function(err) {
    console.log(err.toString())
  }

  this.end = function() {
    if (typeof client !== 'undefined') {
      if (typeof client.user !== 'undefined') {
        client.user.save()
      }
    }
    console.log("client disconnected")
  }
}
