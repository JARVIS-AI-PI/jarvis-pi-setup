const { exec } = require("child_process");
function flashMessage(message) {
  exec(`espeak "${message}" --stdout | aplay`, (error, stdout, stderr) => {
    if (error) console.error("Flash Speak Error:", error);
  });
  console.log("[FLASH]", message);
  const display = document.getElementById("flash-message");
  if (display) {
    display.innerText = message;
    display.style.display = "block";
    setTimeout(() => display.style.display = "none", 5000);
  }
}
module.exports = { flashMessage };
