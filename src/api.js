// api.js
export const authenticatedRequest = async (
  url,
  method = "GET",
  body = null
) => {
  // Retrieve the token from localStorage
  const token = localStorage.getItem("token");

  // Prepare the request options
  const options = {
    method,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`, // Important: Send token in Authorization header
    },
  };

  // Add body if it exists
  if (body) {
    options.body = JSON.stringify(body);
  }

  // Make the request
  const response = await fetch(url, options);

  // Check if the response is unauthorized
  if (response.status === 403) {
    // Token might be expired or invalid
    localStorage.removeItem("token");
    window.location.href = "/"; // Redirect to login page
    throw new Error("Unauthorized");
  }

  return response.json();
};
