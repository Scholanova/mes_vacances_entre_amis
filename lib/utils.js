module.exports = {
	
	calculateExpense: async (expense) => {
		// Get all participants
		let participants = await expense.getParticipants()

		if ( participants.length === 1 ) {
			return {
				total: participants[0].amount,
				payements: []
			}
		}
				
		let payors = []
		let refunders = []
		let payements = []
		let decimals = {}
		let nbParticipant = participants.length
		let total = 0
		let totalAdj = 0
		let _round = (a) => Math.round( ( a + Number.EPSILON ) * 100 ) / 100
		
		// Calculate total of the expense
		for(let participant of participants) {
			total += participant.amount
            //a retirer
			totalAdj += Math.trunc(participant.amount)

			decimal = _round(participant.amount - Math.trunc(participant.amount))
			
			if ( decimal > 0 ) {
				decimals[participant.id] = decimal
			}
		}
        console.log("test")
		totalAdj = total
        console.log(totalAdj/participants.length)
        
        do {
        totalAdj += 0.01
        } while ((totalAdj*100 % participants.length) > 0);
        console.log(totalAdj)
        console.log(totalAdj/participants.length)
		// Get the value who each participant should pay
		let maximun = totalAdj / participants.length
		
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
			let refunderRest = _round(maximun - refunder.amount)
			let payorRest = payor.amount - refunderRest
			
			if ( payorRest >= maximun ) {
				// Add payement
				payements.push({
					from: refunder.id,
					to: payor.id,
					amount: refunderRest
				})
				
				// Update the payor payement amount
				payor.amount -= refunderRest
				
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
					refunder.amount += available
				}
				
				delete payors.shift()
			}
		}
		
		return { total: _round(total), payements }
	}
	
}