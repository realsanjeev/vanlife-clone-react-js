import React from "react";
import { useLoaderData, 
  Form, 
  useActionData, 
  redirect, 
  useNavigation } from "react-router-dom";
import { loginUser } from "../api";

export async function loader({ request }){
  const isLoggedIn = localStorage.getItem("isLoggedIn")
  if (isLoggedIn==="true") {return redirect("/host")}
  return new URL(request.url).searchParams.get("message")
}

export async function action({ request }) {
  const formData = await request.formData()
  const redirectUrl = new URL(request.url).searchParams.get("redirectTo")
  console.log(redirectUrl)
  const email = formData.get("email")
  const password = formData.get("password")
  try {
    await loginUser({email, password})
    localStorage.setItem("isLoggedIn", true)
  return redirect(redirectUrl)
  } catch (error) {
    return error.message
  }
}

export default function Login() {
  const message = useLoaderData()
  const errMessage = useActionData()
  const navigation = useNavigation()

  return (
    <div className="login-container">
      <h1>Sign in to your account</h1>
      {message && <h3 className="red">{message}</h3>}
      {errMessage && <h3 className="red">{errMessage}</h3>}
      <Form className="login-form" method="post" replace>
        <input
          type="email"
          placeholder="Email"
          required
          name="email"
        />
        <input
          type="password"
          placeholder="Password"
          required
          name="password"
        />
        <button disabled={navigation.state ==="submitting"}>{navigation.state ==="idle" ? "Log In" : "Logging in...."}</button>
      </Form>
    </div>
  );
}
