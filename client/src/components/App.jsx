import {useEffect, useState} from "react";

export default function App() {
  const [users, setUsers] = useState([]);
  const [loadedUsers, setLoadedUsers] = useState(false);

  // Make an API call to the Flask server
  useEffect(() => {
    // Handle unmounting
    const abortController = new AbortController();
    const signal = abortController.signal;

    fetch('/api/users', {signal})
      .then(response => response.json())
      .then(data => {
        setUsers(data);
      })
      .catch(error => {
        console.error('Error fetching users:', error);
      })
      .finally(() => {
        setLoadedUsers(true);
      });

    return () => {
      abortController.abort();
    };
  }, []);

  // Loop through the users and display them
  return (
    <div>
      <h1>Registered Users sdfgsdfg:</h1>
      {loadedUsers ? users.map(user => <h3 key={user.id}>{user.username}</h3>) : 'Loading...'}
    </div>
  );
}