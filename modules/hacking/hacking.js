// modules/hacking/hacking.js

const { exec } = require('child_process');

module.exports = {
  name: 'hacking',
  
  match: (input) => {
    return /scan|network|port|mac address|ip address|wifi/.test(input.toLowerCase());
  },

  execute: (input, say) => {
    input = input.toLowerCase();

    if (input.includes('scan network')) {
      exec('nmap -sP 192.168.1.0/24', (err, stdout) => {
        if (err) return say("Error during network scan.");
        say("Here is the network scan result:\n" + stdout);
      });

    } else if (input.includes('ip address')) {
      exec('hostname -I', (err, stdout) => {
        say(err ? "Failed to get IP address." : `Your IP address is: ${stdout.trim()}`);
      });

    } else if (input.includes('mac address')) {
      exec('cat /sys/class/net/wlan0/address', (err, stdout) => {
        say(err ? "Could not fetch MAC address." : `MAC address: ${stdout.trim()}`);
      });

    } else if (input.includes('port') || input.includes('check port')) {
      const port = input.match(/\d{2,5}/);
      if (port) {
        exec(`netstat -tuln | grep :${port[0]}`, (err, stdout) => {
          say(stdout ? `Port ${port[0]} is in use.` : `Port ${port[0]} is free.`);
        });
      } else {
        say("Please mention the port number, like 'check port 8080'");
      }

    } else {
      say("Sorry, I didn’t understand the hacking command. Try 'scan network', 'IP address', or 'MAC address'.");
    }
  }
};
