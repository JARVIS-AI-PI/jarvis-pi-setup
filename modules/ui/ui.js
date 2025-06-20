// core/ui/ui.js

module.exports = {
  applyTheme(theme) {
    const root = document.documentElement;
    if (theme === "dark") {
      root.style.setProperty('--bg-color', '#111');
      root.style.setProperty('--text-color', '#eee');
      root.style.setProperty('--bubble-color', '#222');
    } else {
      root.style.setProperty('--bg-color', '#fff');
      root.style.setProperty('--text-color', '#000');
      root.style.setProperty('--bubble-color', '#e0e0e0');
    }
  },

  typingEffect(element, text, speed = 25) {
    element.innerHTML = "";
    let i = 0;
    function type() {
      if (i < text.length) {
        element.innerHTML += text.charAt(i);
        i++;
        setTimeout(type, speed);
      }
    }
    type();
  },

  createChatBubble(message, isUser = false) {
    const bubble = document.createElement("div");
    bubble.className = `chat-bubble ${isUser ? "user" : "jarvis"}`;
    bubble.textContent = message;
    document.querySelector(".chat-container").appendChild(bubble);
    window.scrollTo(0, document.body.scrollHeight);
  },

  clearChat() {
    document.querySelector(".chat-container").innerHTML = "";
  }
};
