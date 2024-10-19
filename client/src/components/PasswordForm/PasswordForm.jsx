// // PasswordForm.js
// import { useContext, useState } from 'react';
// import { Web3Context } from '../Web3Context';

// export default function PasswordForm () {
//   const { contract, account } = useContext(Web3Context);
//   const [site, setSite] = useState('');
//   const [password, setPassword] = useState('');
//   const [isLoading, setIsLoading] = useState(false);

//   const handleSubmit = async (e) => {
//     setIsLoading(true);
//     e.preventDefault();
//     try {
//       // In a real app, you'd encrypt the password before sending it to the blockchain
//       await contract.methods.addPassword(site, password).send({ from: account });
//       alert('Password added successfully');
//       setSite('');
//       setPassword('');
//     } catch (error) {
//       console.error('Error adding password:', error);
//     }
//   };

//   return (
//     <div>
//      {contract ? (
//     <form onSubmit={handleSubmit}>
//       <input 
//         type="text" 
//         value={site} 
//         onChange={(e) => setSite(e.target.value)} 
//         placeholder="Site"
//         required 
//       />
//       <input 
//         type="password" 
//         value={password} 
//         onChange={(e) => setPassword(e.target.value)} 
//         placeholder="Password"
//         required 
//       />
//       <button type="submit" disabled={isLoading}>{isLoading ? "Loading..." : "Add Password"}</button>
//     </form>) : (<p>Loading Contract</p>)}
//     </div>
//   );
// };

// PasswordForm.js
import { useContext, useState } from 'react';
import { Web3Context } from '../Web3Context';

export default function PasswordForm() {
  const { contract, account } = useContext(Web3Context);
  const [site, setSite] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!contract || !account) {
      alert('Please connect your wallet');
      return;
    }

    setIsLoading(true);
    try {
      // Estimate gas first
      const gasEstimate = await contract.methods.addPassword(site, password)
        .estimateGas({ from: account });
      
      // Add some buffer to the gas estimate
      const gas = Math.round(Number(gasEstimate) * 1.2);
      
      // Send transaction with explicit gas limit
      await contract.methods.addPassword(site, password)
        .send({ 
          from: account,
          gas: gas, // Explicit gas limit
          gasPrice: '20000000000' // 20 gwei
        });
      
      alert('Password added successfully');
      setSite('');
      setPassword('');
    } catch (error) {
      console.error('Error adding password:', error);
      alert('Failed to add password. Check console for details.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input 
        type="text" 
        value={site} 
        onChange={(e) => setSite(e.target.value)} 
        placeholder="Site"
        required 
        disabled={isLoading}
      />
      <input 
        type="password" 
        value={password} 
        onChange={(e) => setPassword(e.target.value)} 
        placeholder="Password"
        required 
        disabled={isLoading}
      />
      <button type="submit" disabled={isLoading || !contract || !account}>
        {isLoading ? 'Adding...' : 'Add Password'}
      </button>
    </form>
  );
}