;(function () {
    const NODE_ENV = 'dev' 
    let ENV_VAR = null
    console.log('ferertgtrg')
    if (process.env.NODE_ENV === 'development') {
        if (NODE_ENV === 'dev') {
            ENV_VAR = require('.env.local')
        } else if (NODE_ENV === 'test') {
            ENV_VAR = require('.env.dev.js')
        }
    } else if (process.env.NODE_ENV === 'production') {
        ENV_VAR = require('.env.prod.js')
    }

    if (ENV_VAR) {
        process.uniEnv = {}
        for (let key in ENV_VAR) {
            process.uniEnv[key] = ENV_VAR[key]
        }
    }
})()
