
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
    // YOUR CODE GOES HERE!
    $body.append('<img class="bgimg" src="' + streetviewUrl + '">');

    return false;
}

$('#form-container').submit(loadData);

// You'll also need to use jQuery's append method to add an <img> to the page. Make sure it has a class of bgimg. For example:
// Notice how the new <img> HTML element is just a string passed into .append().
