'use strict';

/* ===============================
   HELPERS
================================ */
const $  = selector => document.querySelector(selector);
const $$ = selector => document.querySelectorAll(selector);
const toggle = el => el && el.classList.toggle("active");

/* ===============================
   SIDEBAR (MOBILE)
================================ */
const sidebar = $("[data-sidebar]");
const sidebarBtn = $("[data-sidebar-btn]");

sidebarBtn?.addEventListener("click", () => {
  toggle(sidebar);

  const label = sidebarBtn.querySelector("span");
  if (label) {
    label.textContent = sidebar.classList.contains("active")
      ? "Hide Contacts"
      : "Show Contacts";
  }
});

/* ===============================
   TESTIMONIALS MODAL
================================ */
const tModal = $("[data-modal-container]");
const tOverlay = $("[data-overlay]");
const tClose = $("[data-modal-close-btn]");
const tImg = $("[data-modal-img]");
const tTitle = $("[data-modal-title]");
const tText = $("[data-modal-text]");

const toggleTestimonialsModal = () => {
  toggle(tModal);
  toggle(tOverlay);
};

$$("[data-testimonials-item]").forEach(item => {
  item.addEventListener("click", () => {
    tImg.src = item.querySelector("[data-testimonials-avatar]").src;
    tImg.alt = item.querySelector("[data-testimonials-avatar]").alt;
    tTitle.textContent =
      item.querySelector("[data-testimonials-title]").textContent;
    tText.innerHTML =
      item.querySelector("[data-testimonials-text]").innerHTML;

    toggleTestimonialsModal();
  });
});

tClose?.addEventListener("click", toggleTestimonialsModal);
tOverlay?.addEventListener("click", toggleTestimonialsModal);

/* ===============================
   PAGE NAVIGATION (FIXED)
================================ */
const navLinks = document.querySelectorAll("[data-nav-link]");
const pages = document.querySelectorAll("[data-page]");

navLinks.forEach(link => {
  link.addEventListener("click", () => {
    const targetPage = link.textContent.trim().toLowerCase();

    pages.forEach(page => {
      page.classList.remove("active");
      if (page.dataset.page === targetPage) {
        page.classList.add("active");
      }
    });

    navLinks.forEach(l => l.classList.remove("active"));
    link.classList.add("active");

    window.scrollTo(0, 0);
  });
});

/* ===============================
   PORTFOLIO FILTER
================================ */
const filterBtns = document.querySelectorAll("[data-filter-btn]");
const select = document.querySelector("[data-select]");
const selectItems = document.querySelectorAll("[data-select-item]");
const selectValue = document.querySelector("[data-selecct-value]");
const filterItems = document.querySelectorAll("[data-filter-item]");

// Toggle dropdown
select.addEventListener("click", function () {
  elementToggleFunc(this);
});

// Core filter function
function filterFunc(selectedValue) {
  selectedValue = selectedValue.toLowerCase();

  filterItems.forEach(item => {
    const category = item.dataset.category.toLowerCase();

    if (selectedValue === "all") {
      item.classList.add("active");
    } else if (selectedValue === category) {
      item.classList.add("active");
    } else {
      item.classList.remove("active");
    }
  });
}

// Dropdown filter
selectItems.forEach(item => {
  item.addEventListener("click", function () {
    const value = this.innerText.trim();
    selectValue.innerText = value;
    elementToggleFunc(select);
    filterFunc(value);
  });
});

// Button filter (desktop)
let lastClickedBtn = filterBtns[0];

filterBtns.forEach(btn => {
  btn.addEventListener("click", function () {
    const value = this.innerText.trim();
    selectValue.innerText = value;

    filterFunc(value);

    lastClickedBtn.classList.remove("active");
    this.classList.add("active");
    lastClickedBtn = this;
  });
});





/* ===============================
   PROJECT IMAGE MODAL
================================ */
const projectModal = $("#projectModal");
const projectModalImg = $("#projectModalImg");
const projectModalClose = $(".project-modal-close");

$$(".project-item-icon-box").forEach(icon => {
  icon.addEventListener("click", e => {
    e.preventDefault();

    const img = icon.closest(".project-img")?.querySelector("img");
    if (!img) return;

    projectModalImg.src = img.src;
    projectModal.classList.add("active");
  });
});

projectModalClose?.addEventListener("click", () =>
  projectModal.classList.remove("active")
);

projectModal?.addEventListener("click", e => {
  if (e.target === projectModal) {
    projectModal.classList.remove("active");
  }
});

/* ===============================
   BLOG POSTS (OPTIONAL LOOP)
   Requires: <ul id="blogList">
================================ */
const blogList = $("#blogList");

const blogPosts = [
  {
    type: "video",
    src: "./assets/images2/VID20251112064627.mp4",
    category: "Video",
    date: "2025-01-12",
    title: "Educational Tour Video",
    text: "Highlights from our educational tour captured on video."
  }
];

if (blogList) {
  blogPosts.forEach(post => {
    blogList.insertAdjacentHTML("beforeend", `
      <li class="blog-post-item">
        <figure class="blog-banner-box">
          ${
            post.type === "video"
              ? `<video class="blog-video" controls muted preload="metadata">
                   <source src="${post.src}" type="video/mp4">
                 </video>`
              : `<img src="${post.src}" loading="lazy">`
          }
        </figure>

        <div class="blog-content">
          <div class="blog-meta">
            <p class="blog-category">${post.category}</p>
            <span class="dot"></span>
            <time datetime="${post.date}">
              ${new Date(post.date).toDateString()}
            </time>
          </div>
          <h3 class="h3 blog-item-title">${post.title}</h3>
          <p class="blog-text">${post.text}</p>
        </div>
      </li>
    `);
  });
}


  /* ===============================
   PROJECT IMAGE MODAL (ICON CLICK)
================================ */



// Open modal when icon is clicked
document.querySelectorAll(".image-icon-btn").forEach(icon => {
  icon.addEventListener("click", e => {
    e.preventDefault();
    e.stopPropagation();

    const img = icon.closest(".project-img")?.querySelector("img");
    if (!img) return;

    projectModalImg.src = img.src;
    projectModal.classList.add("active");
  });
});

// Close button
projectModalClose.addEventListener("click", () => {
  projectModal.classList.remove("active");
});

// Click outside image to close
projectModal.addEventListener("click", e => {
  if (e.target === projectModal) {
    projectModal.classList.remove("active");
  }
});

// IMAGE PREVIEW MODAL
const modal = document.getElementById("imageModal");
const modalImg = document.getElementById("imageModalImg");
const closeBtn = document.querySelector(".image-modal-close");

document.querySelectorAll(".preview-btn").forEach(btn => {
  btn.addEventListener("click", (e) => {
    e.preventDefault();

    const img = btn.closest(".project-img").querySelector("img");
    if (!img) return;

    modal.style.display = "flex";
    modalImg.src = img.src;
  });
});

// Close modal
closeBtn.addEventListener("click", () => {
  modal.style.display = "none";
});

// Close when clicking background
modal.addEventListener("click", (e) => {
  if (e.target === modal) {
    modal.style.display = "none";
  }
});

document.addEventListener("DOMContentLoaded", () => {
  const modal = document.getElementById("imageModal");
  const modalImg = document.getElementById("imageModalImg");
  const closeBtn = document.querySelector(".image-modal-close");

  document.querySelectorAll(".preview-btn").forEach(btn => {
    btn.addEventListener("click", (e) => {
      e.preventDefault();
      e.stopPropagation();

      const img = btn.closest(".project-img")?.querySelector("img");
      if (!img) return;

      modalImg.src = img.src;
      modal.style.display = "flex";
    });
  });

  closeBtn.addEventListener("click", () => {
    modal.style.display = "none";
    modalImg.src = "";
  });

  modal.addEventListener("click", (e) => {
    if (e.target === modal) {
      modal.style.display = "none";
      modalImg.src = "";
    }
  });
});

// ===============================
// ICON BUTTON → IMAGE CONTAINER
// ===============================

document.addEventListener("DOMContentLoaded", () => {

  const container = document.getElementById("infoContainer");
  if (!container) return;

  const overlay = container.querySelector(".info-overlay");
  const closeBtn = container.querySelector(".info-close-btn");
  const imageEl = document.getElementById("infoImage");
  const titleEl = document.getElementById("infoTitle");

  document.querySelectorAll(".open-info-btn").forEach(btn => {
    btn.addEventListener("click", e => {
      e.preventDefault();
      e.stopPropagation();

      const image = btn.dataset.image;
      const title = btn.dataset.title;

      if (!image) return;

      imageEl.src = image;
      imageEl.alt = title || "";
      titleEl.textContent = title || "";

      container.classList.add("active");
      document.body.style.overflow = "hidden";
    });
  });

  function closeContainer() {
    container.classList.remove("active");
    imageEl.src = "";
    document.body.style.overflow = "";
  }

  closeBtn.addEventListener("click", closeContainer);
  overlay.addEventListener("click", closeContainer);

  document.addEventListener("keydown", e => {
    if (e.key === "Escape" && container.classList.contains("active")) {
      closeContainer();
    }
  });

});


