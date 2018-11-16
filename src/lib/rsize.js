import Dimensions from 'Dimensions';

/**
 * @param {Number}  Scale 0 <= x <= 100
 * @return {int}
 */
export function rwidth (scale) {
  return (scale / 100) * Dimensions.get('window').width;
}

/**
 * @param {Number}  Scale 0 <= x <= 100
 * @return {int}
 */
export function rheight (scale) {
  const fullHeight = Dimensions.get('window').height;
  return (scale / 100) * fullHeight;
}
