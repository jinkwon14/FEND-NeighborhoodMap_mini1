
function loadData() {
    var $body = $('body');
    var $wikiElem = $('#wikipedia-links');
    var $nytHeaderElem = $('#nytimes-header');
    var $nytElem = $('#nytimes-articles');
    var $greeting = $('#greeting');

    // clear out old data before new request
    $wikiElem.text("");
    $nytElem.text("");

    // !! This is how to call the data from form
    var streetStr = $('#street').val();
    var cityStr = $('#city').val();
    var address = streetStr + ', ' + cityStr;

    $greeting.text('So you want to live at ' + address + '?');

    var streetviewUrl = 'http://maps.googleapis.com/maps/api/streetview?size=600x400&location=' + address + '';
    $body.append('<img class="bgimg" src="' + streetviewUrl + '">');

    // Add New York Times API
    var newyorktimesURL = 'http://api.nytimes.com/svc/search/v2/articlesearch.json?q=' + cityStr + '&sort=newest&api-key=d3b3ebf311294423b96fa5571680868e';
    $.getJSON(newyorktimesURL, function(data) {
      $nytHeaderElem.text('New York Times Ariticle About ' + cityStr);

      var articles = data.response.docs;
      var articleSize = articles.length;
      var i;
      var article;
      for (i = 0; i < articleSize; i++) {
        article = articles[i];
        $nytElem.append('<li class=article>' +
          '<a href="' + article.web_url+'">' + article.headline.main +
          '</a>' +
        '<p>' + article.snippet + '</p>' +
        '</li>');
      }

    }).failed(function(e){
        $nytHeaderElem.text('New York Times Articles Could Not Be Loaded!');
    });

    // Add Wikipedia API
    // Time-out Error handling
    var wikiRequestTimeout = setTimeout(function() {
      $wikiElem.text("failed to get wikipedia resources");
    }, 8000);


    var wikiUrl = 'https://en.wikipedia.org/w/api.php?action=opensearch&search=' + cityStr + '&format=json&callback=wikiCallback';
    $.ajax(wikiUrl, {
      // url: wikiUrl,
      dataType: "jsonp",
      // jsonp: "callback"
      done: function(response) {
        var articleList = response[1];

        var articleLength = articleList.length;
        var i;
        var url;
        var articleStr;

        for (i = 0; i < articleLength; i++) {
          articleStr = articleList[i];
          url = 'http://en.wikipedia.org/wiki/' + articleStr;
          $wikiElem.append('<li><a href="' + url + '">' +
            articleStr + '<a></li>');
        }

        clearTimeout(wikiRequestTimeout);
      }
    });
    return false;
}

$('#form-container').submit(loadData);
