const fetch = require('node-fetch'); // Using CommonJS require

exports.handler = async function (event, context) {
    const API_KEY = process.env.YOUTUBE_API_KEY; // Ensure this environment variable is set correctly
    const channelId = 'UCm5Y8sHpz4ljDndK4cNmqPw'; // Replace with your actual YouTube channel ID
    const url = `https://www.googleapis.com/youtube/v3/channels?part=statistics&id=${channelId}&key=${API_KEY}`;

    try {
        const response = await fetch(url);

        if (!response.ok) {
            // Log detailed error response from YouTube API
            const errorText = await response.text();
            throw new Error(`YouTube API response not OK: ${response.status} ${response.statusText}. Details: ${errorText}`);
        }

        const data = await response.json();

        // Check if the API returned the expected data
        if (!data || !data.items || !data.items[0]) {
            throw new Error('Invalid response from YouTube API: ' + JSON.stringify(data));
        }

        // Return the result with CORS headers
        return {
            statusCode: 200,
            headers: {
                'Access-Control-Allow-Origin': '*', // Change '*' to your domain if you want to restrict access
                'Access-Control-Allow-Methods': 'GET'
            },
            body: JSON.stringify(data),
        };
    } catch (error) {
        console.error('Error fetching YouTube data:', error.message || error);
        return {
            statusCode: 500,
            headers: {
                'Access-Control-Allow-Origin': '*', // Change '*' to your domain if you want to restrict access
                'Access-Control-Allow-Methods': 'GET'
            },
            body: JSON.stringify({ error: 'Failed to fetch YouTube data', message: error.message }),
        };
    }
};
