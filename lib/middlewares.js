const sessionRepository = require('./repositories/sessionRepository')
const userRepository = require('./repositories/userRepository')

const middlewares = {
    authentificationRequired: async (req, res, next) => {
        if (process.env.NODE_ENV === 'test') {
            return next();
        }
        try {
            let encryptedSessionCookie = req.cookies['sessionCookie'];
            if (!encryptedSessionCookie) {
                // renvoyer vers champ login avec mess erreur
                return res.redirect('/auth/signin')
            }
            let sessionObj = await sessionRepository.getByToken(encryptedSessionCookie);
            if (!sessionObj) {
                // renvoyer vers champ login avec mess erreur
                return res.redirect('/auth/signin')
            }
            let user = await userRepository.getById(sessionObj.userId)
            req.user = user;
            return next();
        } catch (error) {
            return next(error);
        }
	},
	fillContextWithData: async (req, res, next) => {
		res.locals.url = req.url
		res.locals.host = `${req.protocol}://${req.headers.host}`
		return next()
	}
}

module.exports = middlewares