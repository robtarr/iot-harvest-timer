/**
 *  Determine the orientation of the gyro
 *  @memberof
 *  @param    {Object} data - containing the x,y, and z angles of the gyro
 *  @return   {String} representing what side is up
 */
function orientation(data) {
  const { x, y, z } = data;
  const threshold = 100;
  const absX = Math.abs(x);
  const absY = Math.abs(y);
  const absZ = Math.abs(z);

  if (absX < threshold && absY < threshold) {
    if (z > 0) {
      return 'top';
    } else {
      return 'bottom';
    }
  } else if (absZ < threshold && absY < threshold) {
    if (x > 0) {
      return 'a';
    } else {
      return 'b';
    }
  } else if (absX < threshold && absZ < threshold) {
    if (y > 0) {
      return 'c';
    } else {
      return 'd';
    }
  }

  return undefined;
}

export {
  orientation
}
