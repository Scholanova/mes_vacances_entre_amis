const Joi = require('@hapi/joi')
const { expect, request, sinon, factory } = require('../testHelper')
const { ResourceNotFoundError } = require('../../lib/errors')
const app = require('../../lib/app')

describe('indexRouter', () => {

    describe('index', () => {

        let response

        context('when we are on index page', () => {

            beforeEach(async () => {
                // when
                response = await request(app).get('/')
            })

            it('should succeed with a status 200', () => {
                // then
                expect(response).to.have.status(200)
            })

            it('should contain Welcome to SuperLand', () => {
                // then
                expect(response).to.be.html
            })
        })
    })
}) 