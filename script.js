document.addEventListener('DOMContentLoaded', () => {
    const urlParams = new URLSearchParams(window.location.search);
    const chatId = urlParams.get('chat');

    if (chatId) {
        showEnterChatButton();
    }
});

function generateLink() {
    const chatId = generateChatId();
    const link = `${window.location.origin}${window.location.pathname}?chat=${chatId}`;
    document.getElementById('chat-link').innerText = link;
    document.getElementById('chat-link').setAttribute('href', link);
    document.getElementById('chat-link').classList.add('d-block');
    document.getElementById('enter-chat-btn').classList.remove('d-none');
    enterChat();
}

function generateChatId() {
    return Math.random().toString(36).substring(2, 15);
}

function showEnterChatButton() {
    document.getElementById('link-generator').classList.remove('d-none');
    document.getElementById('enter-chat-btn').classList.remove('d-none');
}

function enterChat() {
    const urlParams = new URLSearchParams(window.location.search);
    const chatId = urlParams.get('chat');

    document.getElementById('link-generator').classList.add('d-none');
    document.getElementById('chat').classList.remove('d-none');

    if (chatId) {
        loadMessages(chatId);
        listenForMessages(chatId);
    }
}

function loadMessages(chatId) {
    const messages = JSON.parse(localStorage.getItem(chatId)) || [];
    const messagesContainer = document.getElementById('messages');
    messagesContainer.innerHTML = '';

    messages.forEach(message => {
        const messageElement = document.createElement('div');
        messageElement.classList.add('message', message.sender === 'me' ? 'me' : 'them');
        messageElement.innerText = message.text;
        messagesContainer.appendChild(messageElement);
    });
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
}

function sendMessage() {
    const urlParams = new URLSearchParams(window.location.search);
    const chatId = urlParams.get('chat');
    const messageInput = document.getElementById('message-input');
    const messageText = messageInput.value.trim();

    if (messageText) {
        const messages = JSON.parse(localStorage.getItem(chatId)) || [];
        const message = {
            sender: 'me',
           
