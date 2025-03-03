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

### `useParams` Hook
The `useParams` hook retrieves URL parameters. For example, given the URL `localhost:8000/vans/:id`, it returns `{ id: 1 }`.

### `<Link>` Component
The `<Link>` component creates navigation links between pages and can pass state between them:

```jsx
<Link to="path" state={someState}>Link Text</Link>
```

### `useSearchParams` Hook
The `useSearchParams` hook is used to handle query parameters in the URL. For example, for the URL `localhost:8000/vans?type=simple&price=search`:

```javascript
const [searchParams, setSearchParams] = useSearchParams();
const filterType = searchParams.get("type");   // returns "simple"
const filterString = searchParams.toString();  // returns "type=simple&price=search"
```

### Redirect Issues
`redirect` does not work with server imports of `miragejs` in `react-router-dom@6.11.*` but functions correctly in `react-router-dom@6.4.2`.

### `<Form>` Element
The `<Form>` element behaves like its native HTML counterpart, so you don't need to manage state as you would with React's virtual DOM elements.

### URL Methods in Native JavaScript
The `new URL(request.url)` constructor returns a URL object, allowing access to properties like `location`, `searchParams`, and `params`.

### `defer` and `<Await>`
The `defer` keyword is used to render HTML content before data loads for a better user experience.

## References
- [Bun Installation](https://bun.sh/docs/installation)
- [React Router Dom - Documentation](https://reactrouter.com/en/main/start/overview)
- [Miragejs - Documentation](https://miragejs.com/docs/getting-started/introduction/)
- [Firebase - Documentation](https://firebase.google.com/docs/web/setup)
- [React Icons - Documentation](https://react-icons.github.io/react-icons/)