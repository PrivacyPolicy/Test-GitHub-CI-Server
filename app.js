// To listen for pull requests
var githubhook = require('githubhook');
var github = githubhook({
  host: '0.0.0.0',
  port: 5000,
  path: '/',
  secret: process.env['TEST_GITHUB_CI_SERVER_SECRET']
});

// To update commit statuses
var octonode = require('octonode');
var gitHubAccess = process.env['ONAROLL_GITHUB_ACCESS_TOKEN'];
var client = octonode.client(gitHubAccess);


// Listen for pull requests and return the status
github.listen();

github.on('pull_request', function(pull_request) {
  //repo, ref, data) {
  // console.log('\n\nrepo: ' + repo);
  // console.log('\n\nref: ' + ref);
  // console.log('\n\ndata: ' + data);
  client.create_status(
    pull_request['base']['repo']['full_name'],
    pull_request['head']['sha'],
    'pending');
  setTimeout(function() {
    client.create_status(
      pull_request['base']['repo']['full_name'],
      pull_request['head']['sha'],
      'success');
  }, 10000);
  console.log('Lol tricked them into thinking we did something but we did nothing');
});
