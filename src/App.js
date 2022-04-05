import { ethers } from 'ethers';
import { useEffect, useState } from 'react';
import './App.css'
import abi from './contract/TestABI.json'

function App() {
  const [account, setAccount] = useState('')
  const [balance, setBalance] = useState('')
  const [solidityAddress, setSolidityAddress] = useState('0xE4c8b79F07Ce569B89Ccacfa91a1968BC7423AA1')
  const [txt, setTxt] = useState('')
  const [show, setShow] = useState('')
  const [tempProvider, setTempProvider] = useState(null)
  const [tempSigner, setTempSigner] = useState(null)
  const [contract, setContract] = useState(null)

  useEffect(() => { 
    const ConnectWallet = async () => {
      if (typeof window.ethereum !== 'undefined') {
        console.log('MetaMask is installed!');
        const account = await window.ethereum.request({ method: 'eth_requestAccounts' })
        const tempProvider = new ethers.providers.Web3Provider(window.ethereum)
        const tempSigner = tempProvider.getSigner()
        const contract = new ethers.Contract(solidityAddress, abi, tempSigner)
        const balance = await tempProvider.getBalance(account[0]);
        const balanceInEther = ethers.utils.formatEther(balance);

        setAccount(account[0])
        setBalance(balanceInEther)
        setTempProvider(tempProvider)
        setTempSigner(tempSigner)
        setContract(contract)
      }
   }
   ConnectWallet()
   }, [])


   const ChangeText = async () => { 
      const tx = await contract.setMessage(txt)
      console.log("Add :-", tx)
    }

    const ShowMessage = async () => { 
        const msg = await contract.getMessage()
        console.log("Show :-", msg)
        setShow(msg)
    }

  return (
    <div className="App">
      <p>Account Address :- { account ? account : '000xxxx000000xxx00' }</p>
      <p>Balance :- { balance ? balance : '0.00' }</p>
      <hr/>
      <h1>{show}</h1>
      <br/>
      <input type="text" placeholder="Type message" value={txt} onChange={(e) => setTxt(e.target.value)} />
      <button onClick={ChangeText}>Change Message</button>
      <button onClick={ShowMessage}>Show Message</button>
    </div>
  );
}

export default App;
