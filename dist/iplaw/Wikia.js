/*** SOPA/PIPA Action Form ***/
$(function() {
  $('#sopa').html('<form id="sopaform" action="javascript:sopaSubmit()"><label>Enter your Zip:</label><input type="text" size="5" maxlength="5" id="sopafield"><input type="submit" value="Lookup!"></form><div id="soparesults"></div><br><br>');
});

function sopaSubmit() {
  var zip = $('#sopafield').val();
  if ( zip.length == 5 ) {
    $.getJSON('http://services.sunlightlabs.com/api/legislators.allForZip.json?apikey=b4de2f8d20bc4c9eb83e6c3590376afe&zip=' + zip + '&jsonp=?', function(data) {

      houseHTML = '';
      senateHTML = '';

      $.each(data.response.legislators, function(index, value) {
        var L = value.legislator;
        var html = '';

        html = '<p>';
        html += '<b>' + L.firstname + ' ' + L.middlename + ' ' + L.lastname + ' (' + L.party + '-' + L.state + ')</b><br>';

        if (L.email) {
          html += '<label>Email:</label> <a href="mailto:' + L.email + '">' + L.email + '</a><br>';
        }

        if (L.phone) {
          html += '<label>Phone:</label> ' + L.phone + '<br>';
        }
          
        if (L.website) {
          html += '<label>Website:</label> <a href="' + L.website + '" target="_blank">' + L.website + '</a><br>';
        }

        if (L.twitter_id) {
          html += '<label>Twitter:</label> <a href="https://twitter.com/intent/tweet?text=@' + L.twitter_id + ' I want to be heard. Oppose current SOPA/PIPA legislation so we continue the free exchange of ideas and learn together.">@' + L.twitter_id + '</a><br>';
        }

        if (L.facebook_id) {
          html += '<label>Facebook:</label> <a href="http://www.facebook.com/' + L.facebook_id + '" target="_blank">http://www.facebook.com/' + L.facebook_id + '</a><br>';
        }
        
        if (L.chamber == 'house') {
          houseHTML += html;
        } else if (L.chamber == 'senate') {
          senateHTML += html;
        } 

      });

      $('#soparesults').html('<h2>House</h2>' + houseHTML + '<h2>Senate</h2>' + senateHTML);

    });
  }
}
/*** end SOPA/PIPA Action Form ***/