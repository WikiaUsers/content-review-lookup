/* Any JavaScript here will be loaded for all users on every page load. */
//Sandbox wipe test (every 10 seconds. If works we'll make it every sat
function editProjectSandbox() {
  // MediaWiki API endpoint to edit a page
  var url = 'https://api-personal-testing.fandom.com/api.php?action=edit&format=json';

  // Page title (Project:Sandbox) and content to be set as blank
  var params = {
    title: 'Project:Sandbox',
    text: '',
    summary: 'Blanking Project:Sandbox for a fresh start'
  };

  // Send POST request using fetch API
  fetch(url, {
    method: 'POST',
    body: JSON.stringify(params)
  })
  .then(function(response) {
    return response.json();
  })
  .then(function(data) {
    if (data.error) {
      console.error('API error:', data.error);
    } else {
      console.log('Project:Sandbox blanked successfully!');
    }
  })
  .catch(function(error) {
    console.error('Error:', error);
  });
}

// Call the function to edit every 10 seconds
setInterval(editProjectSandbox, 10000); // 10000 milliseconds = 10 seconds