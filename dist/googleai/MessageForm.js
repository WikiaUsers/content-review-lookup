// Wrap in an IIFE to avoid polluting global scope
(function() {
    // Function to create the pop-up form
    function createMessageForm() {
        // Create form elements
        var form = document.createElement("div");
        form.classList.add("message-form");
        form.innerHTML = `
            <div class="form-container">
                <h3>Send a Message</h3>
                <label>Title: <input type="text" id="messageTitle" /></label><br>
                <label>Body: <textarea id="messageBody"></textarea></label><br>
                <button id="submitMessage">Send Message</button>
                <button id="closeForm">Cancel</button>
            </div>
        `;
        
        // Append form to the body and make it visible
        document.body.appendChild(form);
        
        // Event listeners for form actions
        document.getElementById("closeForm").addEventListener("click", function() {
            form.remove();
        });
        
        document.getElementById("submitMessage").addEventListener("click", function() {
            sendMessageToUsers();
            form.remove();
        });
    }
    
    // Function to handle sending the message via Fandom API
    async function sendMessageToUsers() {
        // Get user input
        var title = document.getElementById("messageTitle").value;
        var body = document.getElementById("messageBody").value;
        var recipients = ["Moonwatcher x Qibli", "DigitalKandra"];
        
        // Loop through each recipient
        for (let username of recipients) {
            try {
                await fetch("/wikia.php?controller=MessageWall&method=postNewMessage", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        "Accept": "application/json",
                        "X-Wikia-Api-Token": mw.user.tokens.get("csrfToken") // CSRF token
                    },
                    body: JSON.stringify({
                        title: title,
                        body: body,
                        userId: mw.config.get("wgUserId"),  // sender's user ID
                        recipientUserName: username  // target user
                    })
                });
                console.log("Message sent to " + username);
            } catch (error) {
                console.error("Failed to send message to " + username, error);
            }
        }
    }
    
    // Add click event listener to all links with the MessageForm class
    document.addEventListener("click", function(e) {
        if (e.target.classList.contains("MessageForm")) {
            e.preventDefault();
            createMessageForm();
        }
    });
})();