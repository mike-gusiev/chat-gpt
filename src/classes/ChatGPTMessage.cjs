import Message from "./Message.cjs";

export default class ChatGPTMessage extends Message {
    constructor(question) {
        super(question);
        this.answers = [
            "I'd tell you, but then I'd have to... not tell you.",
            "That's a trade secret between me and the algorithm.",
            "Ah, the mysteries of the universe!",
            "The answer lies within a black hole. Good luck retrieving it.",
            "My crystal ball is on vacation.",
            "I could answer, but where's the fun in that?",
            "Let's just say the answer is in another castle.",
            "I'm sworn to secrecy on that one.",
            "The answer is lost in the sands of time.",
            "I'd need a quantum computer to calculate that."
        ];
    }

    getRandomAnswer() {
        const randomIndex = Math.floor(Math.random() * this.answers.length);
        return this.answers[randomIndex];
    }

    render(isPending) {
        return `<img class="message-avatar" src="assets/avatar-chat.svg" />
        <div class="message-content">
            <strong class="message-name">ChatGPT</strong>
            <span class="message-text">${isPending ? "Loading..." : this.getRandomAnswer()} </span>
        </div>`;
    }
}
