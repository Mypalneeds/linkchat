document.addEventListener('DOMContentLoaded', () => {
    const urlParams = new URLSearchParams(window.location.search);
    const chatId = urlParams.get('chat');

    if (chatId) {
        document.getElementById('link-generator').classList.add('d-none');
        document.getElementById('chat').classList.remove('d-none');
        loadMessages(chatId);
        listenForMessages(chatId);
    }
});

function generateLink() {
    const chatId = generateChatId();
    const link = `${window.location.origin}${window.location.pathname}?chat=${chatId}`;
    document.getElementById('chat-link').innerText = link;
    document.getElementById('chat-link').setAttribute('href', link);
    document.getElementById('chat-link').classList.add('d-block');
}

function generateChatId() {
    return Math.random().toString(36).substring(2, 15);
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
            text: messageText
        };

        messages.push(message);
        localStorage.setItem(chatId, JSON.stringify(messages));
        messageInput.value = '';

        const messagesContainer = document.getElementById('messages');
        const messageElement = document.createElement('div');
        messageElement.classList.add('message', 'me');
        messageElement.innerText = messageText;
        messagesContainer.appendChild(messageElement);
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
    }
}

function listenForMessages(chatId) {
    setInterval(() => {
        const messages = JSON.parse(localStorage.getItem(chatId)) || [];
        const messagesContainer = document.getElementById('messages');
        const currentMessageCount = messagesContainer.children.length;

        if (messages.length > currentMessageCount) {
            for (let i = currentMessageCount; i < messages.length; i++) {
                const messageElement = document.createElement('div');
                messageElement.classList.add('message', messages[i].sender === 'me' ? 'me' : 'them');
                messageElement.innerText = messages[i].text;
                messagesContainer.appendChild(messageElement);
            }
            messagesContainer.scrollTop = messagesContainer.scrollHeight;
        }
    }, 1000);
}
