import ChatGPTMessage from "./ChatGPTMessage.cjs";

export default class Chat {
    constructor(id) {
        this.id = id;
        this.messages = [];
        this.isPending = false;
    }

    createAnswer() {
        this.isPending = true;
        const newMessage = new ChatGPTMessage(this.messages);
        this.addMessage(newMessage.render(this.isPending));
        this.renderChatAfterDelay(newMessage);
    }

    renderChatAfterDelay(newMessage) {
        setTimeout(() => {
            this.messages.pop();
            this.addMessage(newMessage.render());
            this.renderChat();
            this.isPending = false;
        }, 1000);
    }

    addMessage(message) {
        this.messages.push(message);
        if (!this.isPending) {
            this.createAnswer();
        }
    }

    getAllMessages() {
        return this.messages;
    }

    renderChat() {
        const activeChatNode = window.document.getElementById("active-chat");
        const messages = this.getAllMessages();
        activeChatNode.innerHTML = "";
        messages.forEach((message) => {
            const messageElement = document.createElement("li");
            messageElement.classList.add("chat-message");
            messageElement.innerHTML = message;
            activeChatNode.appendChild(messageElement);
        });
        activeChatNode.scrollTop = activeChatNode.scrollHeight;
    }
}
