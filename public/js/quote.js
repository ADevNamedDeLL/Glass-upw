let quotes = [];
let currentQuote = 0;

async function loadQuotes() {
  try {
    const res = await fetch('assets/quotes.json');
    quotes = await res.json();
    showQuote();
    setInterval(nextQuote, 6000); // Auto cycle every 6 seconds
  } catch (error) {
    console.error("Failed to load quotes:", error);
  }
}

function showQuote() {
  const quoteEl = document.getElementById("quote-text");
  const authorEl = document.getElementById("quote-author");
  const block = document.getElementById("testimonial-block");

  block.classList.add("fade-out");

  setTimeout(() => {
    const quote = quotes[currentQuote];
    quoteEl.textContent = `"${quote.quote}"`;
    authorEl.textContent = `— ${quote.author}`;

    block.classList.remove("fade-out");
    block.classList.add("fade-in");

    setTimeout(() => {
      block.classList.remove("fade-in");
    }, 600);
  }, 500);
}

function nextQuote() {
  currentQuote = (currentQuote + 1) % quotes.length;
  showQuote();
}

document.addEventListener("DOMContentLoaded", loadQuotes);
