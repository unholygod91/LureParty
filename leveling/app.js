const accountManager = require('../utils/account-manager')
const Worker = require('./worker')
const config = require('../config.json')

async function Main() {
  let accounts = await accountManager.importAccounts('./accounts.csv')
  const workers = accounts.map(a => new Worker(a, config.speedMs, config.hashingKey))
  workers.forEach(async w => {
    await w.init()
    w.start(config.location[0], config.location[1], 45000)
  })
}

Main()