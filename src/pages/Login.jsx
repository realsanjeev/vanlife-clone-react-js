import React from "react";
import {
  useLoaderData,
  Form,
  useActionData,
  useNavigation,
  useNavigate,
  useSearchParams
} from "react-router-dom";
import { loginUser } from "../api";

export async function loader({ request }) {
  // Just return the message, don't try to redirect here
  return new URL(request.url).searchParams.get("message") || null
}

export async function action({ request }) {
  const formData = await request.formData()
  const email = formData.get("email")
  const password = formData.get("password")
  try {
    await loginUser({ email, password })
    localStorage.setItem("isLoggedIn", "true")
    // Return success status instead of redirect
    return { success: true }
  } catch (error) {
    return { error: error.message }
  }
}

export default function Login() {
  const message = useLoaderData()
  const actionData = useActionData()
  const navigation = useNavigation()
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()

  // Redirect if already logged in
  React.useEffect(() => {
    const isLoggedIn = localStorage.getItem("isLoggedIn")
    if (isLoggedIn === "true") {
      navigate("/host", { replace: true })
    }
  }, [navigate])

  // Handle successful login with navigation
  React.useEffect(() => {
    if (actionData?.success) {
      const redirectTo = searchParams.get("redirectTo") || "/host"
      navigate(redirectTo, { replace: true })
    }
  }, [actionData, navigate, searchParams])

  return (
    <div className="login-container">
      <h1>Sign in to your account</h1>
      {message && <h3 className="red">{message}</h3>}
      {actionData?.error && <h3 className="red">{actionData.error}</h3>}
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
        <button disabled={navigation.state === "submitting"}>{navigation.state === "idle" ? "Log In" : "Logging in...."}</button>
      </Form>
    </div>
  );
}
