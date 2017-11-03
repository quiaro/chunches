import auth0 from 'auth0-js';

const CLIENT_ID = 'nPHTZW3yqOpIZ2TWKG6rAyNGqH91Vunq';
const CLIENT_DOMAIN = 'quiros.auth0.com';
const REDIRECT = 'http://localhost:3000/callback';
const SCOPE = 'openid email';
const AUDIENCE = 'https://quiros.auth0.com/api/v2/';

const auth = new auth0.WebAuth({
  domain: CLIENT_DOMAIN,
  clientID: CLIENT_ID,
});

const USER_ID_KEY = 'user_id';
const USER_TOKEN_KEY = 'user_token';

export function login() {
  auth.authorize({
    responseType: 'token',
    redirectUri: REDIRECT,
    audience: AUDIENCE,
    scope: SCOPE,
  });
}

export function logout(history) {
  clearUserSession();
  history.push('/');
}

export function clearUserSession() {
  localStorage.removeItem(USER_ID_KEY);
  localStorage.removeItem(USER_TOKEN_KEY);
}

export function getUserSession() {
  return {
    id: localStorage.getItem(USER_ID_KEY),
    token: localStorage.getItem(USER_TOKEN_KEY),
  };
}

// Convenience method since the user id is required frequently for queries
export function getUserId() {
  return localStorage.getItem(USER_ID_KEY);
}

export function setUserSession(userId, userToken) {
  localStorage.setItem(USER_ID_KEY, userId);
  localStorage.setItem(USER_TOKEN_KEY, userToken);
}

export function isLoggedIn() {
  const { id, token } = getUserSession();
  return id && token;
}

// Helper function that parses and saves Auth0's access token
export function getAccessToken() {
  return new Promise((resolve, reject) => {
    auth.parseHash(window.location.hash, function(err, authResult) {
      if (err) reject(err);
      resolve(authResult.accessToken);
    });
  });
}
