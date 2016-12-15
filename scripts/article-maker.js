/* create article objects and get them ready for population */
/* create the array of articles to read the data file */
var articles = [];

/*receive the object and associate to the key fields of the article */
function Article(opts) {
  /* save the properties of the incoming object */
  this.author = opts.author;
  this.authorUrl = opts.authorUrl;
  this.articleTitle = opts.articleTitle;
  this.category = opts.category;
  this.publishedOn = opts.publishedOn;
  this.articleBody = opts.articleBody;
}

/*create the instances of information from the Article object */
Article.prototype.toHtml = function() {
  /*article.template is an element with a class */
  var $newArticle = $('article.template').clone();

$newArticle.attr('data-category', this.category);
/*get the elements to replace */
$newArticle.find('.byline a').text(this.author);
$newArticle.find('.byline a').attr('href', this.authorUrl);
$newArticle.find('header h1:first').text(this.articleTitle);
$newArticle.find('.article-body').text(this.articleBody);
$newArticle.find('time[pubdate]').attr('title', this.publishedOn);
$newArticle.find('time').html('about ' + parseInt((new Date() - new Date(this.publishedOn))/60/60/24/1000) + ' days ago');

/* we're done with template node */
$newArticle.removeAttr('class');

  return $newArticle;
}

/* sort based on publication date, using Date function to get millions of seconds */
theLocalData.sort(function(curElem, nextElem) {
  return (new Date(nextElem.publishedOn)) - (new Date(curElem.publishedOn));
});

/* this is going to get the source file and build array for articles */
theLocalData.forEach(function(ele) {
  articles.push(new Article(ele));
});

/* this will take the article array elements and populate html */
articles.forEach(function(a) {
  $('#articles').append(a.toHtml());
});
