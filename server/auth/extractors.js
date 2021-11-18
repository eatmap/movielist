const COOKIE_NAME = 'movielist-jwt';

// Get JWT from cookie
function cookieExtractor(req) {
  return req?.cookies?.[COOKIE_NAME] || '';
}

// Get JWT from request header
function headerExtractor(req) {
  const headers = req.headers.authorization;
  if (headers && headers.startsWith('Bearer ')) {
    return headers.split(' ')[1];
  }
  return '';
}

// Save JWT as cookie for outgoing response
function setJWTCookie(res, payload, maxAge) {
  res.cookie(COOKIE_NAME, payload, {
    maxAge: maxAge * 1000,
    httpOnly: process.env.NODE_ENV !== 'production',
  });
}

module.exports = {
  COOKIE_NAME,
  cookieExtractor,
  headerExtractor,
  setJWTCookie,
};
