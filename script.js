'use strict';

//Selecting elements
const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const authorText = document.getElementById('author');
const twitterBtn = document.getElementById('twitter');
const newQuoteBtn = document.getElementById('new-quote');
const loader = document.getElementById('loader');

let apiQuotes = [];

//Show Loading
function loading() {
  loader.hidden = false;
  quoteContainer.hidden = true;
}
//Loading Complete
function complete() {
  quoteContainer.hidden = false;
  loader.hidden = true;
}

//Show new quote
function newQuote() {
  loading();
  //Get random quote from apiQuotes array
  const quote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)];
  //Check if author field is blank and replace it with 'Unknown'
  if (!quote.author) {
    authorText.textContent = 'Anonymous';
  } else {
    authorText.textContent = quote.author;
  }
  //Check quote length for styling
  if (quote.text.length > 120) {
    quoteText.classList.add('long-quote');
  } else {
    quoteText.classList.remove('long-quote');
  }
  //Set quote - hide loader
  quoteText.textContent = quote.text;
  complete();
  // console.log(quote);
}

// Get quotes from API
async function getQuotes() {
  loading();
  const apiURL = 'https://jacintodesign.github.io/quotes-api/data/quotes.json'; // got from the course resources
  try {
    const response = await fetch(apiURL);
    apiQuotes = await response.json();
    newQuote();
    // console.log(apiQuotes[12]);
  } catch (error) {
    //Catch Error here
    // alert(error);
  }
}

//To tweet
function tweetCode() {
  const twitterURL = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${authorText.textContent}`;
  window.open(twitterURL, '_blank');
}

//event listeners
newQuoteBtn.addEventListener('click', newQuote);
twitterBtn.addEventListener('click', tweetCode);

//On load
getQuotes();
