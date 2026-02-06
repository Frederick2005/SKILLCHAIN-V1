document.addEventListener("DOMContentLoaded", () => {
  const chatWindow = document.getElementById("chat-window");
  const input = document.getElementById("chat-message-input");
  const sendBtn = document.getElementById("send-message-btn");

  if (!chatWindow || !input || !sendBtn) return;

  const getTime = () =>
    new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });

  const addMessage = (text, type = "sent", status = "✓") => {
    if (!text.trim()) return;

    const message = document.createElement("div");
    message.className = `message ${type}`;

    message.innerHTML = `
      <div class="bubble">
        <span class="text">${text}</span>
        <div class="meta">
          <span class="time">${getTime()}</span>
          ${type === "sent" ? `<span class="status">${status}</span>` : ""}
        </div>
      </div>
    `;

    chatWindow.appendChild(message);
    chatWindow.scrollTop = chatWindow.scrollHeight;
    input.value = "";
  };

  const showTyping = () => {
    const typing = document.createElement("div");
    typing.className = "message received typing";
    typing.innerHTML = `<div class="bubble">typing...</div>`;
    chatWindow.appendChild(typing);
    chatWindow.scrollTop = chatWindow.scrollHeight;
    return typing;
  };

  sendBtn.addEventListener("click", () => {
    addMessage(input.value, "sent", "✓");
  });

  input.addEventListener("keydown", (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      addMessage(input.value, "sent", "✓");
    }
  });

  // Fake reply
  setTimeout(() => {
    const typing = showTyping();

    setTimeout(() => {
      typing.remove();
      addMessage("Hello! How are you?", "received");
    }, 1500);
  }, 2000);
});