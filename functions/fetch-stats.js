import fetch from 'node-fetch'; // Use import instead of require

export async function handler(event, context) {
    const API_KEY = process.env.YOUTUBE_API_KEY;  // Ensure this environment variable is set correctly
    const channelId = '@twostraycats';  // Replace with your actual YouTube channel ID
    const url = `https://www.googleapis.com/youtube/v3/channels?part=statistics&id=${channelId}&key=${API_KEY}`;

    try {
        const response = await fetch(url);
        const data = await response.json();

        // Check if the API returned the expected data
        if (!data || !data.items || !data.items[0]) {
            throw new Error('Invalid response from YouTube API');
        }

        return {
            statusCode: 200,
            body: JSON.stringify(data),
        };
    } catch (error) {
        console.error('Error fetching YouTube data:', error);
        return {
            statusCode: 500,
            body: JSON.stringify({ error: 'Failed to fetch YouTube data' }),
        };
    }
}
