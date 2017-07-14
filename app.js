var githubhook = require('githubhook');
var github = githubhook({
  host: '0.0.0.0',
  port: 5000,
  path: '/',
  secret: process.env['TEST_GITHUB_CI_SERVER_SECRET']
});

github.listen();

github.on('push', function(repo, ref, data) {
  console.log('\n\nrepo: ' + repo);
  console.log('\n\nref: ' + ref);
  console.log('\n\ndata: ' + data);
});
