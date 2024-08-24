const fetch = require('node-fetch');

exports.handler = async function(event, context) {
    const API_KEY = process.env.YOUTUBE_API_KEY;  // The API key is securely accessed from Netlify environment variables
    const channelId = '@twostraycats';  // Replace with your actual YouTube channel ID
    const url = `https://www.googleapis.com/youtube/v3/channels?part=statistics&id=${channelId}&key=${API_KEY}`;

    try {
        const response = await fetch(url);
        const data = await response.json();

        return {
            statusCode: 200,
            body: JSON.stringify(data),
        };
    } catch (error) {
        return { statusCode: 500, body: JSON.stringify({ error: 'Failed to fetch data' }) };
    }
};
