const cds = require('@sap/cds')

module.exports = class DevChallengeService extends cds.ApplicationService {
    init() {
        return super.init()
    }

    // TODO: Implement the bound action: assignQuestionsToTest  
    async assignQuestionsToTest(pTest, id, questionsCount) {

        const { Tests, Questions } = cds.entities

        let query = SELECT.from(Questions).where`test_ID is null`.limit(questionsCount)
        let questions = await cds.run(query)

        if (questionsCount > questions.length) {
            return 'Not enough questions available'
        }

        let updateMap = questions.map(q => UPDATE.entity(Questions).set({ test_ID: id.ID }).where({ ID: q.ID }))

        // fire all at once
        await Promise.all(updateMap.map(u => cds.run(u)))
        await cds.db.run(UPDATE.entity(Tests).set({ modifiedAt: new Date() }).where({ ID: id.ID }))

        return `${questionsCount} question(s) successfully added to the test!`
    }
} 
