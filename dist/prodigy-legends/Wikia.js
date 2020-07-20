//RailWAM Config
window.railWAM = {
    logPage: "Project:WAM Log"
};

// Article Rating Config
window.ArticleRating = {
  title: 'Rate Article',
  values: [
      'Horrible',
      'Bad',
      'Average',
      'Good',
      'Great'
  ],
  starSize: [24, 24],
  starColor: [
      '#ccc',
      '#ffba01'
  ],
  starStroke: '#000',
  exclude: [],
  excludeCats: [
      'Category:Policy'
  ],
  location: 'top-rail'
};

//Functions
mw.hook("wikipage.content").add(function($content) {
    if(window.wgCategories.includes("Disambiguations")) {
        $("#WikiaArticleComments")[0].remove();
    }
});