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

function tryPlaySong() {
  const attempt = bgSong.play();
  if (attempt !== undefined) {
    attempt.catch(() => {
      bgSong.muted = true;
      bgSong.play().then(() => {
        bgSong.muted = false;
      }).catch(() => {});
    });
  }
}

tryPlaySong();

window.addEventListener("load", () => {
  const bar = document.getElementById("loadingBar");
  requestAnimationFrame(() => {
    bar.style.width = "100%";
  });

  setTimeout(() => {
    document.getElementById("loading-screen").classList.add("hidden");
    startScene();
    tryPlaySong();
  }, 2600);
});

function buildFloatingPhotos() {
  const layer = document.getElementById("floating-photo-layer");
  const vw = window.innerWidth;
  const vh = window.innerHeight;

  PHOTOS.forEach((src, i) => {
    const el = document.createElement("div");
    el.className = "float-photo";

    const size = 70 + Math.random() * 55;
    el.style.width = size + "px";
    el.style.height = size + "px";

    const startX = Math.random() * (vw - size);
    el.style.left = startX + "px";

    const duration = 16 + Math.random() * 12;
    const delay = -Math.random() * duration;

    el.style.top = -size + "px";

    const img = document.createElement("img");
    img.src = src;
    img.alt = "memory";
    el.appendChild(img);

    layer.appendChild(el);

    el.animate(
      [
        { transform: `translateY(0px)` },
        { transform: `translateY(${vh + size * 2}px)` }
      ],
      {
        duration: duration * 1000,
        iterations: Infinity,
        easing: "linear",
        delay: delay * 1000
      }
    );
  });
}

function buildFloatingText() {
  const layer = document.getElementById("floating-text-layer");
  const vw = window.innerWidth;
  const vh = window.innerHeight;

  const pool = [...TEXTS, ...TEXTS, ...TEXTS];

  pool.forEach((word) => {
    const el = document.createElement("div");
    el.className = "float-text";
    el.textContent = word;

    const size = 11 + Math.random() * 7;
    el.style.fontSize = size + "px";

    const startX = Math.random() * (vw - 40);
    el.style.left = startX + "px";
    el.style.opacity = (0.35 + Math.random() * 0.35).toFixed(2);

    const duration = 14 + Math.random() * 12;
    const delay = -Math.random() * duration;

    el.style.top = -30 + "px";

    layer.appendChild(el);

    el.animate(
      [
        { transform: `translateY(0px)` },
        { transform: `translateY(${vh + 60}px)` }
      ],
      {
        duration: duration * 1000,
        iterations: Infinity,
        easing: "linear",
        delay: delay * 1000
      }
    );
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
