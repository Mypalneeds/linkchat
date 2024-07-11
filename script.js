// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDX0J6Y8JmhFGQmLheSJqYeN6i1ZAQov_w",
    authDomain: "linkchat-d8db2.firebaseapp.com",
    databaseURL: "https://linkchat-d8db2.firebaseapp.com",
    projectId: "linkchat-d8db2",
    storageBucket: "linkchat-d8db2.appspot.com",
    messagingSenderId: "696605736194",
    appId: "1:696605736194:web:7a072f5adfa8ba8637561b"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const database = firebase.database();
let messagesRef;
const roomIdInput = document.getElementById('room-id-input');
const joinButton = document.getElementById('join-button');
const generateButton = document.getElementById('generate-button');
const generatedIdDiv = document.getElementById('generated-id');
const messageInput = document.getElementById('message-input');
const messagesDiv = document.getElementById('messages');

// Function to generate a unique room ID
const generateRoomId = () => {
  // Generate a unique ID (e.g., a random UUID)
  const roomId = 'room-' + Math.random().toString(36).substr(2, 9);
  generatedIdDiv.textContent = `Room ID: ${roomId}`;
  roomIdInput.value = roomId;
};

// Function to join a chat room
const joinChatRoom = () => {
  const roomId = roomIdInput.value.trim();
  if (roomId) {
    messagesRef = database.ref('chatrooms/' + roomId);
    
    // Clear previous messages
    messagesDiv.innerHTML = '';
    
    // Listen for new messages
    messagesRef.on('child_added', (snapshot) => {
      const message = snapshot.val();
      const messageElement = document.createElement('div');
      messageElement.textContent = message.text;
      messagesDiv.appendChild(messageElement);
      messagesDiv.scrollTop = messagesDiv.scrollHeight;
    });
  }
};

// Generate a new room ID when button is clicked
generateButton.addEventListener('click', generateRoomId);

// Join chat room when button is clicked
joinButton.addEventListener('click', joinChatRoom);

// Send a message
messageInput.addEventListener('keypress', (e) => {
  if (e.key === 'Enter') {
    const message = messageInput.value.trim();
    if (message && messagesRef) {
      messagesRef.push({
        text: message,
        timestamp: Date.now()
      });
      messageInput.value = '';
    }
  }
});
