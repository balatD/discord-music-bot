const { SlashCommand } = require('slash-create');

module.exports = class extends SlashCommand {
    constructor(creator) {
        super(creator, {
            name: 'np',
            description: 'See what\'s currently being played',

            guildIDs: process.env.DISCORD_GUILD_ID ? [ process.env.DISCORD_GUILD_ID ] : undefined
        });
    }

    async run (ctx) {

        const { client } = require('..');

        await ctx.defer();

        const queue = client.player.getQueue(ctx.guildID);
        if (!queue || !queue.playing) return void ctx.sendFollowUp({ content: '❌ | Ne svira nista jarane!' });
        const progress = queue.createProgressBar();
        const perc = queue.getPlayerTimestamp();

        return void ctx.sendFollowUp({
            embeds: [
                {
                    title: 'Svira',
                    description: `🎶 | **${queue.current.title}**! (\`${perc.progress == 'Infinity' ? 'Live' : perc.progress + '%'}\`)`,
                    fields: [
                        {
                            name: '\u200b',
                            value: progress.replace(/ 0:00/g, ' ◉ LIVE')
                        }
                    ],
                    color: 0xffffff
                }
            ]
        });
    }
};
