const sessionRepository = require('./repositories/sessionRepository')
const userRepository = require('./repositories/userRepository')

const middlewares = {
    authentificationRequired: async (req, res, next) => {
        try {
            let encryptedSessionCookie = req.cookies['sessionCookie'];
            if (!encryptedSessionCookie) {
                // renvoyer vers champ login avec mess erreur
                return res.render('/auth/signin')
            }
            let sessionObj = await sessionRepository.getByToken(encryptedSessionCookie);
            if (!sessionObj) {
                // renvoyer vers champ login avec mess erreur
                return res.render('/auth/signin')
            }
            let user = await userRepository.getById(sessionObj.userId)
            req.user = user;
            next();
        } catch (error) {
            next(error);
        }
    },
}

module.exports = middlewares