const R = require('ramda');
const express = require('express');
const aws = require('aws-sdk');
const router = express.Router();

const Bucket = R.pathOr('', ['env', 'AWS_BUCKET'], process);

const s3 = new aws.S3({
  credentials: {
    accessKeyId: R.pathOr('', ['env', 'AWS_ACCESS_KEY_ID'], process),
    secretAccessKey: R.pathOr('', ['env', 'AWS_SECRET_ACCESS_KEY'], process),
    region: R.pathOr('', ['env', 'AWS_REGION'], process),
  },
});

const nameParser = {
  'access-matrix': 'access',
  'restricted-access': 'restricted-access',
};

const save = (name, content) =>
  s3
    .putObject({
      Bucket,
      Key: `${nameParser[name]}.json`,
      // ACL: AWS_ACL,
      Body: JSON.stringify(content, null, 2),
    })
    .promise();

const retrieve = (name) =>
  s3
    .getObject({
      Bucket,
      Key: `${nameParser[name]}.json`,
      // ACL: AWS_ACL,
    })
    .promise();

const isNameValid = (req, res, next) => {
  if (!R.includes(req.params.name, ['access-matrix', 'restricted-access'])) {
    return res.status(400).json({ error: 'Invalid name' });
  }
  next();
};

router.get('/:name', isNameValid, function (req, res) {
  retrieve(req.params.name)
    .then(R.propOr('null', 'Body'))
    .then((buffer) => JSON.parse(buffer.toString()))
    .then((value) => res.status(200).json(value))
    .catch((error) => res.status(500).json(error));
});

router.put('/:name', isNameValid, function (req, res) {
  save(req.params.name, req.body)
    .then(() => res.status(201).json(req.body))
    .catch((error) => res.status(500).json(error));
});

module.exports = router;
