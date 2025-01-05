function openFeedbackForm() {
    document.getElementById('feedback-form').style.display = 'block';
}

function submitFeedback() {
    var feedbackText = document.getElementById('feedback-text').value;
    if (feedbackText === "") {
        alert("Please enter your feedback.");
        return;
    }

    var pageTitle = mw.config.get('wgPageName');
    var talkPage = 'Talk:' + pageTitle.replace(/_/g, ' ');

    // Send feedback to Discord
    fetch('https://discord.com/api/webhooks/1324571334629523547/YzeexHfoVaBCcmFa-r9uB68WSRJKEXSmO6cYsWa2_hZllqBLOO9cMCCMkv1IsFYQ_7Or', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            content: 'Feedback on ' + pageTitle + ': ' + feedbackText
        })
    });

    // Post feedback on the corresponding talk page
    var api = new mw.Api();
    api.postWithToken('csrf', {
        action: 'edit',
        title: talkPage,
        section: 'new',
        sectiontitle: 'Feedback received on ' + new Date().toLocaleString(),
        text: feedbackText,
        summary: 'New feedback received'
    }).done(function() {
        alert("Thank you for your feedback!");
    }).fail(function() {
        alert("Error posting feedback. Please try again.");
    });

    // Hide the feedback form again
    document.getElementById('feedback-form').style.display = 'none';
}

// This will place the feedback button next to the page title on mainspace pages
window.addEventListener('load', function() {
    var namespace = mw.config.get('wgNamespaceNumber');
    if (namespace === 0) { // Mainspace pages have namespace number 0
        var titleElement = document.querySelector('#firstHeading');
        if (titleElement) {
            var feedbackContainer = document.createElement('div');
            feedbackContainer.id = 'feedback-container';
            feedbackContainer.innerHTML = 
                '<button class="wds-button" style="background-color:blue;" onclick="openFeedbackForm()">Give Feedback</button>' +
                '<div id="feedback-form" style="display:none;">' +
                '<textarea id="feedback-text" rows="4" cols="50" placeholder="Enter your feedback here..."></textarea>' +
                '<button class="wds-button" onclick="submitFeedback()">Submit Feedback</button>' +
                '</div>';
            titleElement.appendChild(feedbackContainer);
        }
    }
});