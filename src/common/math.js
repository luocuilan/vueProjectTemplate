/**
 * Created on 11/01/2018.
 */

'use strict';

/**
 * 获取2点的角度
 * @param start
 * @param end
 * @returns {number}
 */
export const getAngle = (start, end) => {
  let x = Math.abs(start.x - end.x);
  let y = Math.abs(start.y - end.y);
  let z = Math.sqrt(x * x + y * y);
  return Math.round((Math.asin(y / z) / Math.PI * 180));
};

/**
 * 获取2点的直线长度
 * @param start
 * @param end
 * @returns {number}
 */
export const distanceCal = (start, end) => {
  let calX = end.x - start.x;
  let calY = end.y - start.y;
  return Math.pow((calX * calX + calY * calY), 0.5);
};
