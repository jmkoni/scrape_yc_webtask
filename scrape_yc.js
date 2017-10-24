const request = require("request");
const cheerio = require("cheerio");


module.exports = function (ctx, done) {
  var results = "";
  request({
    uri: "http://news.ycombinator.com",
  }, function(error, response, body) {
    var $ = cheerio.load(body);
    $(".storylink").each(function() {
      var link = $(this);
      var text = link.text();
      var href = link.attr("href");
      if (ctx.data.search){
        if (text.toLowerCase().includes(ctx.data.search)) {
          results = results + text + ": " + href + "\n";
        }
      } else {
        results = results + text + ": " + href + "\n";
      }
    });
    done(null, results);
  });
}
