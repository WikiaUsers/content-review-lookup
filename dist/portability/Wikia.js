window.formToDiscussions = [
    {
        id: 'mentoring',
        specialPage: 'MentoringRequests',
        specialPageTitle: 'Mentoring requests form',
        form: '<p>This form allows you to place a new mentoring request.</p>' +
              '<p>Enter wiki name</p>' +
              '<p>{{#input}}wikiname|Example Wiki{{/input}}</p>' + 
              '<p>Are you an admin on the wiki you are asking about?</p>' +
              '<p>{{#input}}admin{{/input}}</p>' + 
              '<p>Please link to the wiki (or the specific templates or pages you want help with) here:</p>' +
              '<p>{{#textarea}}wikis{{/textarea}}</p>' +
              '<p>Any other information (e.g. links, screenshots, or snippets):</p>' +
              '<p>{{#textarea}}otherinfo{{/textarea}}</p>' +
              '<p>In order to ensure you can implement and maintain a Mentoring solution, how would you classify your technical (in CSS, Templates, and Infoboxes) skill level (or those of whomever will be maintaining your Templates)?</p>' +
              '<p>{{#textarea}}skilllevel{{/textarea}}</p>' +
              '<p>{{#submit}}Submit{{/submit}}<br/>Clicking \'Submit\' will create a post on Discussions.</p>',
        discussionsCategory: '3144327597391890636',
        discussionsTitle: 'Mentoring: {{wikiname}}',
        discussionsContent: 'Username: {{username}}\n\n' + 
                            'Are you an admin on the wiki? {{admin}}\n\n' +
                            'Please link to the wiki here: {{wikis}}\n\n' +
                            'Any other information: {{otherinfo}}\n\n' +
                            'How would you classify your technical skill level? {{skilllevel}}',
        customMustache: {
        },
        submitCallback: function() {
            alert('Successfully posted');
        },
        submitFailCallback: function() {
            alert('Failed to submit');
        }
    }
];