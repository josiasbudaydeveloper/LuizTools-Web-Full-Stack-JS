const TOKEN_KEY = 'mailshrimp-token';

const isAuthenticated = () => localStorage.getItem(TOKEN_KEY) !== null;

const getToken = () => localStorage.getItem(TOKEN_KEY);

/**
 * Stores the token into localStorage
 * @param {string} token 
 */
function login(token) {
  localStorage.setItem(TOKEN_KEY, token);
}

/**
  Removes the token from localStorage
*/
function logout() {
  localStorage.removeItem(TOKEN_KEY);
}

export {
  TOKEN_KEY,
  isAuthenticated,
  getToken,
  login,
  logout
}