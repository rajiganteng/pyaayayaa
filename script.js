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

window.addEventListener("load", () => {
  const bar = document.getElementById("loadingBar");
  requestAnimationFrame(() => {
    bar.style.width = "100%";
  });

  setTimeout(() => {
    document.getElementById("loading-screen").classList.add("hidden");
    startScene();
    playSong();
  }, 2600);
});

function playSong() {
  const attempt = bgSong.play();
  if (attempt !== undefined) {
    attempt.catch(() => {
      const resume = () => {
        bgSong.play();
        document.removeEventListener("click", resume);
        document.removeEventListener("touchstart", resume);
      };
      document.addEventListener("click", resume);
      document.addEventListener("touchstart", resume);
    });
  }
}

function buildFloatingText() {
  const layer = document.getElementById("floating-text-layer");
  const vw = window.innerWidth;
  const vh = window.innerHeight;

  const pool = [...TEXTS, ...TEXTS];

  pool.forEach((word) => {
    const el = document.createElement("div");
    el.className = "float-text";
    el.textContent = word;

    const size = 14 + Math.random() * 16;
    el.style.fontSize = size + "px";

    const startX = Math.random() * (vw - 40);
    const startY = Math.random() * (vh - 40);
    el.style.left = startX + "px";
    el.style.top = startY + "px";
    el.style.opacity = (0.15 + Math.random() * 0.25).toFixed(2);

    layer.appendChild(el);

    animateFloat(el, 18 + Math.random() * 14);
  });
}

function buildFloatingPhotos() {
  const layer = document.getElementById("floating-photo-layer");
  const vw = window.innerWidth;
  const vh = window.innerHeight;

  PHOTOS.forEach((src, i) => {
    const el = document.createElement("div");
    el.className = "float-photo";

    const size = 90 + Math.random() * 70;
    el.style.width = size + "px";
    el.style.height = size + "px";

    const startX = Math.random() * (vw - size);
    const startY = Math.random() * (vh - size);
    el.style.left = startX + "px";
    el.style.top = startY + "px";
    el.style.opacity = "0";
    el.style.transform = "scale(0.8)";

    const img = document.createElement("img");
    img.src = src;
    img.alt = "memory";
    el.appendChild(img);

    layer.appendChild(el);

    setTimeout(() => {
      el.style.transition = "opacity 1.2s ease, transform 1.2s ease";
      el.style.opacity = "1";
      el.style.transform = "scale(1)";
    }, 150 * i);

    animateFloat(el, 22 + Math.random() * 16, true);
  });
}

function animateFloat(el, duration, isPhoto = false) {
  const driftX = (Math.random() - 0.5) * (isPhoto ? 90 : 60);
  const driftY = (Math.random() - 0.5) * (isPhoto ? 90 : 60);
  const rotate = (Math.random() - 0.5) * (isPhoto ? 10 : 6);

  const keyframes = [
    { transform: `translate(0px, 0px) rotate(0deg) ${isPhoto ? 'scale(1)' : ''}` },
    { transform: `translate(${driftX}px, ${driftY}px) rotate(${rotate}deg) ${isPhoto ? 'scale(1)' : ''}` },
    { transform: `translate(${-driftX * 0.6}px, ${driftY * 0.4}px) rotate(${-rotate}deg) ${isPhoto ? 'scale(1)' : ''}` },
    { transform: `translate(0px, 0px) rotate(0deg) ${isPhoto ? 'scale(1)' : ''}` }
  ];

  el.animate(keyframes, {
    duration: duration * 1000,
    iterations: Infinity,
    easing: "ease-in-out",
    delay: Math.random() * -duration * 1000
  });

  if (!isPhoto) {
    el.animate(
      [
        { opacity: el.style.opacity },
        { opacity: Math.min(1, parseFloat(el.style.opacity) + 0.25) },
        { opacity: el.style.opacity }
      ],
      {
        duration: (duration * 0.6) * 1000,
        iterations: Infinity,
        easing: "ease-in-out",
        delay: Math.random() * -duration * 600
      }
    );
  }
}

let sceneStarted = false;
function startScene() {
  if (sceneStarted) return;
  sceneStarted = true;
  buildFloatingText();
  buildFloatingPhotos();
}

let resizeTimer;
window.addEventListener("resize", () => {
  clearTimeout(resizeTimer);
  resizeTimer = setTimeout(() => {
    if (!sceneStarted) return;
    document.getElementById("floating-text-layer").innerHTML = "";
    document.getElementById("floating-photo-layer").innerHTML = "";
    buildFloatingText();
    buildFloatingPhotos();
  }, 400);
});
