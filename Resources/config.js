var args = require('minimist')(process.argv.slice(2))
var extend = require('extend')

var environment = args.env || "test"

var common_conf = {
  name: "MMO Game Server",
  version: "0.0.1",
  environment: environment,
  max_players: 100,
  data_paths: {
    items: __dirname + "/GameData/Items/",
    maps: __dirname + "/GameData/Maps/"
  },
  starting_zone: "rm_map_home"
}

var conf = {
  production: {
    ip: args.ip || "0.0.0.0",
    port: args.port || 8081,
    database: "mongodb://nick:asdf@127.0.0.1/mmo_prod"
  },
  test: {
    ip: args.ip || "0.0.0.0",
    port: args.port || 8082,
    database: "mongodb://127.0.0.1/rm2mmo_test"
  }
}

extend(false, conf.production, common_conf)
extend(false, conf.test, common_conf)

module.exports = config = conf[environment]