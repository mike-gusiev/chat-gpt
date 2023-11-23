import Message from "./Message.cjs";

export default class UserMessage extends Message {
    constructor(text) {
        super(text);
    }

    render() {
        return `<img class="message-avatar" src="assets/avatar-user.svg" />
        <div class="message-content">
           <strong class="message-name">You</strong>
           <span class="message-text">${this.getMessage()}</span>
        </div>`;
    }
}
