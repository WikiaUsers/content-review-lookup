/* Any JavaScript here will be loaded for all users on every page load. */
mw.hook("wikipage.content").add(function () {
	$("span.import-css").each(function () {
		mw.util.addCSS($(this).attr("data-css"));
	});
});

$(document).ready(function() {
    // Initial API call to get users from a specific range
    var aufrom = 'A';  // starting username
    var auto = 'Z';    // ending username
    var initialApiUrl = `https://css-codes.fandom.com/api.php?action=query&list=allusers&aufrom=${aufrom}&auto=${auto}&aulimit=max&format=json`;

    function fetchUsers(apiUrl) {
        $.ajax({
            url: apiUrl,
            dataType: 'json',
            success: function(data) {
                if (data.query && data.query.allusers) {
                    var users = data.query.allusers;
                    console.log('Users:', users.length);

                    users.forEach(function(user) {
                        // Display user information
                        console.log('Username:', user.name);
                        console.log('User ID:', user.userid);
                        console.log('Central ID:', user.centralid);
                        console.log('Attached Wiki:', user.attachedwiki);

                        // Make a subsequent API call for each user
                        var userApiUrl = `https://css-codes.fandom.com/api.php?action=query&list=allusers&aufrom=${user.name}&auto=${user.name}&aulimit=max&format=json&auprop=centralid|attachedwiki`;

                        $.ajax({
                            url: userApiUrl,
                            dataType: 'json',
                            success: function(userData) {
                                // Handle the response for the individual user API call
                                if (userData.query && userData.query.allusers) {
                                    var userInfo = userData.query.allusers[0]; // Assuming one user is returned
                                    console.log('User Info:', userInfo);
                                    // Further processing if needed
                                } else {
                                    console.log('No user data found for', user.name);
                                }
                            },
                            error: function(error) {
                                console.error('Error fetching user data for', user.name, ':', error);
                            }
                        });
                    });

                    // Check if there is a next page of users to fetch
                    if (data['query-continue'] && data['query-continue'].allusers && data['query-continue'].allusers.aufrom) {
                        fetchUsers(apiUrl + '&aufrom=' + data['query-continue'].allusers.aufrom);
                    }
                } else {
                    console.log('No users found or error in response.');
                }
            },
            error: function(error) {
                console.error('Error fetching users:', error);
            }
        });
    }

    // Call the fetchUsers function initially with the initialApiUrl
    fetchUsers(initialApiUrl);
});