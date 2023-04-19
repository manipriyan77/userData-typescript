import React, { useState, useEffect } from 'react';

const UserDetails = () => {
  interface UserData {
    name: {
      title: string;
      first: string;
      last: string;
    };
    email: string;
    // add other properties as needed
  }

  const [userData, setUserData] = useState<UserData>({});
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchUserData = async () => {
      const response = await fetch('https://randomuser.me/api');
      const data = await response.json();
      if (response.status === 200) {
        setLoading(false);
      }
      setUserData(data.results[0]);
      localStorage.setItem('userData', JSON.stringify(data.results[0]));
    };

    fetchUserData();
  }, []);

  const refreshUserData = async () => {
    setLoading(true);
    const response = await fetch('https://randomuser.me/api');
    const data = await response.json();
    if (response.status === 200) {
      setLoading(false);
    }
    setUserData(data.results[0]);
    localStorage.setItem('userData', JSON.stringify(data.results[0]));
  };

  return (
    <div>
      {!loading ? (
        <div>
          <h1>{`${userData.name?.title} ${userData.name?.first} ${userData.name?.last}`}</h1>
          <p>{userData.email}</p>
          <button onClick={refreshUserData}>Refresh</button>
        </div>
      ) : (
        <h1>loading...</h1>
      )}
    </div>
  );
};

export default UserDetails;
