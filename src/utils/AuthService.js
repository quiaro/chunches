import decode from 'jwt-decode';
import auth0 from 'auth0-js';
import { ID_TOKEN_KEY, ACCESS_TOKEN_KEY } from '../constants'

const CLIENT_ID = 'nPHTZW3yqOpIZ2TWKG6rAyNGqH91Vunq';
const CLIENT_DOMAIN = 'quiros.auth0.com';
const REDIRECT = 'http://localhost:3000/callback';
const SCOPE = 'openid email profile';
const AUDIENCE = 'https://quiros.auth0.com/userinfo';

var auth = new auth0.WebAuth({
  clientID: CLIENT_ID,
  domain: CLIENT_DOMAIN
});

export function login() {
  auth.authorize({
    responseType: 'token id_token',
    redirectUri: REDIRECT,
    audience: AUDIENCE,
    scope: SCOPE
  });
}

export function logout(history) {
  clearIdToken();
  clearAccessToken();
  history.push('/');
}

export function requireAuth(nextState, replace) {
  if (!isLoggedIn()) {
    replace({ pathname: '/' });
  }
}

export function getIdToken() { return localStorage.getItem(ID_TOKEN_KEY); }
export function getAccessToken() { return localStorage.getItem(ACCESS_TOKEN_KEY); }

function clearIdToken() { localStorage.removeItem(ID_TOKEN_KEY); }
function clearAccessToken() { localStorage.removeItem(ACCESS_TOKEN_KEY); }

function setIdToken(idToken) { localStorage.setItem(ID_TOKEN_KEY, idToken); }
function setAccessToken(accessToken) { localStorage.setItem(ACCESS_TOKEN_KEY, accessToken); }

// Helper function that will allow us to extract the access token and the id_token
export function getAndStoreParameters() {
  auth.parseHash(window.location.hash, function(err, authResult) {
    if (err) {
      return console.log(err);
    }

    setIdToken(authResult.idToken);
    setAccessToken(authResult.accessToken);
  });
}

export function getProfile() {
  const profile = decode(getIdToken());
  return profile;
}
export function getEmail() { return getProfile().email; }
export function getName() { return getProfile().nickname; }

function getTokenExpirationDate(encodedToken) {
  const token = decode(encodedToken);
  if (!token.exp) { return null; }

  const date = new Date(0);
  date.setUTCSeconds(token.exp);

  return date;
}

function isTokenExpired(token) {
  const expirationDate = getTokenExpirationDate(token);
  return expirationDate < new Date();
}

export function isLoggedIn() {
  const idToken = getIdToken();
  return !!idToken && !isTokenExpired(idToken);
}
