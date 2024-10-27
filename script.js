const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const authorText = document.getElementById('author');
const xBtn = document.getElementById('x-button');
const newQuoteBtn = document.getElementById('new-quote');
const loader = document.getElementById('loader');


let apiQuotes = [];

// Show loading
function loading() {
  loader.hidden = false;
  quoteContainer.hidden = true;
}

// hide loading
function complete() {
  quoteContainer.hidden = false;
  loader.hidden = true;
}

// Show new quote
function newQuote() {
  loading();
  // Pick a random quote from apiquotes array
  const quote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)];
 
  authorText.textContent = quote.author ?? "Unknown";

  // Check quote length to determine styling
  if (quote.text.length > 120) {
    quoteText.classList.add('long-quote');
  } else {
    quoteText.classList.remove('long-quote');
  }

  //Set quote, hide loader
  quoteText.textContent = quote.text?.trim() ? quote.text : "Emptiness Explained";
  complete(); 

}

// Get quote from API
async function getQuotes() {
  loading();

  // pick a random quote from apiQuotes
  const apiUrl = "https://jacintodesign.github.io/quotes-api/data/quotes.json";

  try {
    const response = await fetch(apiUrl);
    apiQuotes = await response.json();
    newQuote();
  } catch (error) {
    // Catch Error Here
  }
}

// Post on X
function postOnX() {
  const xUrl = `https://x.com/intent/post?text=${quoteText.textContent} - ${authorText.textContent}`;
  window.open(xUrl, '_blank');
}

// Event listeners
newQuoteBtn.addEventListener('click', newQuote);
xBtn.addEventListener('click', postOnX);

// on load
getQuotes();


// The next video will use an API that may no longer work depending on when you are watching the video, specifically: https://type.fit/api/quotes

// I have instead created my own version of a Quotes API that contains over 8,000 quotes! It is hosted on GitHub and will be hosted in my own repository to avoid any issues in the future. You can find it here:

// https://jacintodesign.github.io/quotes-api/data/quotes.json

// You will only need to change part of one line of the code from what you will see in the video, and that is your apiUrl variable.