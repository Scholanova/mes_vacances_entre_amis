module.exports = {
    development: {
        username: 'postgres',
        password: '123',
        database: 'project_vacance_entre_amis_development',
        host: '127.0.0.1',
        dialect: 'postgres',
        logging: (msg) => console.log('[DATABASE]', msg)
    },
    test: {
        username: 'postgres',
        password: '123',
        database: 'project_vacance_entre_amis_test',
        host: '127.0.0.1',
        dialect: 'postgres',
        logging: false
    },
    production: {
        use_env_variable: 'DATABASE_URL',
        dialect: 'postgres',
        logging: (msg) => console.log('[DATABASE]', msg)
    }
}
