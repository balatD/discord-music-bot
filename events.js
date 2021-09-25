module.exports.registerPlayerEvents = (player) => {

    player.on("error", (queue, error) => {
        console.log(`[${queue.guild.name}] Greska neka jebla mater svoju: ${error.message}`);
    });
    player.on("connectionError", (queue, error) => {
        console.log(`[${queue.guild.name}] Greska neka jebla mater svoju: ${error.message}`);
    });

    player.on("trackStart", (queue, track) => {
        queue.metadata.send(`🎶 | Svira: **${track.title}** in **${queue.connection.channel.name}**!`);
    });

    player.on("trackAdd", (queue, track) => {
        queue.metadata.send(`🎶 | Pesma **${track.title}** se cuka!`);
    });

    player.on("botDisconnect", (queue) => {
        queue.metadata.send("❌ | Izbacili me jebli mater svoju!");
    });

    player.on("channelEmpty", (queue) => {
        queue.metadata.send("❌ | Prazan je kanal");
    });

    player.on("queueEnd", (queue) => {
        queue.metadata.send("✅ | Tojto nema vise!");
    });

};
