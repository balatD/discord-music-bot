const { SlashCommand } = require('slash-create');

module.exports = class extends SlashCommand {
    constructor(creator) {
        super(creator, {
            name: 'skipuj',
            description: 'Skipuj pesmu',

            guildIDs: process.env.DISCORD_GUILD_ID ? [ process.env.DISCORD_GUILD_ID ] : undefined
        });
    }

    async run(ctx) {
        
        const { client } = require('..');
        
        await ctx.defer();
        const queue = client.player.getQueue(ctx.guildID);
        if (!queue || !queue.playing) return void ctx.sendFollowUp({ content: '❌ | Ne svira nista jarane!' });
        const currentTrack = queue.current;
        const success = queue.skip();
        return void ctx.sendFollowUp({
            content: success ? `✅ | Preskocio **${currentTrack}**!` : '❌ | Nesto se pojebalo!'
        });

    }
};
