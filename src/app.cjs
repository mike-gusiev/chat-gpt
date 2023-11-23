import ChatList from "./classes/ChatList.cjs";
import UserMessage from "./classes/UserMessage.cjs";

const getElementById = (id) => window.document.getElementById(id);

const addOnClickHandler = (element, callback, event = "click") => {
    if (element) element.addEventListener(event, callback);
};

const chatList = new ChatList();
const messageField = getElementById("new-message");

const submitMessage = () => {
    if (chatList.getCurrentChat()?.isPending) return;
    if (!messageField.value) return;

    const newMessage = new UserMessage(messageField.value);

    messageField.value = "";

    let chat = chatList.getCurrentChat();

    if (!chat) {
        chatList.createChat(chat);
        chat = chatList.getCurrentChat();
    }

    chat.addMessage(newMessage.render());
    chat.renderChat();
};

const mobileNavbar = window.document.querySelector(".side-menu-wrapper");
const onToggleMenu = () => mobileNavbar.classList.toggle("mobile-open");

addOnClickHandler(getElementById("open-menu"), onToggleMenu);
addOnClickHandler(getElementById("close-menu-button"), onToggleMenu);
addOnClickHandler(getElementById("create-chat"), () => chatList.createChat());
addOnClickHandler(getElementById("delete-all-chats"), () => chatList.deleteAllChats());
addOnClickHandler(getElementById("submit-message"), submitMessage);

addOnClickHandler(messageField, (event) => event.key === "Enter" && submitMessage(), "keypress");
