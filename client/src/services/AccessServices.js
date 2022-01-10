import axios from 'axios';
import * as R from 'ramda';

export const setFile = async ({ name, ...value }) => {};

export const getAccessMatrix = async () =>
  axios
    // .get('/json/access-matrix.json')
    .get('https://access-negotiation.s3.amazonaws.com/access.json')
    .then(R.propOr([], 'data'))
    .then(R.mapObjIndexed((value, key) => ({ name: key, ...value })))
    .then(R.values);

export const getRestrictedAccess = async () =>
  axios.get('/json/restricted-access.json').then(R.propOr([], 'data'));

export const setRestrictedAccess = async ({ name, ...value }) => {};
