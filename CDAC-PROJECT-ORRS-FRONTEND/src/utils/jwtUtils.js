/**
 * JWT Utility Functions
 * Handles JWT token parsing and validation on the frontend
 */

/**
 * Decode JWT token payload (without verification - for client-side use only)
 * @param {string} token - JWT token
 * @returns {Object|null} Decoded payload or null if invalid
 */
export const decodeJWT = (token) => {
  try {
    if (!token) return null;
    
    // JWT has 3 parts separated by dots: header.payload.signature
    const parts = token.split('.');
    if (parts.length !== 3) return null;
    
    // Decode the payload (second part)
    const payload = parts[1];
    
    // Add padding if needed for base64 decoding
    const paddedPayload = payload + '='.repeat((4 - payload.length % 4) % 4);
    
    // Decode base64
    const decodedPayload = atob(paddedPayload);
    
    // Parse JSON
    return JSON.parse(decodedPayload);
  } catch (error) {
    console.error('Error decoding JWT:', error);
    return null;
  }
};

/**
 * Extract user information from JWT token
 * @param {string} token - JWT token
 * @returns {Object|null} User information or null if invalid
 */
export const extractUserFromJWT = (token) => {
  try {
    const payload = decodeJWT(token);
    if (!payload) return null;
    
    return {
      userId: payload.user_id,
      email: payload.sub, // JWT subject contains email
      role: payload.user_role,
      exp: payload.exp, // Expiration time
      iat: payload.iat, // Issued at time
    };
  } catch (error) {
    console.error('Error extracting user from JWT:', error);
    return null;
  }
};

/**
 * Check if JWT token is expired
 * @param {string} token - JWT token
 * @returns {boolean} True if expired, false otherwise
 */
export const isTokenExpired = (token) => {
  try {
    const payload = decodeJWT(token);
    if (!payload || !payload.exp) return true;
    
    // Convert expiration time to milliseconds and compare with current time
    const expirationTime = payload.exp * 1000;
    return Date.now() >= expirationTime;
  } catch (error) {
    console.error('Error checking token expiration:', error);
    return true;
  }
};

/**
 * Get token expiration date
 * @param {string} token - JWT token
 * @returns {Date|null} Expiration date or null if invalid
 */
export const getTokenExpirationDate = (token) => {
  try {
    const payload = decodeJWT(token);
    if (!payload || !payload.exp) return null;
    
    return new Date(payload.exp * 1000);
  } catch (error) {
    console.error('Error getting token expiration date:', error);
    return null;
  }
};