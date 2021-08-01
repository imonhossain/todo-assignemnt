const config = {
  local: {
    mode: 'local',
    port: 8080,
    mongo: {
      host: 'host.docker.internal',
      port: 27017
    },
  }
}

module.exports = function (mode) {
  return config.local;
}
