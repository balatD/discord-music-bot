const { SlashCommand } = require('slash-create');

module.exports = class extends SlashCommand {
    constructor(creator) {
        super(creator, {
            name: 'pauzak',
            description: 'Snek pa pauzak',

            guildIDs: process.env.DISCORD_GUILD_ID ? [ process.env.DISCORD_GUILD_ID ] : undefined
        });
    }

    async run (ctx) {

        const { client } = require('..');

        await ctx.defer();

        const queue = client.player.getQueue(ctx.guildID);
        if (!queue || !queue.playing) return void ctx.sendFollowUp({ content: '❌ | Ne svira nista jarane!' });
        const paused = queue.setPaused(true);
        return void ctx.sendFollowUp({ content: paused ? '⏸ | Pauzak!' : '❌ | Nesto se pojebalo!' });
    }
};
