document.addEventListener('DOMContentLoaded', () => {

    // --- CONFIGURATION ---
    // PASTE YOUR GITHUB RAW LINK INSIDE THE QUOTES BELOW:
    const PLAYLIST_URL = 'https://raw.githubusercontent.com/username/repo/main/playlist.json'; 
    
    const playlistList = document.getElementById('playlist-list');
    const iframe = document.getElementById('youtube-frame');
    const overlay = document.getElementById('overlay');
    const nowPlayingText = document.getElementById('now-playing-text');

    // 1. Fetch the Playlist from the Cloud
    fetch(PLAYLIST_URL)
        .then(response => {
            if (!response.ok) throw new Error("Station Offline");
            return response.json();
        })
        .then(tracks => {
            loadPlaylist(tracks);
        })
        .catch(err => {
            console.error(err);
            // Fallback if link is broken or empty
            const demoTracks = [
                { title: "LINK NOT CONNECTED", id: "" },
                { title: "Edit popup.js Line 6", id: "" }
            ];
            loadPlaylist(demoTracks);
        });

    function loadPlaylist(tracks) {
        playlistList.innerHTML = '';
        
        tracks.forEach((track, index) => {
            const div = document.createElement('div');
            div.classList.add('track-item');
            div.innerText = `${index + 1}. ${track.title}`;
            
            div.addEventListener('click', () => {
                playTrack(track, div);
            });
            
            playlistList.appendChild(div);
        });
    }

    function playTrack(track, element) {
        if(!track.id) return;

        // Visual updates
        document.querySelectorAll('.track-item').forEach(el => el.classList.remove('active'));
        element.classList.add('active');
        overlay.classList.add('hidden');
        nowPlayingText.innerText = "NOW SPINNING: " + track.title;

        // Load YouTube Embed
        const embedUrl = `https://www.youtube.com/embed/${track.id}?autoplay=1&modestbranding=1&controls=1`;
        iframe.src = embedUrl;
    }
});