﻿module.exports = {
    port: 1302,
    mongoDb: {
        host: 'localhost',
        port: 27017,
        dbname: 'arstudio',
        username: 'arstudio',
        password: '$aurabh1996'
    },
    sessionSecret: 'developmentSessionSecret',
    secret: 'ilivelifefreely',
    key: 'ILikeTheSecret',
    tokenExpires: '24h', // in hour
    secure: {
        algorithm: 'aes-256-ctr',
        password: 'ILikeTheSecret'
    },
    mail: {
        user: 'saurabhrathod35@gmail.com',
        pass: 'ankur1302',
        host: 'smtp.gmail.com',
        port: '587',
        from: 'team@e.beperfeqta.com'
    },
    filepath: process.cwd() + '/files/',
    providedModules:{
       
    }
}
