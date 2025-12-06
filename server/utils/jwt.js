import jwt from 'jsonwebtoken';
export const generateAccessToken = (payload) => {
  return jwt.sign(
    payload,
    '5ee5ccd49bc212e3ce9f4b67b63ab981433cccfbe60f7dbf92b22b87116d3ea73ccf4fb6afbf0e73f90772f7a838156006d5d1faec38da9314a20484a639cd6c',
    { expiresIn: '1hr' }
  );
};

export const generateRefreshToken = (payload) => {
  return jwt.sign(
    payload,
    '5ee5ccd49bc212e3ce9f4b67b63ab981433cccfbe60f7dbf92b22b87116d3ea73ccf4fb6afbf0e73f90772f7a838156006d5d1faec38da9314a20484a639cd6c',
    { expiresIn: '7d' }
  );
};
//paramter kya accept main karunga