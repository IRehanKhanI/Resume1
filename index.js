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
const MindWell = [
  "assets/MindWell/MindWellGarden.png",
  "assets/MindWell/MindWellGarden2.png",
  "assets/MindWell/MindWellGarden3.png",
  "assets/MindWell/MindWellGarden4.png",
  "assets/MindWell/MindWellGarden5.png",
  "assets/MindWell/MindWellGarden6.png",
  "assets/MindWell/MindWellGarden7.png",
  "assets/MindWell/MindWellGarden8.png",
];
const Rentify = [
  "assets/Rentify/Rentfy (1).png",
  "assets/Rentify/Rentfy (2).png",
  "assets/Rentify/Rentfy (3).png",
  "assets/Rentify/Rentfy (4).png",
  "assets/Rentify/Rentfy (5).png",
  "assets/Rentify/Rentfy (6).png",
  "assets/Rentify/Rentfy (7).png",
  "assets/Rentify/Rentfy (8).png",
  "assets/Rentify/Rentfy (9).png",
  "assets/Rentify/Rentfy (10).png",
  "assets/Rentify/Rentfy (11).png",
  "assets/Rentify/Rentfy (12).png",
  "assets/Rentify/Rentfy (13).png",
  "assets/Rentify/Rentfy (14).png",
  "assets/Rentify/Rentfy (15).png",
  "assets/Rentify/Rentfy (16).png",
  "assets/Rentify/Rentfy (17).png",
  "assets/Rentify/Rentfy (18).png",
  "assets/Rentify/Rentfy (19).png",
];
// Utility: pick gallery list for a given image
function getGalleryList(img) {
  // 1) data-images override
  const attr = img.getAttribute("data-images");
  if (attr) {
    const parsed = attr
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean);
    if (parsed.length) return parsed;
  }
  // 2) data-gallery hint
  const g = (img.getAttribute("data-gallery") || "").toLowerCase();
  if (g === "mindwell") return MindWell;
  if (g === "rentify") return Rentify;

  // 3) infer from id/src
  const id = (img.id || "").toLowerCase();
  const src = (img.getAttribute("src") || "").toLowerCase();
  if (id.includes("mindwell") || src.includes("mindwell")) return MindWell;
  if (id.includes("rentify") || src.includes("rentify")) return Rentify;

  // 4) fallback: no gallery
  return [];
}

// Build Bootstrap carousels for each project image container for smoother transitions
function buildProjectCarousels() {
  let counter = 0;
  document.querySelectorAll(".cardImg").forEach((container) => {
    const placeholder = container.querySelector("img");
    if (!placeholder) return;
    const list = getGalleryList(placeholder);
    if (!list || list.length === 0) return; // keep as-is if no gallery list

    counter += 1;
    const carouselId = `project-carousel-${counter}`;

    // Guess gallery hint to keep overlay list detection robust
    const hint = (() => {
      const g = (placeholder.getAttribute("data-gallery") || "").toLowerCase();
      if (g) return g;
      const src = (placeholder.getAttribute("src") || "").toLowerCase();
      if (src.includes("mindwell")) return "mindwell";
      if (src.includes("rentify")) return "rentify";
      const first = (list[0] || "").toLowerCase();
      if (first.includes("mindwell")) return "mindwell";
      if (first.includes("rentify")) return "rentify";
      return "";
    })();

    const slides = list
      .map((src, i) => {
        const safeAlt = placeholder.getAttribute("alt") || `Slide ${i + 1}`;
        return `\n<div class="carousel-item${
          i === 0 ? " active" : ""
        }">\n  <img src="${src}" class="d-block w-100" alt="${safeAlt}"${
          hint ? ` data-gallery="${hint}"` : ""
        } />\n</div>`;
      })
      .join("");

    const controls =
      list.length > 1
        ? `\n<button class="carousel-control-prev" type="button" data-bs-target="#${carouselId}" data-bs-slide="prev">\n  <span class="carousel-control-prev-icon" aria-hidden="true"></span>\n  <span class="visually-hidden">Previous</span>\n</button>\n<button class="carousel-control-next" type="button" data-bs-target="#${carouselId}" data-bs-slide="next">\n  <span class="carousel-control-next-icon" aria-hidden="true"></span>\n  <span class="visually-hidden">Next</span>\n</button>`
        : "";

    container.innerHTML = `\n<div id="${carouselId}" class="carousel slide" data-bs-ride="carousel" data-bs-interval="3000" data-bs-pause="hover">\n  <div class="carousel-inner">${slides}\n  </div>${controls}\n</div>`;
  });
}

// Initialize carousels (replaces the previous manual slideshow)
buildProjectCarousels();

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

  // Determine starting index using img dataset/index/id, falling back to src
  function getStartIndex(list, img) {
    // 1) Explicit data-index takes precedence
    const di = img.getAttribute("data-index");
    if (di !== null && di !== undefined && di !== "") {
      const n = parseInt(di, 10);
      if (!Number.isNaN(n) && list.length)
        return ((n % list.length) + list.length) % list.length;
    }
    // 2) If id ends with a number (e.g., image3), use that (1-based -> 0-based)
    if (img.id) {
      const m = img.id.match(/(\d+)\s*$/);
      if (m && list.length) {
        const n = parseInt(m[1], 10) - 1;
        if (!Number.isNaN(n))
          return ((n % list.length) + list.length) % list.length;
      }
    }
    // 3) If id matches a filename base in the list, use that
    if (img.id) {
      const target = img.id.toLowerCase();
      const idx = list.findIndex((u) => {
        const base = toPathname(u)
          .split("/")
          .pop()
          .replace(/\.[^.]+$/, "")
          .toLowerCase();
        return base === target;
      });
      if (idx !== -1) return idx;
    }
    // 4) Fallback to matching current src
    return findIndexBySrc(list, img.src || list[0]);
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
      const list = getGalleryList(img);
      const idx = getStartIndex(list, img);
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

  // Zoom & Pan inside overlay
  let zoom = 1;
  let panX = 0;
  let panY = 0;
  let dragging = false;
  let dragStartX = 0;
  let dragStartY = 0;
  let panStartX = 0;
  let panStartY = 0;

  function applyTransform() {
    if (!overlayImg) return;
    overlayImg.style.transformOrigin = "0 0";
    overlayImg.style.transform = `translate(${panX}px, ${panY}px) scale(${zoom})`;
    overlayImg.style.cursor =
      zoom > 1 ? (dragging ? "grabbing" : "grab") : "zoom-in";
  }

  function resetZoom() {
    zoom = 1;
    panX = 0;
    panY = 0;
    applyTransform();
  }

  // Adjust zoom keeping mouse position stable (approximate)
  function handleWheel(e) {
    if (!overlayImg) return;
    if (!e.ctrlKey) return; // only zoom when Ctrl + wheel
    e.preventDefault();
    const rect = overlayImg.getBoundingClientRect();
    const prevZoom = zoom;
    const delta = -e.deltaY * 0.0015; // sensitivity
    zoom = Math.min(4, Math.max(1, zoom + delta));
    if (zoom !== prevZoom) {
      const mx = e.clientX - rect.left;
      const my = e.clientY - rect.top;
      panX -= mx / prevZoom - mx / zoom;
      panY -= my / prevZoom - my / zoom;
      applyTransform();
    }
  }

  function handleMouseDown(e) {
    if (!overlayImg || zoom <= 1) return;
    dragging = true;
    dragStartX = e.clientX;
    dragStartY = e.clientY;
    panStartX = panX;
    panStartY = panY;
    applyTransform();
  }
  function handleMouseMove(e) {
    if (!dragging) return;
    panX = panStartX + (e.clientX - dragStartX);
    panY = panStartY + (e.clientY - dragStartY);
    applyTransform();
  }
  function handleMouseUp() {
    if (!dragging) return;
    dragging = false;
    applyTransform();
  }

  // Hook events when overlay opens
  const origOpenOverlay = openOverlay;
  openOverlay = function (list, startIndex) {
    origOpenOverlay(list, startIndex);
    // reset zoom state
    resetZoom();
    content.addEventListener("wheel", handleWheel, { passive: false });
    overlayImg.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);
  };

  // Cleanup when closing
  const origCloseOverlay = closeOverlay;
  closeOverlay = function () {
    content.removeEventListener("wheel", handleWheel);
    overlayImg && overlayImg.removeEventListener("mousedown", handleMouseDown);
    window.removeEventListener("mousemove", handleMouseMove);
    window.removeEventListener("mouseup", handleMouseUp);
    origCloseOverlay();
  };
})();
