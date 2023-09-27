sap.ui.define([], function () {
    'use strict';

    return {
        addQuestion: function (oEvent) {

            if (!this.dialog) {

                this.dialog = new sap.m.Dialog({
                    type: sap.m.DialogType.Message,
                    title: 'Questions Count Dialog',
                    content: [
                        new sap.m.Text({ text: 'Developer Challenge Four' }),
                        new sap.m.Input('questionsCount', { type: sap.m.InputType.Number })
                    ],
                    beginButton: new sap.m.Button({
                        type: sap.m.ButtonType.Emphasized,
                        text: "OK",
                        press: function () {

                            let questionsCount = sap.ui.getCore().byId('questionsCount').getValue()
                            let bindingContext = this.getBindingContext()
                            let action = this.getModel()
                                .bindContext('DevChallengeService.assignQuestionsToTest(...)', bindingContext)
                                .setParameter('questionsCount', parseInt(questionsCount))
                            let pResult = action.execute()

                            pResult.then(
                                function () {
                                    bindingContext.refresh()
                                    sap.m.MessageBox.information(action.getBoundContext().getValue().value, {
                                        title: "Information"
                                    });
                            }.bind(this),
                                function (e) {
                                    sap.m.MessageBox.error(e, {
                                        title: "Error"
                                    });
                                }.bind(this))

                            this.dialog.close()

                        }.bind(this)

                    }),
                    endButton: new sap.m.Button({
                        type: sap.m.ButtonType.Emphasized,
                        text: "Cancel",
                        press: function () {
                            this.dialog.close();
                        }.bind(this)
                    }),
                })
            }

            this.dialog.open()
        },
    };
});
