// PasswordList.js
import { useContext, useEffect, useState } from 'react';
import { Web3Context } from '../Web3Context';

export default function PasswordList () {
  const { contract, account } = useContext(Web3Context);
  const [passwords, setPasswords] = useState([]);

  useEffect(() => {
    const fetchPasswords = async () => {
      if (contract && account) {
        const result = await contract.methods.getPasswords().call({ from: account });
        setPasswords(result);
      }
    };

    fetchPasswords();
  }, [contract, account]);

  return (
    <ul>
      {passwords.map((password, index) => (
        <li key={index}>
          Site: {password.site}, Password: {password.encryptedPassword}
        </li>
      ))}
    </ul>
  );
};
