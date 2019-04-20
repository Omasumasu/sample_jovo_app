import {App} from 'jovo-framework';
import {Alexa} from 'jovo-platform-alexa';
import {JovoDebugger} from 'jovo-plugin-debugger';
import {FileDb} from 'jovo-db-filedb';
import {GoogleAssistant} from 'jovo-platform-googleassistant';

// ------------------------------------------------------------------
// APP INITIALIZATION
// ------------------------------------------------------------------

const app = new App();

app.use(
    new Alexa(),
    new GoogleAssistant(),
    new JovoDebugger(),
    new FileDb(),
);


// ------------------------------------------------------------------
// APP LOGIC
// ------------------------------------------------------------------

app.setHandler({
    LAUNCH() {
        return this.toIntent('WelcomeIntent');
    },

    WelcomeIntent() {
        this.ask("簡単な計算スキルです。足し算と引き算ができます。最初は0から始まります。一を足してや三を引いてなどを私に言ってください。");
    },

    PlusIntent() {
        const plusnumber : number = +this.$inputs.number.value;
        // session_attributesから値を引っ張ってくる
        const currentResult : number = +this.$session.$data.result || 0;
        const result : number = currentResult + plusnumber;
        // session_attributesにデータを格納する
        this.$session.$data.result = result;
        this.ask(plusnumber.toString() + "を足しました。計算をやめる場合は答えを言うか、答えを教えてなどと聞いてください");
    },
    MinusIntent() {
        const minusnumber : number = +this.$inputs.number.value;
        // session_attributesから値を引っ張ってくる
        const currentResult : number = +this.$session.$data.result || 0;
        const result : number = currentResult - minusnumber;
        // session_attributesにデータを格納する
        this.$session.$data.result = result;
        this.ask(minusnumber.toString() + "を引きました。計算をやめる場合は答えを言うか、答えを教えてなどと聞いてください");
    },
    ResultAnswerIntent() {
        const answer : number = +this.$inputs.answer.value;
        const currentResult : number = +this.$session.$data.result || 0;
        console.log(answer, currentResult);
        if (answer === currentResult){
            this.tell("正解です。答えは" + currentResult.toString() + "でした。");
        }
        else{
            this.ask("違います。わからなければ答えを教えてと聞いてみてください。");
        }
    },
    ResultHelpIntent(){
        const currentResult : number = +this.$session.$data.result || 0;
        this.tell("答えは" + currentResult.toString() + "でした。");
    }
});

export {app};
