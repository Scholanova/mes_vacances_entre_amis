const { expect, factory } = require('./testHelper')
const { Event, Expense, User, Participant } = require('../lib/models')
const utils = require('../lib/utils')


describe('utils', () => {
    
    describe('calculateExpense', () => {

		let result
		
		afterEach(async () => {
			await Event.destroy({ where: {} })
			await Expense.destroy({ where: {} })
			await User.destroy({ where: {} })
			await Participant.destroy({ where: {} })
		})

		context('simple - one payor and multiple refunders', () => {

			beforeEach(async () => {
				// given
				let event = factory.createEvent()
				await event.save()
				let expense = factory.createExpense({ eventId: event.id })
				await expense.save()
	
				let usersData = [
					{ id: 10000001, amount: 90 },
					{ id: 10000002, amount: 0 },
					{ id: 10000003, amount: 0 },
				]
	
				for(let i = 0; i < usersData.length; i++) {
					let userData = usersData[i]
					let user = factory.createUser({ id: userData.id, pseudo: `User${i}`, email: `user${i}@gmail.com` })
					await user.save()
					let participant = factory.createParticipant({ expenseId: expense.id, userId: user.id, amount: userData.amount })
					await participant.save()
				}
	
				// when
				result = await utils.calculateExpense(expense)
			})
	
			it('should return a correct list of needed payments', () => {
				// then
				expect(result).to.deep.equal({
					total: 90,
					payements: [
						{ from: 10000002, to: 10000001, amount: 30 },
						{ from: 10000003, to: 10000001, amount: 30 },
					]
				})
			})

		})

		context('normal - two payor with same amount and multiple refunders', () => {

			beforeEach(async () => {
				// given
				let event = factory.createEvent()
				await event.save()
				let expense = factory.createExpense({ eventId: event.id })
				await expense.save()
	
				let usersData = [
					{ id: 10000001, amount: 50 },
					{ id: 10000002, amount: 50 },
					{ id: 10000003, amount: 0 },
					{ id: 10000004, amount: 0 },
				]
	
				for(let i = 0; i < usersData.length; i++) {
					let userData = usersData[i]
					let user = factory.createUser({ id: userData.id, pseudo: `User${i}`, email: `user${i}@gmail.com` })
					await user.save()
					let participant = factory.createParticipant({ expenseId: expense.id, userId: user.id, amount: userData.amount })
					await participant.save()
				}
	
				// when
				result = await utils.calculateExpense(expense)
			})
	
			it('should return a correct list of needed payments', () => {
				// then
				expect(result).to.deep.equal({
					total: 100,
					payements: [
						{ from: 10000003, to: 10000001, amount: 25 },
						{ from: 10000004, to: 10000002, amount: 25 },
					]
				})
			})

		})      
		
		context('normal - two payor with different amount and multiple refunders', () => {

			beforeEach(async () => {
				// given
				let event = factory.createEvent()
				await event.save()
				let expense = factory.createExpense({ eventId: event.id })
				await expense.save()
	
				let usersData = [
					{ id: 10000001, amount: 80 },
					{ id: 10000002, amount: 20 },
					{ id: 10000003, amount: 0 },
					{ id: 10000004, amount: 0 },
				]
	
				for(let i = 0; i < usersData.length; i++) {
					let userData = usersData[i]
					let user = factory.createUser({ id: userData.id, pseudo: `User${i}`, email: `user${i}@gmail.com` })
					await user.save()
					let participant = factory.createParticipant({ expenseId: expense.id, userId: user.id, amount: userData.amount })
					await participant.save()
				}
	
				// when
				result = await utils.calculateExpense(expense)
			})
	
			it('should return a correct list of needed payments', () => {
				// then
				expect(result).to.deep.equal({
					total: 100,
					payements: [
						{ from: 10000002, to: 10000001, amount: 5 },
						{ from: 10000003, to: 10000001, amount: 25 },
						{ from: 10000004, to: 10000001, amount: 25 },
					]
				})
			})

		}) 

		context('complex - multiple payors with different float amount and multiple refunders', () => {

			beforeEach(async () => {
				// given
				let event = factory.createEvent()
				await event.save()
				let expense = factory.createExpense({ eventId: event.id })
				await expense.save()
	
				let usersData = [
					{ id: 10000001, amount: 158.25 },
					{ id: 10000002, amount: 700.43 },
					{ id: 10000003, amount: 15.20 },
					{ id: 10000004, amount: 0 },
					{ id: 10000005, amount: 0 },
				]
	
				for(let i = 0; i < usersData.length; i++) {
					let userData = usersData[i]
					let user = factory.createUser({ id: userData.id, pseudo: `User${i}`, email: `user${i}@gmail.com` })
					await user.save()
					let participant = factory.createParticipant({ expenseId: expense.id, userId: user.id, amount: userData.amount })
					await participant.save()
				}
	
				// when
				result = await utils.calculateExpense(expense)
			})
	
			it('should return a correct list of needed payments', () => {
				// then
				expect(result).to.deep.equal({
					total: 873.88,
					payements: [
						{ from: 10000001, to: 10000002, amount: 16.35 },
						{ from: 10000003, to: 10000002, amount: 159.4 },
						{ from: 10000004, to: 10000002, amount: 174.6 },
						{ from: 10000005, to: 10000002, amount: 174.6 }
					]
				})
			})

		})

		context('complex - everyone have paid but with a different amount', () => {

			beforeEach(async () => {
				// given
				let event = factory.createEvent()
				await event.save()
				let expense = factory.createExpense({ eventId: event.id })
				await expense.save()
	
				let usersData = [
					{ id: 10000001, amount: 100.03 },
					{ id: 10000002, amount: 50 },
					{ id: 10000003, amount: 0 },
					{ id: 10000004, amount: 0 }
				]
	
				for(let i = 0; i < usersData.length; i++) {
					let userData = usersData[i]
					let user = factory.createUser({ id: userData.id, pseudo: `User${i}`, email: `user${i}@gmail.com` })
					await user.save()
					let participant = factory.createParticipant({ expenseId: expense.id, userId: user.id, amount: userData.amount })
					await participant.save()
				}
	
				// when
				result = await utils.calculateExpense(expense)
			})
	
			it('should return a correct list of needed payments', () => {
				// then
				expect(result).to.deep.equal({
					total: 150.03,
					payements: [
						{ from: 10000003, to: 10000001, amount: 37.5 },
						{ from: 10000004, to: 10000001, amount: 25.03 },
						{ from: 10000004, to: 10000002, amount: 12.47 },
					]
				})
			})

		})
			
    })
    
})