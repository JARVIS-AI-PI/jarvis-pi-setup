let history = [];

module.exports = {
  remember: () => history.join(' '),
  update: (msg) => {
    if (history.length > 5) history.shift();
    history.push(msg);
  },
  clear: () => { history = []; }
};
