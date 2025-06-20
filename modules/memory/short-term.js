let history = [];

function update(input) {
  if (input) history.push({ input, time: new Date() });
  if (history.length > 50) history.shift(); // keep it short
}

function remember() {
  return history.map(h => h.input).join("\n");
}

module.exports = { update, remember };
