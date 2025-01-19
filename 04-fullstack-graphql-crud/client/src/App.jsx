import './App.css'
import {useQuery, useMutation, gql} from "@apollo/client";

const GET_USER = gql`
query GetUsers{
  getUsers{
    id
    age
    name
    isMarried
  }
}
`;

function App() {
  const {data, error, loading} = useQuery(GET_USER);

  if(loading) return <p>Loading...</p>;

  if(error) return <p>Error: {error.message}</p>;

  return (
    <>
    <h1>Users</h1>
    <div>
      {" "}
      {data.getUsers.map(user => (
        <div>
          <p>Name: {user.name}</p>
          <p>Age: {user.age}</p>
          <p>Is this user married: {user.isMarried ? "Yes" : "No"}</p>
        </div>
      ))} {" "}
    </div>
    </>
    )
}

export default App
