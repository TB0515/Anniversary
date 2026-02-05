const ALBUM_LINK = "https://photos.app.goo.gl/MMy82nDWrPmX8XoF8";

let noClickCount = 0;
const funnyMessages = [
  "Nope? Really? 🥺",
  "Come on... please? 💔",
  "I worked so hard on this! 😢",
  "You're breaking my heart! 💔",
  "Just click yes! Pretty please? 🥹",
  "Fine, I'll just keep running away! 😤",
  "You can't catch me! 😜",
  "Still running... 🏃",
  "Okay, this is getting silly now 😂",
];

function runAway() {
  const noBtn = document.getElementById("noBtn");
  const wrapper = noBtn.parentElement;

  const wrapperRect = wrapper.getBoundingClientRect();
  const btnRect = noBtn.getBoundingClientRect();

  if (getComputedStyle(noBtn).position !== "absolute") {
    noBtn.style.position = "absolute";
    noBtn.style.left = "0px";
    noBtn.style.top = "0px";
  }

  const padding = 10; // Add some padding

  // Calculate maximum positions
  const maxX = wrapperRect.width - btnRect.width - padding;
  const maxY = wrapperRect.height - btnRect.height - padding;

  // Random position
  const randomX = Math.random() * maxX;
  const randomY = Math.random() * maxY;

  // Move the button
  noBtn.style.left = `${randomX}px`;
  noBtn.style.top = `${randomY}px`;

  // Change text occasionally
  if (noClickCount < funnyMessages.length) {
    noBtn.textContent = funnyMessages[noClickCount];
    noClickCount++;
  }

  // Make it smaller each time (harder to click!)
  if (noClickCount > 3) {
    const scale = Math.max(0.6, 1 - noClickCount * 0.08);
    noBtn.style.transform = `scale(${scale})`;
  }
}

function sayYes() {
  // Hide question, show celebration
  document.getElementById("question").classList.add("hidden");
  document.getElementById("celebration").classList.add("show");

  // Create confetti
  createConfetti();
}

function goToMemories() {
  // More confetti!
  createConfetti();

  // Go to album
  setTimeout(() => {
    window.open(ALBUM_LINK, "_blank");
  }, 500);
}

function createConfetti() {
  const colors = ["#f093fb", "#f5576c", "#4facfe", "#00f2fe", "#ffd700"];
  const emojis = ["❤️", "💕", "💖", "💗", "✨", "🎉", "⭐"];

  for (let i = 0; i < 60; i++) {
    setTimeout(() => {
      const confetti = document.createElement("div");
      const useEmoji = Math.random() > 0.5;

      if (useEmoji) {
        confetti.textContent =
          emojis[Math.floor(Math.random() * emojis.length)];
        confetti.style.fontSize = "20px";
      } else {
        confetti.style.width = "10px";
        confetti.style.height = "10px";
        confetti.style.background =
          colors[Math.floor(Math.random() * colors.length)];
      }

      confetti.style.position = "fixed";
      confetti.style.left = Math.random() * 100 + "vw";
      confetti.style.top = "-20px";
      confetti.style.pointerEvents = "none";
      confetti.style.zIndex = "1000";

      const animation = confetti.animate(
        [
          {
            transform: "translateY(0) rotate(0deg)",
            opacity: 1,
          },
          {
            transform: `translateY(${window.innerHeight + 50}px) rotate(${Math.random() * 720}deg)`,
            opacity: 0,
          },
        ],
        {
          duration: Math.random() * 2000 + 2000,
          easing: "cubic-bezier(0.25, 0.46, 0.45, 0.94)",
        },
      );

      document.body.appendChild(confetti);

      animation.onfinish = () => confetti.remove();
    }, i * 40);
  }
}
