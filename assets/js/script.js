console.log(window.innerWidth);

const hero = document.querySelector(".hero-section");
const slides = document.querySelectorAll(".hero-slide");
const leftArrows = document.querySelectorAll(".hero-left-arr");
const rightArrows = document.querySelectorAll(".hero-right-arr");
const trendingSlides = document.querySelector(".trending-slide");
const trendingLeft = document.querySelector(".trending-left-arr");
const trendingRight = document.querySelector(".trending-right-arr");
const pause = document.querySelector(".pause-icon");
const questions = document.querySelectorAll(".question");
const answers = document.querySelectorAll(".answer");
const lines = {
  line1: document.querySelector(".line-1-ani"),
  line2: document.querySelector(".line-2-ani"),
  line3: document.querySelector(".line-3-ani"),
};
let currentSlide = 0;
let isPaused = false;
let progress = 0;
const autoPlayDuration = 8000;
const progressUpdateRate = 50;
const steps = autoPlayDuration / progressUpdateRate;
let progressInterval = null;
function resetLines() {
  Object.values(lines).forEach((line) => {
    line.style.width = "0%";
  });
}
function animateProgress() {
  if (isPaused) {
    return;
  }
  let currentLine = lines[`line${currentSlide + 1}`];
  let progress = 0;
  if (progressInterval) clearInterval(progressInterval);
  progressInterval = setInterval(() => {
    if (isPaused) {
      currentLine.style.backgroundColor = "#fff";
      currentLine.style.width = "100%";
      clearInterval(progressInterval);
      return;
    }
    progress++;
    currentLine.style.width = `${(progress / steps) * 100}%`;
    if (progress >= steps) {
      clearInterval(progressInterval);
      currentSlide = (currentSlide + 1) % slides.length;
      showSlide(currentSlide);
      animateProgress();
    }
  }, progressUpdateRate);
}
function showSlide(index) {
  slides.forEach((slide) => {
    slide.style.transform = `translateX(-${index * 100}%)`;
    hero.style.filter = `blur(20px)`;
  });
  setTimeout(() => {
    hero.style.filter = `none`;
  }, 150);
  resetLines();
  if (!isPaused) {
    animateProgress();
  } else {
    const currentLine = lines[`line${index + 1}`];
    currentLine.style.backgroundColor = "#fff";
    currentLine.style.width = "100%";
  }
}
rightArrows.forEach((arrow) =>
  arrow.addEventListener("click", () => {
    currentSlide = (currentSlide + 1) % slides.length;
    isPaused = true;
    pause.setAttribute("name", "play");
    showSlide(currentSlide);
    clearInterval(progressInterval);
  })
);
leftArrows.forEach((arrow) =>
  arrow.addEventListener("click", () => {
    currentSlide = (currentSlide - 1) % slides.length;
    isPaused = true;
    pause.setAttribute("name", "play");
    showSlide(currentSlide);
    clearInterval(progressInterval);
  })
);
pause.addEventListener("click", () => {
  isPaused = !isPaused;
  pause.setAttribute("name", isPaused ? "play" : "pause");
  if (!isPaused) {
    animateProgress();
  }
});
showSlide(currentSlide);
animateProgress();
trendingRight.addEventListener("click", () => {
  if (window.innerWidth >= 1280 && window.innerWidth < 1920) {
    trendingSlides.style.transform = `translateX(-${41}%)`;
  } else {
    trendingSlides.style.transform = `translateX(-${37}%)`;
  }
  trendingLeft.classList.remove("hidden");
  trendingRight.classList.add("hidden");
});
trendingLeft.addEventListener("click", () => {
  trendingSlides.style.transform = `translateX(${0}%)`;
  trendingLeft.classList.add("hidden");
  trendingRight.classList.remove("hidden");
});
questions.forEach((question, index) => {
  question.addEventListener("click", () => {
    const selectedAnswer = document.querySelector(`.ans${index + 1}`);
    const selectedIcon = document.querySelector(`.faq-plus-${index + 1}`);
    const isHidden = selectedAnswer.classList.contains("hidden");
    answers.forEach((ans) => ans.classList.add("hidden"));
    document
      .querySelectorAll(".faq-plus")
      .forEach((icon) => icon.classList.remove("rotate-plus"));
    if (isHidden) {
      selectedAnswer.classList.remove("hidden");
      selectedIcon.classList.add("rotate-plus");
    } else {
      selectedAnswer.classList.add("hidden");
      selectedIcon.classList.remove("rotate-plus");
    }
  });
});
