import {Alexa} from 'jovo-platform-alexa';
import {GoogleAssistant} from 'jovo-platform-googleassistant';

jest.setTimeout(500);

const launchMeaage = "簡単な計算スキルです。足し算と引き算ができます。最初は0から始まります。一を足してや三を引いてなどを私に言ってください。";

for (const p of [new Alexa(), new GoogleAssistant()]) {
    const testSuite = p.makeTestSuite();

    describe(`PLATFORM: ${p.constructor.name} INTENTS` , () => {
        test('should return a welcome message and ask for the name at "LAUNCH"', async () => {
            const conversation = testSuite.conversation();

            const launchRequest = await testSuite.requestBuilder.launch();
            const responseLaunchRequest = await conversation.send(launchRequest);
            expect(
                responseLaunchRequest.isAsk(launchMeaage)
            ).toBe(true);

        });
    });
}
