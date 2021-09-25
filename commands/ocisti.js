const { SlashCommand } = require('slash-create');

module.exports = class extends SlashCommand {
    constructor(creator) {
        super(creator, {
            name: 'ocisti',
            description: 'Ocisti queue bogati',
            
            guildIDs: process.env.DISCORD_GUILD_ID ? [ process.env.DISCORD_GUILD_ID ] : undefined
        });
    }

    async run (ctx) {

        const { client } = require('..');

        await ctx.defer();

        const queue = client.player.getQueue(ctx.guildID);
        if (!queue) return void ctx.sendFollowUp({ content: '❌ | Nema muzike u queue, jesi debil a?!' });
        
        queue.clear();

        ctx.sendFollowUp({ content: '❌ | Queue ociscen.' });
    }
};
