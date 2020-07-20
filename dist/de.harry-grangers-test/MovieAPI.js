Movie = {
    title: '',
    description: '',
    cover: '',
    cast: {},
    crew: {},
    duration: '',
    usk: '',
    producingDate: '',
    releaseDate: ''
}

/*$.get('http://ofdbgw.home-of-root.de/movie_json/242').done(function(data) {
    console.log(data);
});
$.get('http://ofdbgw.johann-scharl.de/movie.php?output=json&id=242').done(function(data) {
    console.log(data);
});
$.get('http://ofdbgw.metawave.ch/movie_json/242').done(function(data) {
    console.log(data);
});*/

$.ajax({
  url: 'http://ofdbgw.home-of-root.de/movie_json/242',
  crossDomain: true
}).done(function() {
  $( this ).addClass( "done" );
});

function getMovie(title,callback) {
    $.ajax({
        url: "http://imdb.wemakesites.net/api/1.0/get/title/",
        data: {
            q: title,
            apikey: "YOUR_API_KEY"
        },
        dataType: "jsonp",
        crossDomain: true,
        success: callback
    });
};

getMovie('Harry Potter und der Stein der Weisen', function(data) {
    Movie.title = data.data.title;
    Movie.description = data.data.description;
    Movie.cast = data.data.cast;
    Movie.crew.directors = data.data.directors;
    Movie.crew.writers = data.data.writers;
    Movie.duration = data.data.runningTime;
    Movie.rating = data.data.rating;
    Movie.producingDate = data.data.year;
    Movie.releaseDate = data.date.releaseDate;
    Movie.cover = data.data.poster;
});