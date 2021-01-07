export default function authHeader() {
  const token = localStorage.getItem("token");
  const clientId = localStorage.getItem("clientId");

  if (clientId && token) {
    // For Spring Boot back-end
    // return { Authorization: "Bearer " + user.accessToken };

    // for Node.js Express back-end
    return {};
    return { "x-access-token": token };
  } else {
    return {};
  }
}
