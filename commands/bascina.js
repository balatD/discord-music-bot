const { SlashCommand } = require('slash-create');

module.exports = class extends SlashCommand {
    constructor(creator) {
        super(creator, {
            name: 'bascina',
            description: 'Ukljuci bascinu',

            guildIDs: process.env.DISCORD_GUILD_ID ? [ process.env.DISCORD_GUILD_ID ] : undefined
        });
    }

    async run (ctx) {

        const { client } = require('..');

        await ctx.defer();

        const queue = client.player.getQueue(ctx.guildID);
        if (!queue || !queue.playing) return void ctx.sendFollowUp({ content: '❌ | Ne svira nista jarane!' });
        await queue.setFilters({
            bassboost: !queue.getFiltersEnabled().includes('bascina'),
            normalizer2: !queue.getFiltersEnabled().includes('bascina')
        });

        setTimeout(() => {
            return void ctx.sendFollowUp({ content: `🎵 | Bascina pojacana ${queue.getFiltersEnabled().includes('bascina') ? 'Enabled' : 'Disabled'}!` });
        }, queue.options.bufferingTimeout);
    }
};
