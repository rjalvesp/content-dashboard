import * as R from 'ramda';

export const arrayToDictionary = R.indexBy(R.prop('name'));

export const pickFromArrayByName = (name) =>
  R.pipe(arrayToDictionary, R.prop(name));

const deconstructAccessMatrix = ({ name, ...obj }) => ({ [name]: obj });

export const parseAccessMatrix = R.ifElse(
  R.is(Array),
  R.pipe(R.map(deconstructAccessMatrix), R.mergeAll),
  deconstructAccessMatrix
);
