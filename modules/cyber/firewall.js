// modules/cyber/firewall.js
const { exec } = require("child_process");

module.exports = {
  name: "firewall",
  match: (input) =>
    /firewall|port|block|unblock|allow|deny|ufw/.test(input.toLowerCase()),
  execute: (input, say) => {
    input = input.toLowerCase();

    if (input.includes("enable firewall")) {
      exec("sudo ufw enable", (err, stdout, stderr) => {
        say(err ? stderr : "Firewall enabled.");
      });
    } else if (input.includes("disable firewall")) {
      exec("sudo ufw disable", (err, stdout, stderr) => {
        say(err ? stderr : "Firewall disabled.");
      });
    } else if (input.includes("status")) {
      exec("sudo ufw status", (err, stdout, stderr) => {
        say(err ? stderr : stdout);
      });
    } else if (input.includes("allow port")) {
      const port = input.match(/allow port (\d+)/)?.[1];
      if (port) {
        exec(`sudo ufw allow ${port}`, (err, stdout, stderr) => {
          say(err ? stderr : `Port ${port} allowed.`);
        });
      } else {
        say("Which port do you want to allow?");
      }
    } else if (input.includes("deny port")) {
      const port = input.match(/deny port (\d+)/)?.[1];
      if (port) {
        exec(`sudo ufw deny ${port}`, (err, stdout, stderr) => {
          say(err ? stderr : `Port ${port} denied.`);
        });
      } else {
        say("Which port do you want to deny?");
      }
    } else {
      say("I can enable, disable, or show firewall status, or allow/deny a port.");
    }
  },
};
