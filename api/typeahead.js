var sync = require('synchronize');
var request = require('request');

// The Type Ahead API.
module.exports = function(req, res) {
  var user = req.query.text.trim();

  if (!user) {
    res.json([{
      title: '<i>(enter a username or organization)</i>',
      text: ''
    }]);
    return;
  }

  // Compared to the tutorial, there's no need for underscore. Our Mixmax typeahead dropdown should only contain one
  // entry per query
  var response;
  try {
    response = sync.await(request({
      url: 'https://api.github.com/users/' + user,
      'headers': {
        'user-agent': 'alexadusei'
      },
      json: true,
      timeout: 10 * 1000,
    }, sync.defer()));
  } catch (e) {
    res.status(500).send('Error');
    return;
  }

  // Essentially happens when the user doesn't exist, return no results
  if (response.statusCode !== 200 || !response.body) {
    res.json([{
      title: '<i>(no results)</i>',
      text: ''
    }]);
    return;
  }

  // Display their bios. If they have none, just display their name
  var textInfo = !response.body.bio ? response.body.name : response.body.bio;

  // Some GitHub users don't even have names.. (bots?). If so, leave the field blank.
  var textInfo = !textInfo ? '' : textInfo;

  res.json([ {
    title: '<img style="height:75px;float:left" src="' + response.body.avatar_url + '">' +
            '<p style="height:75px;margin-left:80px">' + textInfo + '</p>',
    text: user
  }]);
};
