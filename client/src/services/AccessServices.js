import axios from 'axios';
import * as R from 'ramda';

export const setFile = async ({ name, ...value }) => {};

export const getAccessMatrix = async () =>
  axios
    .get('http://localhost:3000/access-matrix')
    .then(R.propOr([], 'data'))
    .then(R.mapObjIndexed((value, key) => ({ name: key, ...value })))
    .then(R.values);

export const setAccessMatrix = async (value) =>
  axios
    .put('http://localhost:3000/access-matrix', value)
    .then(R.propOr([], 'data'))
    .then(R.mapObjIndexed((value, key) => ({ name: key, ...value })))
    .then(R.values);

export const getRestrictedAccess = async () =>
  axios
    .get('http://localhost:3000/restricted-access')
    .then(R.propOr([], 'data'));

export const setRestrictedAccess = async (value) =>
  axios
    .put('http://localhost:3000/restricted-access', value)
    .then(R.propOr([], 'data'));
