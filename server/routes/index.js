const R = require('ramda');
const express = require('express');
const aws = require('aws-sdk');
const router = express.Router();

const s3 = new aws.S3();

const nameParser = {
  'access-matrix': 'access',
  'restricted-access': 'restricted-access',
};

const save = (name, content) =>
  s3
    .putObject({
      Bucket: 'access-negotiation',
      Key: `access-negotiation/${name}.json`,
      // ACL: AWS_ACL,
      Body: JSON.stringify(content, null, 2),
    })
    .promise();

const retrieve = (name) =>
  s3
    .getObject({
      Bucket: 'access-negotiation',
      Key: `access-negotiation/${name}.json`,
      // ACL: AWS_ACL,
    })
    .promise();

const isNameValid = (req, res, next) => {
  console.log(req.params);
  if (!R.includes(req.params.name, ['access-matrix', 'restricted-access'])) {
    res.json(400, { error: 'Invalid name' });
  }
  next();
};

router.get('/:name', isNameValid, function (req, res) {
  retrieve(req.params.name)
    .then(R.propOr('null', 'Body'))
    .then(JSON.parse)
    .then(res.status(200).json)
    .catch((error) => res.status(500).json(error));
});

router.put('/:name', isNameValid, function (req, res) {
  save(req.params.name, req.body)
    .then(res.status(201).json)
    .catch((error) => res.status(500).json(error));
});

module.exports = router;
