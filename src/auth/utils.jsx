export function requireAuth({ request }) {
  const pathName = new URL(request.url).pathname || "";
  const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";

  if (!isLoggedIn) {
    // Return redirect path instead of throwing redirect
    return `/login?message=You must log in first&redirectTo=${pathName}`;
  }

  return null;
}
