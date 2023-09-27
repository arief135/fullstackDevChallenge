const cds = require('@sap/cds')

module.exports = class DevChallengeService extends cds.ApplicationService {
    init() {
        return super.init()
    }

    // TODO: Implement the bound action: assignQuestionsToTest  
    assignQuestionsToTest(Test, id, questionsCount) {
        return `${questionsCount} question(s) successfully added to the test!`
    }
} 
