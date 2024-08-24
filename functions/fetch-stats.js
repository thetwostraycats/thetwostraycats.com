const fetch = require('node-fetch'); // Use CommonJS require

exports.handler = async function (event, context) { // Export using CommonJS
  const API_KEY = process.env.YOUTUBE_API_KEY;  // Ensure this environment variable is set correctly
  const channelId = 'UCm5Y8sHpz4ljDndK4cNmqPw';  // Replace with your actual YouTube channel ID
  const url = `https://www.googleapis.com/youtube/v3/channels?part=statistics&id=${channelId}&key=${API_KEY}`;

  try {
    const response = await fetch(url);
    
    if (!response.ok) {
      throw new Error(`YouTube API response not OK: ${response.status} ${response.statusText}`);
    }

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
      body: JSON.stringify({ error: 'Failed to fetch YouTube data', message: error.message }),
    };
  }
};
