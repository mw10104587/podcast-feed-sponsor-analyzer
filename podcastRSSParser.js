const Parser = require('rss-parser');
const parser = new Parser();
const sanitizeHtml = require('sanitize-html');

// wrapper function to remove all html tags
const clean = (dirty) => {
    return sanitizeHtml(dirty, {
        allowedTags: [],
        allowedAttributes: {},
    });
}

const SPONSOR_LEXICON = {
    // 台通
    "專屬優惠": true,
    "贊助播出": true,
    "合作播出": true,
    "獨家優惠": true,
    "限定優惠": true,

    // 股癌
    "本集節目由": true,
    "本節目由": true,
    "折扣碼：gooaye": true,
    "股癌傳送門：": true,
    "贊助】": true,

    // 百靈果
    "百靈果教友專屬限時優惠": true,
    "百靈果優惠碼": true,

    "唐綺陽 X ": true,
    // maybe more to come...
}

/* This function takes in
    1. rss feed of podcast
    2. the date range that we'd like to filter.
*/

async function parseRSSPodcast(
        rssFeed,
        {startDate, endDate} /* date range for this parser to parse */
    ) {
    console.log(`Start Analyzing ${rssFeed}...`);

    const feed = await parser.parseURL(rssFeed);
    console.log(`========== Podcast Name: ${feed.title} ==========`);

    const episodes = feed.items;
    const recentEpisodes = episodes.filter((episode) => {
        const publishedDate = new Date (episode.isoDate);
        return publishedDate > startDate && publishedDate < endDate;
    });

    const data = [];
    recentEpisodes.forEach(episode => {
        const description = episode.content;
        for (const keyword in SPONSOR_LEXICON) {
            if(description.indexOf(keyword) >= 0) {
                data.push({
                    podcast_name: feed.title,
                    episode_title: episode.title,
                    date: episode.pubDate,
                    episode_description: clean(episode.content),
                    guess: 'sponsored',
                    guess_reason: keyword,
                });
                return;
            }
        }

        data.push({
            podcast_name: feed.title,
            episode_title: episode.title,
            date: episode.pubDate,
            episode_description: clean(episode.content),
            guess: 'not_sponsored',
            guess_reason: 'no keyword found',
        });
    });

    return data.reverse();
}



module.exports = parseRSSPodcast
