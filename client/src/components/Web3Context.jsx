// Web3Context.js
import { createContext, useState, useEffect } from 'react';
import Web3 from 'web3';
import PropTypes from 'prop-types';
import PasswordManagerContract from '../contracts/PasswordManager.json';

export const Web3Context = createContext();

export function Web3Provider({ children }){
  const [web3, setWeb3] = useState(null);
  const [contract, setContract] = useState(null);
  const [account, setAccount] = useState(null);

  useEffect(() => {
    const initWeb3 = async () => {
        // const Web3 = require('web3');    
        const web3Instance = new Web3(new Web3.providers.HttpProvider("http://127.0.0.1:7545"));
        try {
          // Use the new method to request account access
          const accounts = await web3Instance.eth.getAccounts();
          
          const networkId = await web3Instance.eth.net.getId();
          const networkIdWithoutSuffix = String(networkId).slice(0,4);
          const deployedNetwork = PasswordManagerContract.networks[networkIdWithoutSuffix];
          const contractInstance = new web3Instance.eth.Contract(
            PasswordManagerContract.abi,
            deployedNetwork && deployedNetwork.address
          );
    
          console.log("Account:", accounts[0]);
          console.log("Network ID:", networkIdWithoutSuffix);
          console.log("Deployed Network:", deployedNetwork);
          console.log("Contract ABI:", PasswordManagerContract.abi);
          console.log("Contract Address:", deployedNetwork?.address);
    
          setWeb3(web3Instance);
          setContract(contractInstance);
          setAccount(accounts[0]);
        } catch (error) {
          console.error("User denied account access", error);
        }
    };
    
    initWeb3();
  }, []);

  return (
    <Web3Context.Provider value={{ web3, contract, account }}>
      {children}
    </Web3Context.Provider>
  );
};

Web3Provider.propTypes = {
  children: PropTypes.node.isRequired,
};
