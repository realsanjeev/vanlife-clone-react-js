# Vanlife Clone Overview

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
The `<Form>` element behaves like its native HTML counterpart, so you don't need to manage state as you would with React’s virtual DOM elements.

### URL Methods in Native JavaScript
The `new URL(request.url)` constructor returns a URL object, allowing access to properties like `location`, `searchParams`, and `params`.

### `defer` and `<Await>`
The `defer` keyword is used to render HTML content before order for a better user experience.

### References
- [React Router Dom - Documentation](https://reactrouter.com/en/main/start/overview)
- [Miragejs - Documentation](https://miragejs.com/docs/getting-started/introduction/)
- [Firebase - Documentation](https://firebase.google.com/docs/web/setup)
- [React Icons - Documentation](https://react-icons.github.io/react-icons/)