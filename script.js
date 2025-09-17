const dropdownBtn = document.querySelectorAll(".dropdown-btn");
const dropdown = document.querySelectorAll(".dropdown");
const hamburgerBtn = document.getElementById("hamburger");
const navMenu = document.querySelector(".menu");
const links = document.querySelectorAll(".dropdown a");

function setAriaExpandedFalse() {
  dropdownBtn.forEach((btn) => btn.setAttribute("aria-expanded", "false"));
}

function closeDropdownMenu() {
  dropdown.forEach((drop) => {
    drop.classList.remove("active");
    drop.addEventListener("click", (e) => e.stopPropagation());
  });
}

function toggleHamburger() {
  navMenu.classList.toggle("show");
}

dropdownBtn.forEach((btn) => {
  btn.addEventListener("click", function (e) {
    const dropdownIndex = e.currentTarget.dataset.dropdown;
    const dropdownElement = document.getElementById(dropdownIndex);

    dropdownElement.classList.toggle("active");
    dropdown.forEach((drop) => {
      if (drop.id !== btn.dataset["dropdown"]) {
        drop.classList.remove("active");
      }
    });
    e.stopPropagation();
    btn.setAttribute(
      "aria-expanded",
      btn.getAttribute("aria-expanded") === "false" ? "true" : "false"
    );
  });
});

// close dropdown menu when the dropdown links are clicked
links.forEach((link) =>
  link.addEventListener("click", () => {
    closeDropdownMenu();
    setAriaExpandedFalse();
    toggleHamburger();
  })
);

// close dropdown menu when you click on the document body
document.documentElement.addEventListener("click", () => {
  closeDropdownMenu();
  setAriaExpandedFalse();
});

// close dropdown when the escape key is pressed
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") {
    closeDropdownMenu();
    setAriaExpandedFalse();
  }
});

// toggle hamburger menu
hamburgerBtn.addEventListener("click", toggleHamburger);


// === CAROUSEL SCRIPT STARTS HERE ===
const track = document.querySelector(".carousel-track");
const slides = Array.from(track?.children || []);
const nextButton = document.querySelector(".carousel-btn.next");
const prevButton = document.querySelector(".carousel-btn.prev");

let currentIndex = 0;

function updateCarousel() {
  if (slides.length === 0) return;
  const slideWidth = slides[0].getBoundingClientRect().width;
  track.style.transform = `translateX(-${currentIndex * slideWidth}px)`;
}

if (nextButton && prevButton && track) {
  nextButton.addEventListener("click", () => {
    currentIndex = (currentIndex + 1) % slides.length;
    updateCarousel();
  });

  prevButton.addEventListener("click", () => {
    currentIndex = (currentIndex - 1 + slides.length) % slides.length;
    updateCarousel();
  });

  window.addEventListener("resize", updateCarousel);
  updateCarousel(); // initialize position
}


// // card -1 (only one services)
// const cardData = [
//   {
//     title: "Card 1",
//     text: "This is the first card's description.",
//     image: "https://randomuser.me/api/portraits/men/1.jpg",
//     link: "#"
//   },
//   {
//     title: "Card 2",
//     text: "This is the second card's description.",
//     image: "https://randomuser.me/api/portraits/women/2.jpg",
//     link: "#"
//   },
//   {
//     title: "Card 3",
//     text: "This is the third card's description.",
//     image: "https://randomuser.me/api/portraits/men/3.jpg",
//     link: "#"
//   },
//   {
//     title: "Card 4",
//     text: "This is the fourth card's description.",
//     image: "https://randomuser.me/api/portraits/women/4.jpg",
//     link: "#"
//   },
//   {
//     title: "Card 5",
//     text: "This is the fifth card's description.",
//     image: "https://randomuser.me/api/portraits/men/5.jpg",
//     link: "#"
//   },
//     {
//     title: "Card 6",
//     text: "This is the sixth card's description.",
//     image: "https://randomuser.me/api/portraits/men/5.jpg",
//     link: "#"
//   },
//     {
//     title: "Card 7",
//     text: "This is the seventh card's description.",
//     image: "https://randomuser.me/api/portraits/men/5.jpg",
//     link: "#"
//   },
//     {
//     title: "Card 8",
//     text: "This is the eigth card's description.",
//     image: "https://randomuser.me/api/portraits/men/5.jpg",
//     link: "#"
//   },
//     {
//     title: "Card 9",
//     text: "This is the ninth card's description.",
//     image: "https://randomuser.me/api/portraits/men/5.jpg",
//     link: "#"
//   },
//     {
//     title: "Card 10",
//     text: "This is the tenth card's description.",
//     image: "https://randomuser.me/api/portraits/men/5.jpg",
//     link: "#"
//   }
// ];

// const cardDeck = document.getElementById("cardDeck");

// cardData.forEach(card => {
//   const cardHTML = `
//     <a href="${card.link}" class="card">
//       <img src="${card.image}" class="card-img-top" alt="${card.title}" />
//       <div class="card-body">
//         <h5 class="card-title">${card.title}</h5>
//         <p class="card-text">${card.text}</p>
//       </div>
//     </a>
//   `;
//   cardDeck.insertAdjacentHTML("beforeend", cardHTML);
// });


// const cardData1 = cardData.slice(0, 5); // first 5 cards
// const cardData2 = cardData.slice(5);    // remaining cards

// function renderCards(cardDeckId, cards) {
//   const cardDeck = document.getElementById(cardDeckId);
//   cards.forEach(card => {
//     const cardHTML = `
//       <a href="${card.link}" class="card">
//         <img src="${card.image}" class="card-img-top" alt="${card.title}" />
//         <div class="card-body">
//           <h5 class="card-title">${card.title}</h5>
//           <p class="card-text">${card.text}</p>
//         </div>
//       </a>
//     `;
//     cardDeck.insertAdjacentHTML("beforeend", cardHTML);
//   });
// }

// renderCards("cardDeck1", cardData1);
// renderCards("cardDeck2", cardData2);

// card -2 (servides and calculator)
const cardData = [
  { title: "Kundali Analysis", text: "Detailed life chart reveals career, health, relationship, and financial outlook based on your birth details", image: "assets/images/kundali.png", link: "#", clickable: false },

  { title: "Vastu Shastra", text: "Vastu Shastra guidance enhances harmony, health, success, and prosperity through balanced architectural and spatial alignment", image: "assets/images/vastushastra.jpg", link: "#", clickable: false },

  { title: "Manglik Dosh Nivaran", text: "Manglik Dosh analysis reveals its impact on marriage, remedies for harmony, and relationship compatibility insights", image: "assets/images/mangal.jpg", link: "#", clickable: false },

  { title: "Kaal Sarp Dosh", text: "Kaal Sarp Dosh analysis uncovers life obstacles, effects on destiny, and powerful remedies for relief", image: "assets/images/kaalsarpdosh.png", link: "#", clickable: false },

  { title: "Baby Name", text: "Unique baby name suggestions based on astrology, ensuring meaningful names aligned with birth stars and personality traits", image: "assets/images/babyname.webp", link: "#", clickable: false },

  { title: "Life Coach", text: "Life coach guidance empowers personal growth, clarity, confidence, and goal achievement through expert support and strategies", image: "assets/images/lifecoach.jpg", link: "#", clickable: false },

  { title: "Gemstone Recommendation", text: "Gemstone analysis recommends ideal stones based on astrology to enhance energy, success, health, and protection", image: "assets/images/gemstone.webp", link: "#", clickable: false },

  { title: "Lal Kitab Remedies", text: "Lal Kitab gemstone remedies suggest powerful stones to balance planets, remove obstacles, and attract prosperity", image: "assets/images/lalkitab.png", link: "#", clickable: false },

  { title: "Puja Paath", text: "Pooja Path services offer sacred rituals to remove negativity, attract blessings, and promote peace and prosperity", image: "assets/images/pujapath.webp", link: "#", clickable: false },

  { title: "Astrological Remedies", text: "Astrological and Tantrik remedies provide powerful solutions to overcome challenges, enhance positivity, and balance energies effectively", image: "assets/images/remedies.png", link: "#", clickable: false },
  
  { title: "mmm", text: "This is the first card's description.", image: "https://randomuser.me/api/portraits/men/1.jpg", link: "#" },

  // SECOND SECTIONS

  { title: "मेष / Aries", text: "This is the second card's description.", image: "assets/images/aries.svg", link: "aries.html" },

  { title: "वृषभ / Taurus", text: "This is the third card's description.", image: "assets/images/taurus.svg", link: "taurus.html" },
  
  { title: "मिथुन / Gemini", text: "This is the fourth card's description.", image: "assets/images/gemeni.svg", link: "gemini.html" },
  
  { title: "कर्क / Cancer ", text: "This is the fifth card's description.", image: "assets/images/cancer.svg", link: "cancer.html" },
  
  { title: "सिंह / Leo", text: "This is the sixth card's description.", image: "assets/images/leo.svg", link: "leo.html" },
  
  { title: "कन्या / Virgo", text: "This is the seventh card's description.", image: "assets/images/virgo.svg", link: "virgo.html" },
  
  { title: "तुला / Libra", text: "This is the eigth card's description.", image: "assets/images/libra.svg", link: "libra.html" },
  
  { title: "वृश्चिक / Scorpio", text: "This is the ninth card's description.", image: "assets/images/scorpio.svg", link: "scorpio.html" },
  
  { title: "धनु / Sagittarius", text: "This is the tenth card's description.", image: "assets/images/sagittarius.svg", link: "sagittarius.html" },
  
  { title: "मकर / Capricorn", text: "This is the tenth card's description.", image: "assets/images/capricorn.svg", link: "capricorn.html" },

  { title: "कुंभ / Aquarius", text: "This is the tenth card's description.", image: "assets/images/aquarius.svg", link: "aquarius.html" },

  { title: "मीन / Pisces", text: "This is the tenth card's description.", image: "assets/images/pisces.svg", link: "pisces.html" },


];

// Split into two arrays for the two card decks
const cardData1 = cardData.slice(0, 10);
const cardData2 = cardData.slice(11,23);

// Render function
function renderCards(cardDeckId, cards) {
  const cardDeck = document.getElementById(cardDeckId);
  cards.forEach(card => {
    const cardContent = `
      <img src="${card.image}" class="card-img-top" alt="${card.title}" />
      <div class="card-body">
        <h5 class="card-title">${card.title}</h5>
        <p class="card-text">${card.text}</p>
      </div>
    `;

    const cardHTML = card.clickable !== false
      ? `<a href="${card.link}" class="card">${cardContent}</a>`
      : `<div class="card card--disabled">${cardContent}</div>`;

    cardDeck.insertAdjacentHTML("beforeend", cardHTML);
  });
}

document.addEventListener("DOMContentLoaded", function() {
  const cards = document.querySelectorAll('.card');
  
  // Adding highlighted class to all cards (or you can add to specific cards)
  cards.forEach(card => {
    card.classList.add('card--highlighted');
  });
});
// Call render for both decks
renderCards("cardDeck1", cardData1);
renderCards("cardDeck2", cardData2);


