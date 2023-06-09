useParams returns parameter in url 

for url: `localhost:8000\vans\:id` returns {id: 1}

`<Link to="path" state>` create a link bewtween pages. State 

`useSearchParams` is used to get search element `localhost:8000\vans?type=simple&price=search`

```
const [searchParam, setSearchParam] = useSearchParams()
const filterType = searchParam.get("type")   //return "simple"
const filterComp = searchParam.toString()   // return "type=simple&price=search"
```

`redirect` doesnot wok with server imports of `miragejs` in `react-router-dom@6.11.*` but works fine in `react-router-dom@6.4.2`

### <Form> element
`<Form>` element works in same way html dom delement works, so no need to keep track state as in react in virtal dom element.

### URL method in native js
`new URL(request.url)` returns URL object, we can access location, searchParams, params from ths native method

### defer and <Await>
`defer` is used to render HTML page before oder for better user experience