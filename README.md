# Vanlife Clone Overview

## Getting Started

### Prerequisites
- Node.js and npm (or Bun for faster package management)
- Firebase account and project

### Environment Setup

1. **Create a Firebase project**:
   - Go to [Firebase Console](https://console.firebase.google.com/)
   - Create a new project or use an existing one
   - Enable Firestore Database

2. **Configure environment variables**:
   ```bash
   # Copy the example environment file
   cp .env.example .env
   ```

3. **Add your Firebase credentials to `.env`**:
   - In Firebase Console, go to Project Settings > General
   - Scroll down to "Your apps" and select your web app (or create one)
   - Copy the configuration values and paste them into your `.env` file:
   ```
   REACT_APP_FIREBASE_API_KEY=your_api_key_here
   REACT_APP_FIREBASE_AUTH_DOMAIN=your_project_id.firebaseapp.com
   REACT_APP_FIREBASE_PROJECT_ID=your_project_id
   REACT_APP_FIREBASE_STORAGE_BUCKET=your_project_id.appspot.com
   REACT_APP_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
   REACT_APP_FIREBASE_APP_ID=your_app_id
   REACT_APP_FIREBASE_MEASUREMENT_ID=your_measurement_id
   ```

### Installation and Running

If you're using npm as your package manager, simply replace `npm` with `bun`. Bun is significantly faster than npm.

1. Install the dependencies:
    ```bash
    bun install
    ```
2. Start the webserver:
    ```bash
    bun run start
    ```


## React Router Concepts

This project utilizes the data APIs introduced in React Router v6.4+. Here is a breakdown of the key concepts used:

### 1. Data Loading (Loaders)
Loaders allow you to fetch data *before* a route renders. This prevents "waterfall" loading states and ensures data is ready when the component mounts.

-   **`loader` function**: Defined in the route definition. It receives `params` and `request` objects.
-   **`useLoaderData` hook**: Accesses the data returned by the loader in the component.

```jsx
// Route definition
<Route 
  path="vans/:id" 
  element={<VanDetail />} 
  loader={async ({ params }) => {
    return await getVan(params.id);
  }} 
/>

// Component
export default function VanDetail() {
  const van = useLoaderData();
  return <h1>{van.name}</h1>;
}
```

### 2. Data Mutation (Actions)
Actions handle form submissions and data mutations. They work with the HTML `<Form>` element (or React Router's `<Form>`) to handle standard HTTP methods (POST, PUT, DELETE).

-   **`action` function**: Handles the request.
-   **`<Form>` component**: A wrapper around the native HTML form that prevents full page reloads and submits to the route's action.

```jsx
// Route definition
<Route path="login" element={<Login />} action={loginAction} />

// Component
<Form method="post">
  <input name="email" />
  <input name="password" type="password" />
  <button>Log in</button>
</Form>
```

### 3. Navigation & Hooks
React Router provides several hooks to manage navigation and URL state.

-   **`useParams`**: Retrieves dynamic URL parameters (e.g., `:id`).
    ```js
    const { id } = useParams(); // { id: "123" }
    ```
-   **`useSearchParams`**: Manages query string parameters (e.g., `?type=simple`).
    ```js
    const [searchParams, setSearchParams] = useSearchParams();
    const type = searchParams.get("type");
    ```
-   **`useLocation`**: Returns the current location object, useful for passing state between routes.
-   **`useNavigate`**: Programmatically navigate to different routes.
-   **`<Link>` & `<NavLink>`**: Components for declarative navigation. `<NavLink>` knows when it is active.

### 4. Route Structure
-   **Nested Routes**: Routes can be nested inside parent routes. The parent renders the child using the `<Outlet />` component.
-   **Layout Routes**: A parent route that provides a common UI (like a header/footer) for its children.

```jsx
<Route path="host" element={<HostLayout />}>
  <Route index element={<Dashboard />} />
  <Route path="income" element={<Income />} />
</Route>
```

### 5. Advanced Features
-   **`defer` & `<Await>`**: Used for streaming data. You can defer slow data requests so the UI renders immediately with a loading state (via `<Suspense>`) while the data loads in the background.
-   **`requireAuth`**: A custom utility (often used in loaders) to protect routes. If a user isn't logged in, it redirects them to the login page.
-   **`errorElement`**: A component that renders if an error occurs during loading, action execution, or rendering.

### 6. Utilities
-   **`new URL(request.url)`**: A native JavaScript API often used in loaders to parse the URL and extract search parameters.

## References
- [Bun Installation](https://bun.sh/docs/installation)
- [React Router Dom - Documentation](https://reactrouter.com/en/main/start/overview)
- [Miragejs - Documentation](https://miragejs.com/docs/getting-started/introduction/)
- [Firebase - Documentation](https://firebase.google.com/docs/web/setup)
- [React Icons - Documentation](https://react-icons.github.io/react-icons/)