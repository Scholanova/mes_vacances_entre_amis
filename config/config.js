module.exports = {
    development: {
        username: 'postgres',
        password: 'postgres',
        database: 'project_vacance_entre_amis_development',
        host: '127.0.0.1',
        dialect: 'postgres',
        logging: (msg) => console.log('[DATABASE]', msg)
    },
    test: {
        username: 'postgres',
        password: 'postgres',
        database: 'project_vacance_entre_amis_test',
        host: '127.0.0.1',
        dialect: 'postgres',
        logging: false
    },
    production: {
        username: 'vacanceentre_4537',
        password: 'LfxT9jOm1gaG1CruWq8a',
        database: 'vacanceentre_4537',
        host: '127.0.0.1',
        dialect: 'postgres',
        logging: (msg) => console.log('[DATABASE]', msg)
    }
}
