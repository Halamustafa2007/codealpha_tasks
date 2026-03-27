const songs = [
    "music/song1.mp3",
    "music/song2.mp3"
];

let currentSong = 0;
let isPlaying = false;

const audio = document.getElementById("audioPlayer");
const title = document.getElementById("songTitle");
const playBtn = document.getElementById("playBtn");

// Load song
function loadSong(index) {
    audio.src = songs[index];
    title.textContent = "Playing: Song " + (index + 1);
}

// Play/Pause
function togglePlay() {
    if (isPlaying) {
        audio.pause();
        playBtn.textContent = "▶";
    } else {
        audio.play();
        playBtn.textContent = "⏸";
    }
    isPlaying = !isPlaying;
}

// Next song
function nextSong() {
    currentSong = (currentSong + 1) % songs.length;
    loadSong(currentSong);
    audio.play();
    isPlaying = true;
    playBtn.textContent = "⏸";
}

// Previous song
function prevSong() {
    currentSong = (currentSong - 1 + songs.length) % songs.length;
    loadSong(currentSong);
    audio.play();
    isPlaying = true;
    playBtn.textContent = "⏸";
}

// Auto load first song
loadSong(currentSong);