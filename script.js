const PHOTOS = [
  "assets/photos/photo1.jpg",
  "assets/photos/photo2.jpg",
  "assets/photos/photo3.jpg",
  "assets/photos/photo4.jpg",
  "assets/photos/photo5.jpg",
  "assets/photos/photo6.jpg",
  "assets/photos/photo7.jpg",
  "assets/photos/photo8.jpg",
  "assets/photos/photo9.jpg",
  "assets/photos/photo10.jpg"
];

const TEXTS = [
  "happyy birthdayyy",
  "alwayss youuuu",
  "onlyyy youuu",
  "i loveee u",
  "foreverr",
  "kakaa cantiii",
  "calonnn guruuu tk :3",
  "ciee 16 tahunnn",
  "alwaysss withh meee"
];

const bgSong = document.getElementById("bg-song");
let songUnlocked = false;

function attemptAutoplay() {
  bgSong.muted = false;
  bgSong.volume = 1;
  const attempt = bgSong.play();
  if (attempt !== undefined) {
    attempt.then(() => {
      songUnlocked = true;
    }).catch(() => {
      bgSong.muted = true;
      bgSong.play().catch(() => {});
    });
  }
}

function unlockSong() {
  if (songUnlocked) return;
  bgSong.muted = false;
  bgSong.volume = 1;
  const attempt = bgSong.play();
  if (attempt !== undefined) {
    attempt.then(() => {
      songUnlocked = true;
    }).catch(() => {});
  }
}

attemptAutoplay();

["pointerdown", "touchstart", "touchmove", "touchend", "click", "scroll", "wheel", "keydown", "mousemove", "mousedown"].forEach((evt) => {
  window.addEventListener(evt, unlockSong, { passive: true, capture: true });
  document.addEventListener(evt, unlockSong, { passive: true, capture: true });
});
document.addEventListener("visibilitychange", () => {
  if (document.visibilityState === "visible") unlockSong();
});

window.addEventListener("load", () => {
  const bar = document.getElementById("loadingBar");
  requestAnimationFrame(() => {
    bar.style.width = "100%";
  });

  setTimeout(() => {
    document.getElementById("loading-screen").classList.add("hidden");
    startScene();
    attemptAutoplay();
    unlockSong();
  }, 2600);
});

const measureCanvas = document.createElement("canvas");
const measureCtx = measureCanvas.getContext("2d");
function measureTextWidth(text, fontSize) {
  measureCtx.font = `600 ${fontSize}px -apple-system, BlinkMacSystemFont, 'Segoe UI', Helvetica, Arial, sans-serif`;
  return measureCtx.measureText(text).width;
}

function buildFloatingPhotos() {
  const layer = document.getElementById("floating-photo-layer");
  const vw = window.innerWidth;
  const vh = window.innerHeight;

  const columnCount = Math.max(3, Math.min(5, Math.floor(vw / 150)));
  const columnWidth = vw / columnCount;
  const columns = Array.from({ length: columnCount }, () => []);

  PHOTOS.forEach((src, i) => {
    columns[i % columnCount].push(src);
  });

  const duration = 24;

  columns.forEach((colPhotos, colIndex) => {
    const laneStart = colIndex * columnWidth;
    const size = Math.max(70, Math.min(columnWidth - 24, 150));
    const travelDistance = vh + size * 2;
    const slotGap = duration / colPhotos.length;

    colPhotos.forEach((src, slotIndex) => {
      const el = document.createElement("div");
      el.className = "float-photo";
      el.style.width = size + "px";
      el.style.height = size + "px";

      const jitter = Math.max(0, columnWidth - size - 12);
      const startX = laneStart + 6 + Math.random() * jitter;
      el.style.left = startX + "px";
      el.style.top = -size + "px";

      const img = document.createElement("img");
      img.src = src;
      img.alt = "memory";
      el.appendChild(img);
      layer.appendChild(el);

      const delay = -(slotIndex * slotGap) * 1000;

      el.animate(
        [
          { transform: `translateY(0px)` },
          { transform: `translateY(${travelDistance}px)` }
        ],
        {
          duration: duration * 1000,
          iterations: Infinity,
          easing: "linear",
          delay: delay
        }
      );
    });
  });
}

function buildFloatingText() {
  const layer = document.getElementById("floating-text-layer");
  const vw = window.innerWidth;
  const vh = window.innerHeight;

  const columnCount = Math.max(3, Math.min(6, Math.floor(vw / 110)));
  const columnWidth = vw / columnCount;

  const pool = [...TEXTS, ...TEXTS];
  const columns = Array.from({ length: columnCount }, () => []);
  pool.forEach((word, i) => {
    columns[i % columnCount].push(word);
  });

  const duration = 20;

  columns.forEach((colWords, colIndex) => {
    const laneStart = colIndex * columnWidth;
    const slotGap = duration / colWords.length;

    colWords.forEach((word, slotIndex) => {
      const fontSize = 11 + Math.random() * 5;
      const textWidth = measureTextWidth(word, fontSize);

      const el = document.createElement("div");
      el.className = "float-text";
      el.textContent = word;
      el.style.fontSize = fontSize + "px";
      el.style.opacity = (0.4 + Math.random() * 0.3).toFixed(2);

      const maxX = Math.max(laneStart + 4, laneStart + columnWidth - textWidth - 4);
      const minX = laneStart + 4;
      const startX = Math.min(maxX, minX + Math.random() * Math.max(0, maxX - minX));
      el.style.left = Math.max(4, Math.min(startX, vw - textWidth - 4)) + "px";
      el.style.top = -30 + "px";

      layer.appendChild(el);

      const delay = -(slotIndex * slotGap) * 1000;

      el.animate(
        [
          { transform: `translateY(0px)` },
          { transform: `translateY(${vh + 60}px)` }
        ],
        {
          duration: duration * 1000,
          iterations: Infinity,
          easing: "linear",
          delay: delay
        }
      );
    });
  });
}

let sceneStarted = false;
function startScene() {
  if (sceneStarted) return;
  sceneStarted = true;
  buildFloatingPhotos();
  buildFloatingText();
}

let resizeTimer;
window.addEventListener("resize", () => {
  clearTimeout(resizeTimer);
  resizeTimer = setTimeout(() => {
    if (!sceneStarted) return;
    document.getElementById("floating-photo-layer").innerHTML = "";
    document.getElementById("floating-text-layer").innerHTML = "";
    buildFloatingPhotos();
    buildFloatingText();
  }, 400);
});
