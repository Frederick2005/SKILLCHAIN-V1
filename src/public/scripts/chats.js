// Mock chat data (replace with backend fetch later)
let chats = [
    {id: 1, name: "Alice", lastMessage: "Hey, how are you?", time: "12:45 PM", unread: 2},
    {id: 2, name: "Bob", lastMessage: "Did you check the file?", time: "11:30 AM", unread: 0},
    {id: 3, name: "Project Group", lastMessage: "Meeting at 3 PM", time: "Yesterday", unread: 5},
    {id: 4, name: "Charlie", lastMessage: "Let's catch up!", time: "Today", unread: 0},
    {id: 5, name: "David", lastMessage: "Sent the report", time: "Yesterday", unread: 1},
];

// Grab DOM elements
const chatList = document.getElementById("chat-list");
const searchInput = document.getElementById("chat-search");

// Function to render chats
function renderChats(chatArray) {
    chatList.innerHTML = "";
    chatArray.forEach(chat => {
        const chatItem = document.createElement("div");
        chatItem.classList.add("chat-item");
        chatItem.innerHTML = `
            <div class="chat-info">
                <div class="chat-name">${chat.name}</div>
                <div class="chat-preview">${chat.lastMessage}</div>
            </div>
            <div class="chat-meta">
                <div class="chat-time">${chat.time}</div>
                ${chat.unread > 0 ? `<div class="unread-badge">${chat.unread}</div>` : ""}
            </div>
        `;
        chatItem.onclick = () => {
            // Redirect to the chat page with chat ID
            window.location.href = `chat.html?chatId=${chat.id}`;
        };
        chatList.appendChild(chatItem);
    });
}

// Initial render
renderChats(chats);

// Search functionality
searchInput.addEventListener("input", (e) => {
    const query = e.target.value.toLowerCase();
    const filteredChats = chats.filter(chat => chat.name.toLowerCase().includes(query));
    renderChats(filteredChats);
});

// Example: dynamically update unread count (simulate new message)
setInterval(() => {
    chats[0].unread += 1;
    renderChats(chats);
}, 15000); // every 15s