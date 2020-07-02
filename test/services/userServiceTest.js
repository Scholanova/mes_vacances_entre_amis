const { expect, sinon } = require('../testHelper')
const userService = require('../../lib/services/userService')
const userRepository = require ('../../lib/repositories/userRepository')
const { ValidationError } = require('../../lib/errors')
const User = require('../../lib/models').User

describe('dogService', () => {

  describe('create', () => {

    let dogData
    let dogCreationPromise

    beforeEach(() => {
      sinon.stub(userRepository, 'create')
    })

    context('when the user data is valid', () => {
      let dog
      beforeEach(() => {
        // given
        dogData = { pseudo: 'rex', email: 'Rex', password: '12' }
        dog = new User({ id: 1, pseudo: 'rex', email: 'Rex', password: '12' })
        userRepository.create.resolves(dog)

        // when
        dogCreationPromise = userService.login(dogData)
      })

      it('should call the dog Repository with the creation data', async () => {
        // then
        await dogCreationPromise.catch(() => {})
        expect(userRepository.getByEmail).to.have.been.calledWith(dogData)
      })

      it('should resolve with the created dog from repository', () => {
        // then
        return expect(dogCreationPromise)
          .to.eventually.equal(dog)
      })
    })

  })
})
