import { redirect } from "react-router-dom";

export async function requireAuth({ request }) {
  console.log(request)
  const pathName = new URL(request.url).pathname || "";

  const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
  console.log("From required Auth with" +"  $request.url islogged: ", isLoggedIn)
  if (!isLoggedIn) {
    throw redirect(
      `/login?message=You must log in first&redirectTo=${pathName}`
    );
  }
  return null;
}
