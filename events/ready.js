const userLog = require("../include/csv_logging.js");

// TO DO: Goes "offline" after 5pm. Goes back online at 9am
// Goes offline at random intervals through the day for at most 30 mins

module.exports = {
  name: "ready",
  once: true,
  execute(client) {
    console.log(`Ready! Logged in as ${client.user.tag}`);

    client.user.setPresence({
      activities: [{ name: "Office Management 101" }],
      status: "online",
    });

    setInterval(() => {

      let hour = new Date().getHours();

      if (hour >= 17 || hour <= 9) {

        console.log("Duane sleeps...");
        client.user.setStatus('invisible');
      } else {
        client.user.setStatus('online');
      }


      // userLog.logVoiceChannels(client.channels);
      console.log(client.channels);
    }, 60000); // 60 seconds
  },
};
