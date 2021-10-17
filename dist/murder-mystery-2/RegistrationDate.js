/** 
 * @file	RegistrationDate.js
 * @author	Parkour2906
 * @desc	uses the MediaWiki API to retrieve registration date of a given user, and appends it into their masthead.
 * @status	Beta
*/
$(function() {
    'use strict';
    // Prevent double loading
    if (window.UserRegistration) {
        return;
    }
    
    window.UserRegistration = {
        // Function for using the MediaWiki API to return the registration date of a given user
        getRegistrationData: function getRegistrationData(username) {
        	// Initiates a HTTP request to return a Deferred object 
            return new mw.Api().get({
                action: "query",
                list: "users",
                usprop: "registration",
                ususers: username,
                format: "json"
            });
        },

        // Function for getting the username on a given profile page
        getUsername: function getUsername() {
            return mw.config.get("profileUserName");
        },

        // Function for checking to see if the profile exists in the DOM
        ifProfileExists: function ifProfileExists() {
        	// Use a MutationObserver to check if the profile exists in the document
            const observer = new MutationObserver(function() {
                return true;
            });
            observer.observe($("#profileApp"), {
                childList: true
            });
        },

        // Function for returning the date
        getUserRegistration: function getUserRegistration(data) {
        	// Stringify the JSON data
            const dataString = JSON.stringify(data);
            // Use RegEx to select the date
            const fullDate = dataString.match(/(?<="registration":").*.+?(?=")/gm);
            // Convert the substring to a Date object to format it
            const formattedFullDate = new Date(fullDate);
            // Convert the Date object to a string
            var substring = formattedFullDate.toString();
            // Slice the string to select only the relevant parts of the date
            substring = substring.slice(3, 15);
            // Return the formatted date 
            return substring.slice(0, 7) + "," + substring.slice(7);
        },

        // Function for intializing the script		
        init: function init() {
            const context = window.UserRegistration;
            if (this.ifProfileExists) {
                /* If username is invalid, end the script */ 
				if (context.getUsername() === '') {
					return;
				}
				context.getRegistrationData(context.getUsername()).then(function(data) {
					const date = context.getUserRegistration(data);
					$(".user-identity-stats").append("<li>Account Registered in " + date + "</li>");
				}).fail(function(code) {
                	console.log("An error occurred with the API request.");
                	return;
				});
            } else {
            	console.log("The profile was not found in the document.");
            }
        }
    };
    window.UserRegistration.init();
});