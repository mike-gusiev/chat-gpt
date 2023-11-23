import Chat from "./Chat.cjs";

export default class ChatList {
    constructor() {
        this.list = [];
        this.currentSelectedChatId = null;
    }

    getCurrentChat() {
        return this.list.find((el) => el.id === this.currentSelectedChatId);
    }

    getChatListNode() {
        return window.document.getElementById("chat-list");
    }

    deleteAllChats() {
        this.list = [];
        this.clearChatList();
        this.currentSelectedChatId = null;
    }

    clearChatList() {
        const list = this.getChatListNode();
        list.innerHTML = "";
    }

    createChat() {
        const newChatId = (this.list.length > 0 ? this.list[this.list.length - 1].id : 0) + 1;
        const chat = new Chat(newChatId);
        this.list.push(chat);
        this.renderChatItem(chat);
        this.changeChat(newChatId);
    }

    delete(chatId) {
        this.list = this.list.filter((chat) => chat.id !== chatId);
        this.removeChatFromUI(chatId);
        if (this.currentSelectedChatId === chatId) {
            this.changeChat(this.list.length > 0 ? this.list[0].id : null);
        }
    }

    removeChatFromUI(chatId) {
        const list = this.getChatListNode();
        const chatToRemove = list.querySelector(`[data-id="${chatId}"]`);
        if (chatToRemove) {
            list.removeChild(chatToRemove);
        }
    }

    changeChat(chatId) {
        const list = this.getChatListNode();
        this.deselectCurrentChat(list);
        this.currentSelectedChatId = chatId;
        this.selectChat(chatId, list);
        this.renderCurrentChat();
    }

    deselectCurrentChat(list) {
        list.querySelector(`[data-id="${this.currentSelectedChatId}"]`)?.classList.remove("selected");
    }

    selectChat(chatId, list) {
        list.querySelector(`[data-id="${chatId}"]`)?.classList.add("selected");
    }

    renderChatItem(chat) {
        const list = this.getChatListNode();
        const newEl = document.createElement("li");
        newEl.dataset.id = chat.id;
        newEl.classList.add("side-menu-item");
        newEl.onclick = () => this.changeChat(chat.id);
        newEl.innerHTML = `<i class="message-icon"></i> Chat ${chat.id}<button class="delete-chat-button"><i class="delete-icon"></i></button>`;
        newEl.querySelector(".delete-chat-button").onclick = () => this.delete(chat.id);
        list.appendChild(newEl);
    }

    renderCurrentChat() {
        const currentChat = this.getCurrentChat();
        if (currentChat) {
            currentChat.renderChat();
        }
    }
}
