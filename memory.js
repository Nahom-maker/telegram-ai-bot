const memory = new Map();

function getHistory(userId) {
  if (!memory.has(userId)) {
    memory.set(userId, []);
  }
  return memory.get(userId);
}

function addMessage(userId, role, content) {
  const history = getHistory(userId);

  history.push({ role, content });

  // keep last 10 messages only (lightweight brain)
  if (history.length > 10) history.shift();
}

module.exports = { getHistory, addMessage };