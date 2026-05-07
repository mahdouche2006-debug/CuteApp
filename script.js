
const closebtn = document.getElementById('closeButton');
const minbtn = document.getElementById('minimizeButton');

closebtn.addEventListener('click', () => {
    window.electronAPI.closeApp(); // Call the bridge function
});

minbtn.addEventListener('click', () => {
    window.electronAPI.minimizeApp(); // Call the bridge function
});

// Music Player Logic

const audio = document.getElementById('music-player');
const displayImg = document.getElementById('display-image');
const displayVideo = document.getElementById('display-video');
const playBtn = document.getElementById('playBtn');
const displayPlayBtnImage = document.querySelector('.playBtn')

function loadSong(index) {
    const song = playlist[index];
    audio.src = song.file;

    if (song.type === "video") {
        displayVideo.src = song.media;
        displayVideo.style.display = "block";
        displayImg.style.display = "none";
        if (!audio.paused) {
            displayVideo.play();
        }
    } else {
        displayImg.src = song.media;
        displayImg.style.display = "block";
        displayVideo.style.display = "none";
        displayVideo.pause();
        displayVideo.src = "";
    }

    const display = document.getElementById('song-title-display');
    display.innerText = song.title;

    const songTitleContainer = document.querySelector('.song-title-container');

    // If the title is short, stop the animation so it stays centered
    if (song.title.length < 20) {
        display.style.animation = 'none';
        display.style.paddingLeft = '0';
    } else {
        // Restart the animation for long titles
        display.style.animation = 'parade 13s linear infinite';
        display.style.paddingLeft = '100%';
        
    }

    progressBar.value = 0;
}

// Play/Pause Toggle
playBtn.addEventListener('click', () => {
    if (audio.paused) {
        audio.play();
        if (!displayVideo.paused) {} // ignore if no video
        displayVideo.play();
        displayPlayBtnImage.src = "images/pauseButton.png";
    } else {
        audio.pause();
        displayVideo.pause();
        displayPlayBtnImage.src = "images/playButton.png";
    }
});

const nextBtn = document.getElementById('nextBtn');
const prevBtn = document.getElementById('prevBtn');

// Next Song
nextBtn.addEventListener('click', () => {
    currentSongIndex++;
    if (currentSongIndex > playlist.length - 1) {
        currentSongIndex = 0; // Loop back to the start
        loadSong(currentSongIndex);
        displayPlayBtnImage.src = "images/playButton.png";
    } else {
        loadSong(currentSongIndex);
        audio.play(); // Auto-play after switching
        displayPlayBtnImage.src = "images/pauseButton.png";
    }
});

// Previous Song
prevBtn.addEventListener('click', () => {
    currentSongIndex--;
    if (currentSongIndex < 0) {
        currentSongIndex = playlist.length - 1; // Loop to the end
    }
    loadSong(currentSongIndex);
    audio.play();
    displayPlayBtnImage.src = "images/pauseButton.png";
});

// Progress Bar Logic
const progressBar = document.getElementById('progress-bar');
const currentTimeEl = document.getElementById('current-time');
const durationTimeEl = document.getElementById('duration-time');

// Update progress bar as song plays
audio.addEventListener('timeupdate', () => {
    if (audio.duration) {
        // Calculate percentage: (current / total) * 100
        const progressPercent = (audio.currentTime / audio.duration) * 100;
        progressBar.value = progressPercent;

        // Update time text
        currentTimeEl.innerText = formatTime(audio.currentTime);
    }
});

// Let the user click the bar to change song position
progressBar.addEventListener('input', () => {
    const seekTime = (progressBar.value / 100) * audio.duration;
    audio.currentTime = seekTime;
    if (!displayVideo.paused || displayVideo.currentTime > 0) {
        displayVideo.currentTime = seekTime;
    }
});

// Helper function to turn seconds into 0:00 format
function formatTime(seconds) {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
}

// Set total duration once the file loads
audio.addEventListener('loadedmetadata', () => {
    durationTimeEl.innerText = formatTime(audio.duration);
});

// Automatically play next song when one finishes
audio.addEventListener('ended', () => {
    currentSongIndex++;
    if (currentSongIndex >= playlist.length) {
        currentSongIndex = 0; // Loop to start
        loadSong(currentSongIndex);
        displayPlayBtnImage.src = "images/playButton.png";
    }
    else {
        loadSong(currentSongIndex);
        audio.play(); // Auto-play after switching
        displayPlayBtnImage.src = "images/pauseButton.png";
    }
});

loadSong(currentSongIndex); // Load the first song on startup