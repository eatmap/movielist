// Authenticate provided credentials.
// If successful, return the JWT assigned by the server
export async function login(username, password) {
  const payload = { username, password };

  const response = await fetch('/api/auth/login', {
    method: 'POST',
    body: JSON.stringify(payload),
    headers: {
      'Content-Type': 'application/json',
    },
  });

  const body = await response.json();

  if (response.status === 200) {
    if (body.token) {
      return body.token;
    }
  }

  const errorMessage = body.message || 'Failed to authenticate with the server';
  throw Error(errorMessage);
}

// Register new user. Throw error is registration was unsuccessful
export async function register(username, password) {
  const payload = { username, password };

  const response = await fetch('/api/auth/register', {
    method: 'POST',
    body: JSON.stringify(payload),
    headers: {
      'Content-Type': 'application/json',
    },
  });

  const body = await response.json();

  if (response.status === 200) {
    return;
  }

  const errorMessage = body.message || 'Failed to authenticate with the server';
  throw Error(errorMessage);
}

// Test if the provided token is valid
export async function validateJWT(token) {
  if (!token || token.trim().length === 0) {
    throw Error('Please login to use the application');
  }

  const response = await fetch(`/api/auth/validate?token=${token}`);

  if (response.status === 200) {
    // JWT is valid
    return;
  } else if (response.status >= 400 && response.status < 500) {
    throw Error('Please login before using the application');
  }

  // Some unexpected error occured on server side
  throw Error('Failed to authenticate with the server');
}

export async function logout() {
  const response = await fetch(`/api/auth/logout`);
  if (response.status === 200) {
    return;
  }

  throw Error('Failed to logout. Please try again later');
}
