function dealWithResponses(response) {
    var twitterString = "";
    if (response) {
      twitterString += '<div class="rssBody"><ul>';
      $.each(response, function(index, tweet) {
        if (index > 3) {
          return;
        }
        var date = new Date(tweet.created_at),
          newClass = "odd",
          pubDate = date.toLocaleDateString() + ' ' + date.toLocaleTimeString();;
        if (index%2 == 1) {
          newClass = "even";
        }
        twitterString += '<li class="rssRow '+newClass+'"><h4><a href="http://twitter.com/RealService/statuses/'+ tweet.id +'" target="_blank" title="View this feed at Twitter / RealService">'+tweet.text+'</a></h4><div>'+pubDate+'</div></li>';
      });
      twitterString += '</ul></div>';
    }
    $('#twitter_block').addClass('rssFeed')
    $('#twitter_block').html(twitterString);
  }

jQuery(function($) {
  $.ajax({
    url: "http://api.twitter.com/1/statuses/user_timeline.json?screen_name=RealService",
    dataType: "jsonp",
    jsonpCallback: "dealWithResponses"
  });
});