const envelopeContainer = document.getElementById("envelopeContainer");
const letter = document.getElementById("letter");
const yesBtn = document.getElementById("yesBtn");
const noBtn = document.getElementById("noBtn");
const sadMessage = document.getElementById("sadMessage");
const flowersLetter = document.getElementById("flowersLetter");
const secondYesBtn = document.getElementById("secondYesBtn");
const secondNoBtn = document.getElementById("secondNoBtn");
const jokeMessage = document.getElementById("jokeMessage");
const finalYesBtn = document.getElementById("finalYesBtn");
const gift1 = document.getElementById("gift1");
const gift2 = document.getElementById("gift2");
const gift3 = document.getElementById("gift3");

const yesPopup = document.getElementById("yesPopup");
const continueBtn = document.getElementById("continueBtn");

const songModal = document.getElementById("songModal");
const photoModal = document.getElementById("photoModal");
const giftPhotoModal = document.getElementById("giftPhotoModal");
const closeModals = document.querySelectorAll(".close-modal");

const softFlowers = document.getElementById("softFlowers");
const closeSoftFlowers = document.querySelector(".close-soft-flowers");
const softFlowersCloseBtn = document.getElementById("softFlowersCloseBtn");
const viewFlowersAgainBtn = document.getElementById("viewFlowersAgainBtn");

document.addEventListener("DOMContentLoaded", function () {
    const audio = document.getElementById("loveSong");
    const playBtn = document.getElementById("playBtn");
    const progressBar = document.getElementById("progressBar");
    const progressContainer = document.querySelector(".progress-container");
    
    let isPlaying = false;
    let hasStarted = false;
    
    function formatTime(seconds) {
        const mins = Math.floor(seconds / 60);
        const secs = Math.floor(seconds % 60);
        return `${mins}:${secs < 10 ? "0" : ""}${secs}`;
    }
    
    function updateProgress() {
        if (audio.duration && audio.duration > 0) {
            const percent = (audio.currentTime / audio.duration) * 100;
            progressBar.style.width = `${percent}%`;
        }
    }
    
    function updateStatus() {
        if (!audio.paused) {
            isPlaying = true;
            playBtn.classList.add("playing");
            playBtn.innerHTML =
                '<span class="play-icon">⏸</span><span class="play-text">Pause</span>';
        } else {
            isPlaying = false;
            playBtn.classList.remove("playing");
            playBtn.innerHTML =
                '<span class="play-icon">▶</span><span class="play-text">Play</span>';
        }
    }
    
    function togglePlay() {
        if (!hasStarted) {
            audio.currentTime = 55;
            hasStarted = true;
            audio.play().catch((e) => {
                console.log("Play failed:", e);
            });
        } else {
            if (audio.paused) {
                audio.play();
            } else {
                audio.pause();
            }
        }
        updateStatus();
    }
    
    function seekToPosition(e) {
        if (audio.duration && audio.duration > 0) {
            const rect = progressContainer.getBoundingClientRect();
            const pos = (e.clientX - rect.left) / rect.width;
            audio.currentTime = pos * audio.duration;
            
            if (audio.paused) {
                audio.play();
                updateStatus();
            }
        }
    }
    
    function initPlayer() {
        audio.load();
        playBtn.addEventListener("click", togglePlay);
        progressContainer.addEventListener("click", seekToPosition);
        audio.addEventListener("timeupdate", updateProgress);
        audio.addEventListener("play", updateStatus);
        audio.addEventListener("pause", updateStatus);
        audio.addEventListener("ended", handleEnded);
        audio.addEventListener("error", function (e) {
            console.error("Audio error:", e);
            playBtn.disabled = true;
            playBtn.style.opacity = "0.5";
            playBtn.innerHTML =
                '<span class="play-icon">⚠️</span><span class="play-text">Error</span>';
        });
    }
    
    function handleEnded() {
        isPlaying = false;
        playBtn.classList.remove("playing");
        playBtn.innerHTML =
            '<span class="play-icon">↻</span><span class="play-text">Play again</span>';
        hasStarted = false;
    }
    
    initPlayer();
});

envelopeContainer.addEventListener("click", function () {
    this.classList.add("open");
    
    setTimeout(() => {
        letter.classList.add("visible");
    }, 800);
});

function showYesPopup() {
    yesPopup.style.display = "block";
    for (let i = 0; i < 8; i++) {
        setTimeout(() => {
            createFloatingHeartInPopup();
        }, i * 200);
    }
}

function createFloatingHeartInPopup() {
    const heart = document.createElement("div");
    heart.innerHTML = "❤️";
    heart.classList.add("floating-heart");
    heart.style.fontSize = Math.random() * 20 + 15 + "px";
    heart.style.left = Math.random() * 100 + "vw";
    heart.style.top = "100vh";
    heart.style.color = ["#ff6b8b", "#ff8a8a", "#ff4081"][Math.floor(Math.random() * 3)];
    heart.style.opacity = "0.9";
    document.body.appendChild(heart);
    
    const animation = heart.animate([
        { transform: "translateY(0) rotate(0deg)", opacity: 0.9 },
        { transform: `translateY(-${Math.random() * 400 + 200}px) rotate(${Math.random() * 360}deg)`, opacity: 0 }
    ], {
        duration: Math.random() * 3000 + 2500,
        easing: "ease-out"
    });
    
    animation.onfinish = () => {
        heart.remove();
    };
}

yesBtn.addEventListener("click", function() {
    letter.classList.remove("visible");
    setTimeout(() => {
        showYesPopup();
    }, 300);
});

secondYesBtn.addEventListener("click", function() {
    sadMessage.style.display = "none";
    setTimeout(() => {
        showYesPopup();
    }, 300);
});

finalYesBtn.addEventListener("click", function() {
    jokeMessage.style.display = "none";
    setTimeout(() => {
        showYesPopup();
    }, 300);
});

continueBtn.addEventListener("click", function() {
    yesPopup.style.display = "none";
    flowersLetter.style.display = "block";
    flowersLetter.classList.add("visible");
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
    
    for (let i = 0; i < 10; i++) {
        setTimeout(createFloatingHearts, i * 300);
    }
});

window.addEventListener("click", function(event) {
    if (event.target === yesPopup) {
        yesPopup.style.display = "none";
        flowersLetter.style.display = "block";
        flowersLetter.classList.add("visible");
        document.body.scrollTop = 0;
        document.documentElement.scrollTop = 0;
    }
});

noBtn.addEventListener("click", function () {
    letter.classList.remove("visible");
    setTimeout(() => {
        sadMessage.style.display = "block";
    }, 500);
});

secondNoBtn.addEventListener("click", function () {
    sadMessage.style.display = "none";
    jokeMessage.style.display = "block";
});

function createFloatingHearts() {
    const heart = document.createElement("div");
    heart.innerHTML = "❤️";
    heart.classList.add("floating-heart");
    heart.style.fontSize = Math.random() * 20 + 10 + "px";
    heart.style.left = Math.random() * 100 + "vw";
    heart.style.top = "100vh";
    heart.style.opacity = "0.7";
    document.body.appendChild(heart);
    
    const animation = heart.animate(
        [
            { transform: "translateY(0) rotate(0deg)", opacity: 0.7 },
            {
                transform: `translateY(-${Math.random() * 300 + 100}px) rotate(${Math.random() * 360}deg)`,
                opacity: 0,
            },
        ],
        {
            duration: Math.random() * 3000 + 2000,
            easing: "ease-out",
        },
    );
    
    animation.onfinish = () => {
        heart.remove();
    };
}

setInterval(createFloatingHearts, 800);
for (let i = 0; i < 5; i++) {
    setTimeout(createFloatingHearts, i * 300);
}

if ("ontouchstart" in window) {
    envelopeContainer.style.cursor = "pointer";
}

let giftsOpened = {
    song: false,
    photo: false,
    letter: false,
};

let flowersShown = false;
let flowersPopupClosed = false;

function showSoftFlowers() {
    const allOpened = giftsOpened.song && giftsOpened.photo && giftsOpened.letter;
    if (allOpened && !flowersShown) {
        flowersShown = true;
        setTimeout(() => {
            softFlowers.style.display = "block";
            for (let i = 0; i < 15; i++) {
                setTimeout(createFloatingHearts, i * 100);
            }
        }, 300);
    }
}

gift1.addEventListener("click", function () {
    giftsOpened.song = true;
    songModal.style.display = "block";
});

gift2.addEventListener("click", function () {
    giftsOpened.photo = true;
    photoModal.style.display = "block";
});

gift3.addEventListener("click", function () {
    giftsOpened.letter = true;
    giftPhotoModal.style.display = "block";
});

function handleModalClose() {
    const audio = document.getElementById("loveSong");
    if (audio) {
        audio.pause();
        audio.currentTime = 55;
    }
    
    const playBtn = document.getElementById("playBtn");
    if (playBtn) {
        playBtn.classList.remove("playing");
        playBtn.innerHTML =
            '<span class="play-icon">▶</span><span class="play-text">Play</span>';
    }
    showSoftFlowers();
}

closeModals.forEach((closeBtn) => {
    closeBtn.addEventListener("click", function () {
        songModal.style.display = "none";
        photoModal.style.display = "none";
        giftPhotoModal.style.display = "none";
        handleModalClose();
    });
});

window.addEventListener("click", function (event) {
    if (
        event.target === songModal ||
        event.target === photoModal ||
        event.target === giftPhotoModal
    ) {
        songModal.style.display = "none";
        photoModal.style.display = "none";
        giftPhotoModal.style.display = "none";
        handleModalClose();
    }
});

function showViewFlowersButton() {
    if (
        (flowersPopupClosed && !viewFlowersAgainBtn.style.display) ||
        viewFlowersAgainBtn.style.display === "none"
    ) {
        viewFlowersAgainBtn.style.display = "block";
        viewFlowersAgainBtn.style.animation = "gentlePulse 3s infinite ease-in-out";
    }
}

function reopenFlowersPopup() {
    softFlowers.style.display = "block";
    for (let i = 0; i < 10; i++) {
        setTimeout(createFloatingHearts, i * 150);
    }
}

closeSoftFlowers.addEventListener("click", function () {
    softFlowers.style.display = "none";
    flowersPopupClosed = true;
    showViewFlowersButton();
});

softFlowersCloseBtn.addEventListener("click", function () {
    softFlowers.style.display = "none";
    flowersPopupClosed = true;
    showViewFlowersButton();
});

window.addEventListener("click", function (event) {
    if (event.target === softFlowers) {
        softFlowers.style.display = "none";
        flowersPopupClosed = true;
        showViewFlowersButton();
    }
});

viewFlowersAgainBtn.addEventListener("click", function () {
    reopenFlowersPopup();
    viewFlowersAgainBtn.style.display = "none";
});

softFlowers.addEventListener("click", function () {
    if (event.target === softFlowers) {
        viewFlowersAgainBtn.style.display = "none";
    }
});

const observer = new MutationObserver(function (mutations) {
    mutations.forEach(function (mutation) {
        if (mutation.attributeName === "style") {
            const displayStyle = window.getComputedStyle(softFlowers).display;
            if (displayStyle === "none" && flowersShown) {
                flowersPopupClosed = true;
                showViewFlowersButton();
            }
        }
    });
});

observer.observe(softFlowers, { attributes: true });