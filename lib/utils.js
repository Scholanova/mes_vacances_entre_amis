module.exports = {
	
	calculateExpense: async (expense) => {
		// Get all participants
		let participants = await expense.getParticipants()
		
		let total = 0
		let payors = []
		let refunders = []
		let payements = []
		let cents = []

		let _round = (a) => Math.round( ( a + Number.EPSILON ) * 100 ) / 100
		
		// Calculate total of the expense
		for(let participant of participants) {
			// Check if the number is a integer
			// if ( parseInt(participant.amount) === participant.amount ) {
			// 	total += participant.amount
			// } else {
			// 	let delta = participant.amount - parseInt(participant.amount)
			// 	cents.push(delta)
			// 	participant.amount = parseInt(participant.amount)
			// 	total += parseInt(participant.amount)
			// }
			total += participant.amount
		}
		
		// Get the value who each participant should pay
		let maximun = total / participants.length
		
		// We separate the payors from the refunders
		for(let participant of participants) {
			if ( participant.amount > maximun ) {
				payors.push({ id: participant.userId, amount: participant.amount })
			} else {
				refunders.push({ id: participant.userId, amount: participant.amount })
			}                
		}
		
		// We iterate while their is refunders
		while ( refunders.length > 0 ) {
			let payor = payors[0]
			let refunder = refunders[0]

			// Rest to be paid
			let rest = maximun - refunder.amount
			let diff = payor.amount - rest
			
			if ( diff >= maximun ) {
				// Add payement
				payements.push({
					from: refunder.id,
					to: payor.id,
					amount: rest
				})
				
				// Update the payor payement amount
				payor.amount = diff
				
				refunders.shift()
			} else {
				
				let available = payor.amount - maximun
				
				if ( available > 0 ) {
					// Ad payement
					payements.push({
						from: refunder.id,
						to: payor.id,
						amount: available
					})
					// Update the payor and refunder amount
					payor.amount -= available
					refunder.amount += available
				}
				
				delete payors.shift()
			}
		}
		
		return { total, payements }
	}
	
}