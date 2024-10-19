import { Web3Provider } from './components/Web3Context';
import Auth from './components/Auth/Auth';
import PasswordForm from './components/PasswordForm/PasswordForm';
import PasswordList from './components/PasswordList/PasswordList';

function App() {
  return (
    <Web3Provider>
      <div className="App">
        <h1>Blockchain Password Manager</h1>
        <Auth />
        <PasswordForm />
        <PasswordList />
      </div>
    </Web3Provider>
  );
}

export default App;
