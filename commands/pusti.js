const { SlashCommand, CommandOptionType } = require('slash-create');
const { QueryType } = require('discord-player');

module.exports = class extends SlashCommand {
    constructor(creator) {
        super(creator, {
            name: 'pusti',
            description: 'Pusti pesmu sa jutjuba',
            options: [
                {
                    name: 'query',
                    type: CommandOptionType.STRING,
                    description: 'Link pesme druze, sta bi drugo bilo',
                    required: true
                }
            ],

            guildIDs: process.env.DISCORD_GUILD_ID ? [ process.env.DISCORD_GUILD_ID ] : undefined
        });
    }

    async run (ctx) {

        const { client } = require('..');

        await ctx.defer();

        const guild = client.guilds.cache.get(ctx.guildID);
        const channel = guild.channels.cache.get(ctx.channelID);
        const query = ctx.options.query;
        const searchResult = await client.player
            .search(query, {
                requestedBy: ctx.user,
                searchEngine: QueryType.AUTO
            })
            .catch(() => {
                console.log('he');
            });
        if (!searchResult || !searchResult.tracks.length) return void ctx.sendFollowUp({ content: 'Sta je ovo koji kurac?! To ni milicija ne moze naci!' });

        const queue = await client.player.createQueue(guild, {
            metadata: channel
        });

        const member = guild.members.cache.get(ctx.user.id) ?? await guild.members.fetch(ctx.user.id);
        try {
            if (!queue.connection) await queue.connect(member.voice.channel);
        } catch {
            void client.player.deleteQueue(ctx.guildID);
            return void ctx.sendFollowUp({ content: 'Nisam mogo uc jebote ker u picku!' });
        }

        await ctx.sendFollowUp({ content: `⏱ | Ocitavam ${searchResult.playlist ? 'playlist' : 'track'}...` });
        searchResult.playlist ? queue.addTracks(searchResult.tracks) : queue.addTrack(searchResult.tracks[0]);
        if (!queue.playing) await queue.play();
    }
};
