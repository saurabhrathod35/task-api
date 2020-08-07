﻿module.exports = {
    port: 3000,
    mongoDb: {
        host: 'localhost',
        port: 27017,
        dbname: 'faccebook',
        username: '',
        password: ''
    },
    sessionSecret: 'developmentSessionSecret',
    secret: 'ilivelifefreely',
    key: 'ILikeTheSecret',
    tokenExpires: '24h', // in hour
    secure: {
        algorithm: 'aes-256-ctr',
        password: 'ILikeTheSecret'
    },
    filepath: process.cwd() + '/files/',
    providedModules: {
        user: true,
        singlepost: true,
        comment: true
    }
}
