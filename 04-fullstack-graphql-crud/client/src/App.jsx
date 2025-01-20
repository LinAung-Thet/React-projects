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

const GET_USER_BY_ID = gql`
query GetUsersByID($id: ID!){
  getUsersById(id: $id){
    id
    age
    name
    isMarried
  }
}
`;

const CREATE_USER = gql`
  mutation CreateUser($name: String!, $age: Int!, $isMarried: Boolean){
  createUser(name: $name, Age: $age, isMarried: $isMarried) {
    name
    isMarried
  }
}
`;

function App() {
  const {
    data: getUsersData, 
    error: getUsersError, 
    loading: getUsersLoading
  } = useQuery(GET_USER);

  const {data: getUsersByIdData, 
    error: getUsersByIdError, 
    loading: getUsersByIdLoading
  } = useQuery(GET_USER_BY_ID, {
    variables: {id: "2"}
  });

  const [createUser] = useMutation(CREATE_USER)
  
  if(getUsersLoading) return <p>Loading...</p>;

  if(getUsersError) return <p>Error: {getUsersError.message}</p>;

  return (
    <>
      <h1>Users</h1>

      <div>
        {getUsersByIdLoading ? (
          <p>Loading user ...</p>
        ) : (
          <>
            <h1>Chosen User</h1>
            <p>{getUsersByIdData.getUsersById.name}</p>
            <p>{getUsersByIdData.getUsersById.age}</p>
          </>
        )}
      </div>
      <div>
        {" "}
        {getUsersData.getUsers.map(user => (
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
