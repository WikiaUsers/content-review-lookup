/* Any JavaScript here will be loaded for all users on every page load. */

// reddits
// https://gist.github.com/sente/947491

// i really need to learn how to make plugins
var subreddit = 'HeirofLight';
var rddt = 0;
var tbns = 0;
var maxtbns = 14;
var maxrddts = 10;


$.getJSON(
"http://www.reddit.com/r/" + subreddit + ".json?sort=top&t=week&limit=40&jsonp=?",
function foo(data)
{
  $.each(
    data.data.children,
    function (i, post) {
      var img = ['jpg','png','gif'];
      var item = '';
      var tbn = '';
      if (post.data.thumbnail && post.data.thumbnail != 'self' && tbns < maxtbns) {
        tbns++;
        tbn += '<a href="' + post.data.url + '" title="' + post.data.title + '" target="_blank"><img src="' + post.data.thumbnail + '"></a>';
      } else if (rddt<=maxrddts) {
          rddt++;
          item = '<li><p><strong><a href="' + post.data.url + '" target="_blank">' + post.data.title + '</strong></a></p>';
          item += '<p>' + post.data.ups + '&uarr; ' + post.data.downs + '&darr; | <a href="//reddit.com' + post.data.permalink + '" target="_blank">' + post.data.num_comments + ' Comments</a></p></li>';
      }
      // if (x=$.inArray(post.data.url.split('.').pop(), img)>0) {
      //   console.log(x + ' : ' + post.data.url);
      //   console.log('tbn: '+post.data.thumbnail);
      //   tbn += '<a href="' + post.data.url + '" target="_blank"><img src="' + post.data.thumbnail + '"></a>';
      // }
      $("#reddit .posts").append(item);
      $("#reddit .thumbs").append(tbn);
    }
  )
}
)
.success(function() { console.log("second success"); })
.error(function() { console.log("error"); })
.complete(function() { console.log("complete"); });