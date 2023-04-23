/************************************************************************/
/* Any JavaScript here will be loaded for all users on every page load. */
/************************************************************************/
window.addEventListener('load', function(e) {
	for (var i = 0; i < document.getElementsByClassName('user-identity-header__tag').length; i++) {
		if (document.getElementsByClassName('user-identity-header__tag')[i].innerHTML === 'Bureaucrat')document.getElementsByClassName('user-identity-header__tag')[i].innerHTML = 'A Class Personnel';
		}
});
/*BELOW IS RATING TEST - NJ*/
<script>
  // get the current rating from localStorage or set it to 0 if not found
  var rating = localStorage.getItem('rating') || 0;

  // set the initial state of the buttons based on the current rating
  if (rating == 1) {
    document.querySelector('.upvote').classList.add('active');
  } else if (rating == -1) {
    document.querySelector('.downvote').classList.add('active');
  }

  // add click event listeners to the buttons
  document.querySelector('.upvote').addEventListener('click', function() {
    // update the rating and store it in localStorage
    rating = 1;
    localStorage.setItem('rating', rating);

    // update the button styles
    document.querySelector('.upvote').classList.add('active');
    document.querySelector('.downvote').classList.remove('active');
  });

  document.querySelector('.downvote').addEventListener('click', function() {
    // update the rating and store it in localStorage
    rating = -1;
    localStorage.setItem('rating', rating);

    // update the button styles
    document.querySelector('.upvote').classList.remove('active');
    document.querySelector('.downvote').classList.add('active');
  });
</script>
<style>
  /* your CSS code here */
</style>

<div class="rating">
  <button class="upvote">&#9650;</button>
  <button class="downvote">&#9660;</button>
</div>

<script>
  // your JavaScript code here
</script>