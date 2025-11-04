const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("show");
    }
  });
});
const hiddenElements = document.querySelectorAll(".hidden");
hiddenElements.forEach((el) => observer.observe(el));

var options = {
  strings: [
    "Full-Stack Developer",
    "Python & Django Expert",
    "React Enthusiast",
  ],
  typeSpeed: 50,
  backSpeed: 25,
  loop: true,
  cursorChar: "_",
};
var typed = new Typed("#typed-headline", options);

// Constellation canvas background
const canvas = document.getElementById("constellation-canvas");
const ctx = canvas.getContext("2d");
let particles = [];
let mouse = { x: null, y: null };

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener("resize", resizeCanvas);

canvas.addEventListener("mousemove", (e) => {
  mouse.x = e.clientX;
  mouse.y = e.clientY;
});
canvas.addEventListener("mouseleave", () => {
  mouse.x = null;
  mouse.y = null;
});

class Particle {
  constructor() {
    this.x = Math.random() * canvas.width;
    this.y = Math.random() * canvas.height;
    this.size = Math.random() * 2 + 1;
    this.speedX = Math.random() * 2 - 1;
    this.speedY = Math.random() * 2 - 1;
    this.color = getComputedStyle(document.documentElement)
      .getPropertyValue("--primary-color-start")
      .trim();
  }
  update() {
    if (this.x > canvas.width || this.x < 0) this.speedX = -this.speedX;
    if (this.y > canvas.height || this.y < 0) this.speedY = -this.speedY;
    this.x += this.speedX;
    this.y += this.speedY;
  }
  draw() {
    ctx.fillStyle = this.color;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fill();
  }
}

function init() {
  particles = [];
  let numberOfParticles = (canvas.height * canvas.width) / 9000;
  for (let i = 0; i < numberOfParticles; i++) {
    particles.push(new Particle());
  }
}
init();
window.addEventListener("resize", init);

function connect() {
  let opacityValue = 1;
  for (let a = 0; a < particles.length; a++) {
    for (let b = a; b < particles.length; b++) {
      let distance =
        (particles[a].x - particles[b].x) * (particles[a].x - particles[b].x) +
        (particles[a].y - particles[b].y) * (particles[a].y - particles[b].y);
      if (distance < (canvas.width / 7) * (canvas.height / 7)) {
        opacityValue = 1 - distance / 20000;
        ctx.strokeStyle = `rgba(0,170,255,${opacityValue})`;
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(particles[a].x, particles[a].y);
        ctx.lineTo(particles[b].x, particles[b].y);
        ctx.stroke();
      }
    }
  }
  if (mouse.x !== null && mouse.y !== null) {
    for (let i = 0; i < particles.length; i++) {
      let distance =
        (particles[i].x - mouse.x) * (particles[i].x - mouse.x) +
        (particles[i].y - mouse.y) * (particles[i].y - mouse.y);
      if (distance < (canvas.width / 8) * (canvas.height / 8)) {
        opacityValue = 1 - distance / 15000;
        ctx.strokeStyle = `rgba(170,0,255,${opacityValue})`;
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(particles[i].x, particles[i].y);
        ctx.lineTo(mouse.x, mouse.y);
        ctx.stroke();
      }
    }
  }
}

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  for (let i = 0; i < particles.length; i++) {
    particles[i].update();
    particles[i].draw();
  }
  connect();
  requestAnimationFrame(animate);
}
animate();

// Card image slideshow: rotate card images from an array of URLs
function preloadImages(urls) {
  urls.forEach((src) => {
    const img = new Image();
    img.src = src;
  });
}

/**
 * Start a slideshow on a specific <img> element.
 * - imgEl: the <img> DOM element
 * - images: array of image URLs
 * - ms: interval in milliseconds
 */
function startCardSlideshow(imgEl, images, ms = 3000) {
  if (!images || images.length < 2) return; // nothing to cycle
  preloadImages(images);
  let idx = images.indexOf(imgEl.src);
  if (idx === -1) idx = 0;
  // set initial src to the first in the list if current src missing
  if (!imgEl.src) imgEl.src = images[0];

  const id = setInterval(() => {
    idx = (idx + 1) % images.length;
    imgEl.src = images[idx];
  }, ms);

  // store interval id so it could be cleared later if needed
  imgEl.dataset.slideshowId = id;
}

// Default slides for cards — edit these URLs to match your actual image files
const defaultCardSlides = [
  "/assets/images1/MindWellGarden.png",
  "/assets/images1/MindWellGarden2.png",
  "/assets/images1/MindWellGarden3.png",
  "/assets/images1/MindWellGarden4.png",
  "/assets/images1/MindWellGarden5.png",
  "/assets/images1/MindWellGarden6.png",
  "/assets/images1/MindWellGarden7.png",
  "/assets/images1/MindWellGarden8.png",
];

// Attach slideshow to each card image. If an <img> has a data-images attribute
// it should be a comma-separated list of URLs and will override the defaults.
document.querySelectorAll(".cardImg img").forEach((img) => {
  let list = defaultCardSlides;
  const attr = img.getAttribute("data-images");
  if (attr) {
    // parse comma-separated list and trim values
    const parsed = attr
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean);
    if (parsed.length) list = parsed;
  }
  // start slideshow with a 3s default interval
  startCardSlideshow(img, list, 3000);
});

// Lightbox overlay with left/right navigation
(function () {
  const overlay = document.getElementById("lightboxOverlay");
  const content = document.getElementById("lightboxContent");
  const closeBtn = document.getElementById("lightboxClose");
  const prevBtn = document.getElementById("lightboxPrev");
  const nextBtn = document.getElementById("lightboxNext");

  let currentList = [];
  let currentIndex = 0;
  let overlayImg = null;

  function toPathname(u) {
    try {
      return new URL(u, window.location.origin).pathname;
    } catch (e) {
      return u;
    }
  }

  function findIndexBySrc(list, src) {
    const p = toPathname(src || "");
    let i = list.findIndex((u) => toPathname(u) === p);
    if (i !== -1) return i;
    const end = p.split("/").pop();
    i = list.findIndex((u) => toPathname(u).endsWith(end || ""));
    return i === -1 ? 0 : i;
  }

  function showAt(index) {
    if (!currentList.length || !overlayImg) return;
    currentIndex = (index + currentList.length) % currentList.length;
    overlayImg.src = currentList[currentIndex];
    content.scrollTop = 0; // allow vertical scroll from top
  }

  function openOverlay(list, startIndex) {
    currentList = list.slice();
    currentIndex = startIndex || 0;
    content.innerHTML = "";
    overlayImg = document.createElement("img");
    overlayImg.alt = "Preview";
    overlayImg.style.display = "block";
    overlayImg.style.width = "100%"; // will overflow vertically if tall
    overlayImg.style.height = "auto";
    content.appendChild(overlayImg);
    showAt(currentIndex);
    overlay.classList.add("open");
    document.body.style.overflow = "hidden";
  }

  function closeOverlay() {
    overlay.classList.remove("open");
    document.body.style.overflow = "";
    currentList = [];
    currentIndex = 0;
    overlayImg = null;
  }

  // Click to open from card images
  document.querySelectorAll(".cardImg img").forEach((img) => {
    img.style.cursor = "zoom-in";
    img.addEventListener("click", () => {
      let list = defaultCardSlides;
      const attr = img.getAttribute("data-images");
      if (attr) {
        const parsed = attr
          .split(",")
          .map((s) => s.trim())
          .filter(Boolean);
        if (parsed.length) list = parsed;
      }
      const idx = findIndexBySrc(list, img.src || list[0]);
      openOverlay(list, idx);
    });
  });

  // Controls & keyboard
  closeBtn && closeBtn.addEventListener("click", closeOverlay);
  prevBtn && prevBtn.addEventListener("click", () => showAt(currentIndex - 1));
  nextBtn && nextBtn.addEventListener("click", () => showAt(currentIndex + 1));
  overlay &&
    overlay.addEventListener("click", (e) => {
      if (e.target === overlay) closeOverlay();
    });
  document.addEventListener("keydown", (e) => {
    if (!overlay.classList.contains("open")) return;
    if (e.key === "Escape") closeOverlay();
    if (e.key === "ArrowLeft") showAt(currentIndex - 1);
    if (e.key === "ArrowRight") showAt(currentIndex + 1);
  });
})();
