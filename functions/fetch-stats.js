import fetch from 'node-fetch'; // Change to ES Modules syntax

export async function handler(event, context) {  // Change to export function
    const API_KEY = process.env.YOUTUBE_API_KEY;  // Ensure this environment variable is set correctly
    const channelId = 'UCm5Y8sHpz4ljDndK4cNmqPw';  
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
        console.error('Error fetching YouTube data:', error.message || error);
        return {
            statusCode: 500,
            body: JSON.stringify({ error: 'Failed to fetch YouTube data' }),
        };
    }
}
