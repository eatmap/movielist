const {
  cookieExtractor,
  headerExtractor,
  setJWTCookie,
  COOKIE_NAME,
} = require('../extractors');

let req = {};
beforeEach(() => {
  req.cookies = {};
  req.headers = {};
});

describe('Parse Cookies', () => {
  test('should parses the cookie correctly', () => {
    // setup cookie
    const testCookie = 'testCookie';
    req.cookies[COOKIE_NAME] = testCookie;

    expect(cookieExtractor(req)).toEqual(testCookie);
  });

  test('should not find other cookies', () => {
    req.cookies['randomCookie'] = '123';
    req.cookies['anotherCookie'] = '435';

    expect(cookieExtractor(req)).toEqual('');
  });
});

describe('Parse Request Headers', () => {
  const token = 'token123';
  test('should find valid request authorization header', () => {
    req.headers.authorization = `Bearer ${token}`;
    expect(headerExtractor(req)).toEqual(token);
  });

  test('should reject invalid request authorization header', () => {
    req.headers.authorization = token;
    const gotToken = headerExtractor(req);
    expect(gotToken).not.toEqual(token);
    expect(gotToken).toEqual('');
  });

  test('should reject missing request authorization header', () => {
    expect(headerExtractor(req)).toEqual('');
  });
});
