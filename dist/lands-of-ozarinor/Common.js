// create the button element
var backToTopBtn = document.createElement("button");
backToTopBtn.innerHTML = "Back to Top";
backToTopBtn.setAttribute("id", "back-to-top-btn");
document.body.appendChild(backToTopBtn);

// show/hide the button on scroll
window.addEventListener("scroll", function() {
  if (window.pageYOffset > 0) {
    backToTopBtn.style.display = "block";
  } else {
    backToTopBtn.style.display = "none";
  }
});

// scroll to top on button click
backToTopBtn.addEventListener("click", function() {
  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });
});






var quotes = [
  "Do or do not, there is no try. - Yoda",
  "I'll be back. - Terminator",
  "May the Force be with you. - Star Wars",
  "Elementary, my dear Watson. - Sherlock Holmes",
  "It's not who I am underneath, but what I do that defines me. - Batman",
  "You shall not pass! - Gandalf",
  "To infinity and beyond! - Buzz Lightyear",
  "Live long and prosper. - Spock",
  "I'm the king of the world! - Titanic",
  "Here's Johnny! - The Shining"
];

var quoteIndex = Math.floor(Math.random() * quotes.length);
var quote = quotes[quoteIndex];

var quoteElement = document.createElement("div");
quoteElement.innerHTML = "<p>" + quote + "</p>";
document.body.prepend(quoteElement);

var chatbotContainer = document.createElement("div");
chatbotContainer.setAttribute("id", "chatbot-container");
document.body.appendChild(chatbotContainer);

var chatbotEmbedCode = "<script src=";https://chatthing.ai/chat-widget.js" type="text/javascript" id="5b7d39ec-d50b-450f-8421-bf6235bcf751" async defer></script>";
document.getElementById("chatbot-container").innerHTML = chatbotEmbedCode;


function rollDice(dice) {
  var result = 0;
  for (var i = 0; i < dice; i++) {
    result += Math.floor(Math.random() * 6) + 1;
  }
  return result;
}

// Example usage:
var diceRoll = rollDice(3); // rolls three six-sided dice
console.log(diceRoll); // prints the result to the console

/* Popups */
importArticles({
    type: 'script',
    articles: [
        'u:dev:MediaWiki:Popups/code.js'
    ]
});


/* LinkPreview */
importArticles({
    type: 'script',
    articles: [
        'u:dev:MediaWiki:LinkPreview/code.js'
    ]
});

/* Custom Back to Top Button */
$(function() {
    $('<div>', {
        id: 'customBackToTopButton',
        style: 'display:none;',
        click: function() {
            $('html, body').animate({ scrollTop: 0 }, 500);
        }
    }).appendTo(document.body);
    $(window).scroll(function() {
        if ($(this).scrollTop() > 500) {
            $('#customBackToTopButton').fadeIn();
        } else {
            $('#customBackToTopButton').fadeOut();
        }
    });
});