import { createContext, useState, useEffect } from "react";

// Create the context
export const UserContext = createContext();

const UserDetailsProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  console.log(user);
  // Initialize state with null or the saved user data from localStorage
  // const [user, setUser] = useState(() => {
  //   const savedUser = localStorage.getItem("user");
  //   return savedUser ? JSON.parse(savedUser) : null;
  // });

  // Persist user data to localStorage whenever it changes
  // useEffect(() => {
  //   if (user) {
  //     localStorage.setItem("user", JSON.stringify(user));
  //   }
  // }, [user]);

  // Clear data when user logs out or becomes null
  // useEffect(() => {
  //   if (user === null) {
  //     localStorage.removeItem("user");
  //   }
  // }, [user]);

  // Handler to update the user and persist it
  // const userHandler = (data) => {
  //   setUser(data);
  //   localStorage.removeItem("user");
  //   console.log("User updated:", data);
  // };

  const [results, setResults] = useState(null);

  // Provide user data and handler to the children
  return (
    <UserContext.Provider
      value={{
        user,
        setUser,
        results,
        setResults,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default UserDetailsProvider;
