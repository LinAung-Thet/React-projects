import './App.css'
import {useQuery, useMutation, gql} from "@apollo/client";
import { useState } from "react";

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
query GetUserByID($id: ID!){
  getUserById(id: $id){
    id
    age
    name
    isMarried
  }
}
`;

const CREATE_USER = gql`
  mutation CreateUser($name: String!, $age: Int!, $isMarried: Boolean!){
  createUser(name: $name, age: $age, isMarried: $isMarried) {
    name
    isMarried
  }
}
`;

function App() {
  const [newUser, setNewUser] = useState({});

  const {
    data: getUsersData, 
    error: getUsersError, 
    loading: getUsersLoading
  } = useQuery(GET_USER);

  const {data: getUserByIdData, 
    loading: getUserByIdLoading
  } = useQuery(GET_USER_BY_ID, {
    variables: {id: "2"}
  });

  const [createUser] = useMutation(CREATE_USER)
  
  if(getUsersLoading) return <p>Loading...</p>;

  if(getUsersError) return <p>Error: {getUsersError.message}</p>;

  const handleCreateUser = async () => {
    console.log(newUser);
    createUser({
      variables: {
        name: newUser.name,
        age: Number(newUser.age),
        isMarried: false,
      },
    });
  };

  return (
    <>
      <h1>Users</h1>
      <div>
        <input
          placeholder="Name..."
          onChange={(e) =>
            setNewUser((prev) => ({ ...prev, name: e.target.value }))
          }
        />
        <input
          placeholder="Age..."
          type="number"
          onChange={(e) =>
            setNewUser((prev) => ({ ...prev, age: e.target.value }))
          }
        />
        <button onClick={handleCreateUser}> Create User</button>
      </div>
      <div>
        {getUserByIdLoading ? (
          <p>Loading user ...</p>
        ) : (
          <>
            <h1>Chosen User</h1>
            <p>{getUserByIdData.getUserById.name}</p>
            <p>{getUserByIdData.getUserById.age}</p>
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
