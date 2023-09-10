// Define a function to perform the find and replace operation
function findAndReplace(searchPhrase, replacePhrase) {
  // Check user rights (content-moderator, admin, bureaucrat)
  if (userHasRequiredRights()) {
    // Use the MediaWiki API to get a list of all wiki articles
    getAllWikiArticles().then((articles) => {
      // Iterate through the articles and replace the search phrase
      articles.forEach((article) => {
        const content = article.content;
        const updatedContent = content.replace(new RegExp(searchPhrase, 'g'), replacePhrase);
        if (content !== updatedContent) {
          // Save the updated content using the MediaWiki API
          saveArticleContent(article.title, updatedContent);
        }
      });
    });
  } else {
    console.log('You do not have the required rights to perform this operation.');
  }
}

// Check if the user has content-moderator, admin, or bureaucrat rights
function userHasRequiredRights() {
  const userRights = mw.config.get('wgUserRights');
  return (
    userRights.includes('content-moderator') ||
    userRights.includes('sysop') || // Admin
    userRights.includes('bureaucrat')
  );
}

// Get a list of all wiki articles using the MediaWiki API
function getAllWikiArticles() {
  const apiUrl = mw.config.get('wgScriptPath') + '/api.php';
  const params = {
    action: 'query',
    list: 'allpages',
    apnamespace: 0, // Main namespace
    aplimit: 'max', // Get all pages
  };
  return new Promise((resolve, reject) => {
    $.ajax({
      url: apiUrl,
      data: params,
      dataType: 'json',
      success: (data) => {
        resolve(data.query.allpages);
      },
      error: (xhr, status, error) => {
        reject(error);
      },
    });
  });
}

// Save updated article content using the MediaWiki API
function saveArticleContent(title, content) {
  const apiUrl = mw.config.get('wgScriptPath') + '/api.php';
  const params = {
    action: 'edit',
    title: title,
    text: content,
    token: mw.user.tokens.get('csrfToken'),
  };
  $.post(apiUrl, params, (data) => {
    if (data.edit && data.edit.result === 'Success') {
      console.log(`Updated article: ${title}`);
    } else {
      console.error(`Failed to update article: ${title}`);
    }
  });
}

// Example usage:
findAndReplace('oldPhrase', 'newPhrase');