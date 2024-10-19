// Auth.js
import { useContext, useState } from 'react';
import { Web3Context } from '../Web3Context';

export default function Auth() {
  const { account } = useContext(Web3Context);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handleAuth = () => {
    if (account) {
      setIsAuthenticated(true);
    } else {
      alert("Please connect your wallet");
    }
  };

  return (
    <div>
      {isAuthenticated ? (
        <p>Authenticated as: {account}</p>
      ) : (
        <button onClick={handleAuth}>Authenticate</button>
      )}
    </div>
  );
};
