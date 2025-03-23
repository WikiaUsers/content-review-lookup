/* Any JavaScript here will be loaded for all users on every page load. */
importArticles({
    type: 'script',
    articles: [
        'u:dev:RevealAnonIP/code.js',
        // 'u:dev:MessageWallUserTags/code.js', /* Please read http://dev.wikia.com/wiki/MessageWallUserTags before re-enabling. This script needs default values to be set for it to work properly.
        'u:dev:DynamicImages/code.js',
        'u:dev:DupImageList/code.js',
        'u:dev:AjaxRC/code.js',
        'u:dev:MessageBlock/code.js',
        'u:dev:FixMultipleUpload/code.js',
        'u:dev:ListAdmins/code.js',
        'u:dev:UserTags/code.js'          // User Rights Tags
    ]
});

/* Lizard Quiz */
var quizName = "Lizard Quiz";
var quizLang = "en";
var resultsTextArray = [
    "You Should Read More!",
    "Not Bad, You Know a Lot About Lizard-Planets Stuff.",
    "WOW! You're a Lizard-Planets Expert!"
];

var questions = [
    ["What is the Home Planet of the Lizards?",
        "Lizard-967-X7-Kokushibo",
        "Lizard-953-E",  // ✅ Correct Answer
        "Lizard-959",
        "Lizard-597"
    ],

    ["What are the Allies of the Lizards?",
        "Thrilxots, Shapeshifters, Kerbals, Humans, or Na'vi", // ✅ Correct Answer
        "Thrilxots, People (not humans), Na'vi, Kerbals",  
        "Thrilxots, The Humpties, People (not humans), Kerbals, Shapeshifters"
    ],

    ["What planet has a Mosquito infestation?",
        "Nezaif 9",  // ✅ Correct Answer
        "Lizard-953-E",
        "Mimmio",
        "Lizard-953-I"
    ],

    ["What planet has frequent power outages?",
        "Lizard-953-E",  
        "Lizard-597", // ✅ Correct Answer
        "Nezaif 9", 
        "None of the above"
    ],

    ["What are the Lizards' enemies?",
        "People (not humans), The Humpties",  // ✅ Correct Answer
        "Kerbals, Serial Designation Y",
        "Serial Designation O, Serial Designation T",
        "None of the above"
    ],

    ["What Lizard Drone is the most sadistic?",
        "Serial Designation T",
        "Serial Designation Y",
        "Serial Designation O",  // ✅ Correct Answer
        "Serial Designation K"
    ]
];

/* Correct Answers (Indexed to Match Questions) */
var correctAnswers = [
    "Lizard-953-E",
    "Thrilxots, Shapeshifters, Kerbals, Humans, or Na'vi",
    "Nezaif 9",
    "Lizard-597",
    "People (not humans), The Humpties",
    "Serial Designation O"
];

/* User Score */
var userScore = 0;

/* Function to Render Quiz */
function displayQuiz() {
    var quizContainer = $('<div/>').attr('id', 'lizard-quiz').append(
        $('<h2/>').text(quizName)
    );

    questions.forEach(function(q, index) {
        var questionBlock = $('<div/>').append(
            $('<p/>').html("<strong>Q" + (index + 1) + ": " + q[0] + "</strong>")
        );

        /* Correcting the closure issue by wrapping the event in a separate function */
        function createAnswerButton(answerText, questionIndex) {
            return $('<button/>')
                .text(answerText)
                .on('click', function() {
                    if (answerText === correctAnswers[questionIndex]) {
                        userScore++;
                    }
                    $(this).parent().find('button').attr('disabled', true); // Disable buttons after selection
                });
        }

        for (var i = 1; i < q.length; i++) {
            questionBlock.append(createAnswerButton(q[i], index));
        }

        quizContainer.append(questionBlock);
    });

    /* Submit Button */
    var submitButton = $('<button/>')
        .text("Submit Quiz")
        .on('click', function() {
            showResults();
        });

    quizContainer.append(submitButton);

    $('body').append(quizContainer);
}

/* Function to Show Results */
function showResults() {
    var resultText = "";

    if (userScore <= 2) {
        resultText = resultsTextArray[0]; // Low score
    } else if (userScore <= 4) {
        resultText = resultsTextArray[1]; // Medium score
    } else {
        resultText = resultsTextArray[2]; // High score
    }

    alert("Your Score: " + userScore + "/" + questions.length + "\n" + resultText);
}

/* Run the quiz after the page loads */
$(document).ready(displayQuiz);

InactiveUsers = { gone: ['Umbreon_The_Serial_Killer'] };

mw.loader.using('mediawiki.api').then(function () {
    new mw.Api().get({
        action: "query",
        list: "recentchanges",
        rcnamespace: 0, // Limits to main articles only (namespace 0)
        rclimit: 1, // Get only the latest article
        rcprop: "title"
    }).done(function (data) {
        if (data.query && data.query.recentchanges.length > 0) {
            var latestPage = data.query.recentchanges[0].title;
            var latestPageUrl = mw.util.getUrl(latestPage);

            // Append the link below the logo
            $('.fandom-community-header__image').append(
                $('<a/>')
                    .addClass('hover-community-header-wrapper')
                    .attr('href', latestPageUrl)
                    .append($('<div/>')
                        .addClass('message')
                        .text('Click here to view the newest page!')
                    )
            );
        }
    });
});