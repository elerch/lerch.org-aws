'use strict';

var awsfilter       = require('./awsfilter');
var githubPull      = require('./github-pull');
var s3ext           = require('./s3-ext');

// exports and module exports are not the same in node, and this is confusing
exports = module.exports;

function copySite(src, bucket, destPrefix, cb) {
  var copyOptions = {Bucket: bucket, ACL: 'public-read', StorageClass: 'REDUCED_REDUNDANCY'};
  console.log('copying from ' + src + ' to ' + bucket + ':' + (destPrefix || '(root)'));
  s3ext.copyAllRecursive(
    src, destPrefix, 'us-west-2',
    copyOptions,
    function complete(err) {
      if (err) {console.log('error during copy'); console.log(err); cb(err); return; }
      console.log('file copy complete');
      cb();
    });
}

exports.handler = function updateSite(event, context) {
  var snsMessage, repo, commitHash, shorthash, unpackDirectory;
  console.log('Received event:', JSON.stringify(event, null, 2));
  snsMessage = awsfilter.extractSnsMessage(event);
  repo = snsMessage.repository;
  commitHash = snsMessage.head_commit.id;
  shorthash = githubPull.shortCommitId(commitHash);
  unpackDirectory = githubPull.unpackDirectory(repo, shorthash);

  console.log('downloading repository tarball: ' + unpackDirectory);
  githubPull.downloadTarball(repo, shorthash, function downloaded(err, location) {
    if (err) { console.log(err); context.fail(new Error('error downlading tarball')); return; }
    console.log('tarball received/unpacked to: ' + location);
    copySite(location, 'www.lerch.org', '', function copied(generationError) {
      if (generationError) {
        console.log(generationError);
        context.fail(new Error('failed to generate/copy'));
        return;
      }
      console.log('generated site successfully');
      context.succeed('generated site successfully');
      return;
    });
  });

};
