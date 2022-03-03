const podcastRSSParser = require('./podcastRSSParser');
const createCsvWriter = require('csv-writer').createObjectCsvWriter;

const PODCASTS_OF_CHAN_INTEREST = [
    "https://anchor.fm/s/1ea77470/podcast/rss",
    "https://api.soundon.fm/v2/podcasts/954689a5-3096-43a4-a80b-7810b219cef3/feed.xml",
    "https://feeds.soundcloud.com/users/soundcloud:users:221361980/sounds.rss",
    "https://api.soundon.fm/v2/podcasts/ecd31076-d12d-46dc-ba11-32d24b41cca5/feed.xml",
    "https://open.firstory.me/rss/user/ckga7ibs77fgl0875bxwgl0y0",

    "https://api.soundon.fm/v2/podcasts/adf29720-e93b-4856-a09e-b73544147ec4/feed.xml",
    "https://feeds.soundon.fm/podcasts/73930beb-4136-4b36-a910-39984335b7bb.xml",
    "https://api.soundon.fm/v2/podcasts/32bfdf2f-7de7-410d-9ad5-73106c9b1253/feed.xml",
    "https://anchor.fm/s/98a6fac/podcast/rss",
    "https://feeds.soundon.fm/podcasts/6731d283-54f0-49ec-a040-e5a641c3125f.xml",

    "https://api.soundon.fm/v2/podcasts/9ccb133d-97ce-4e06-b88f-78ce077038c7/feed.xml",
    "https://open.firstory.me/rss/user/ckudnw7fn4tqg0870axzgirva",
    "https://api.soundon.fm/v2/podcasts/44833083-490d-4f97-a782-fd5e34c0abef/feed.xml",
    "https://open.firstory.me/rss/user/ckck4o54roulv09183w7fh18r",
    "https://open.firstory.me/rss/user/ckg2mhkljssl708756xu1zvcy",

    "https://feeds.soundon.fm/podcasts/8632047c-dd18-4bde-a86c-f6c44df60b16.xml",
    "https://api.soundon.fm/v2/podcasts/17e025f5-3a87-41b5-8cff-af804ad195f3/feed.xml",
    "https://feeds.soundon.fm/podcasts/ea1ced16-be9e-400f-a353-03f56d06958b.xml",
    "https://feeds.soundon.fm/podcasts/7407e3d0-4af7-404e-8b92-d54ce9b38e67.xml",
    "https://open.firstory.me/rss/user/cklgleootmx7m0892dtop9eq2",

    "https://open.firstory.me/rss/user/ck7t2fz77qu7g0873ln5hz5cl",
    "https://api.soundon.fm/v2/podcasts/b8f5a471-f4f7-4763-9678-65887beda63a/feed.xml",
    "https://open.firstory.me/rss/user/ckks1zslyfivy0813zymmmd86",
    "https://open.firstory.me/rss/user/ckfhpfssf3hn20836di2jkpef",
];

async function main() {

    const startDate = new Date("2021-09-01T00:00:00.000+08:00");
    const endDate = new Date("20221-11-30T23:59:59.000+08:00");

    const createCsvWriter = require('csv-writer').createObjectCsvWriter;
    const csvWriter = createCsvWriter({
    path: '2021-09 2021-11 podcast-sponsor.csv',
    header: [
            {id: 'podcast_name', title: 'Podcast Name'},
            {id: 'episode_title', title: 'Episode Title'},
            {id: 'date', title: 'Date'},
            {id: 'episode_description', title: 'Episode Description'},
            {id: 'guess', title: 'Guess of Sponsorship'},
            {id: 'guess_reason', title: 'Matched Keyword'},
        ],
    });

    const allPodcastData = [];
    for (podcastRSSURL of PODCASTS_OF_CHAN_INTEREST) {
        const podcastData = await podcastRSSParser(podcastRSSURL, {startDate, endDate});
        allPodcastData.push(...podcastData);
        // Add a newline after one podcast show
        allPodcastData.push({
            podcast_name: "",
            episode_title: "",
            date: "",
            episode_description: "",
            guess: "",
            guess_reason: "",
        });
    }

    csvWriter
        .writeRecords(allPodcastData)
        .then(()=> console.log('The CSV file was written successfully'));
}

main();
