const fetch = require('node-fetch');

exports.handler = async function (event, context) {
  const API_KEY = process.env.YOUTUBE_API_KEY; // Your YouTube API Key stored in Netlify environment variables
  const CHANNEL_ID = 'UCm5Y8sHpz4ljDndK4cNmqPw'; // Your YouTube channel ID

  try {
    // Fetch the uploads playlist ID
    const playlistResponse = await fetch(`https://www.googleapis.com/youtube/v3/channels?part=contentDetails&id=${CHANNEL_ID}&key=${API_KEY}`);
    const playlistData = await playlistResponse.json();
    const uploadsPlaylistId = playlistData.items[0].contentDetails.relatedPlaylists.uploads;

    // Fetch the most recent video from the uploads playlist
    const videosResponse = await fetch(`https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&playlistId=${uploadsPlaylistId}&maxResults=1&key=${API_KEY}`);
    const videosData = await videosResponse.json();

    return {
      statusCode: 200,
      body: JSON.stringify(videosData)
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Failed to fetch latest video' })
    };
  }
};
