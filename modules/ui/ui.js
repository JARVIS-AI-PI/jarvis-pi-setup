// modules/ui/ui.js

const input = document.getElementById("input");
const send = document.getElementById("send");
const chat = document.getElementById("chat-container");

function addMessage(text, sender = "bot") {
  const msg = document.createElement("div");
  msg.className = `message ${sender}`;
  msg.innerText = text;
  chat.appendChild(msg);
  chat.scrollTop = chat.scrollHeight;
}

function showTyping(callback) {
  const typing = document.createElement("div");
  typing.className = "message bot typing";
  typing.innerText = "JARVIS is thinking...";
  chat.appendChild(typing);
  chat.scrollTop = chat.scrollHeight;
  setTimeout(() => {
    typing.remove();
    callback();
  }, 600);
}

function sendMessage() {
  const value = input.value.trim();
  if (!value) return;

  addMessage(value, "user");
  input.value = "";

  showTyping(() => {
    window.jarvis.call(value).then(response => {
      addMessage(response, "bot");
    });
  });
}

send.addEventListener("click", sendMessage);
input.addEventListener("keydown", e => {
  if (e.key === "Enter") sendMessage();
});
