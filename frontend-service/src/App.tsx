import { Toaster } from 'react-hot-toast';
import './App.css';
import Routes from "./routes";

function App() {
  return (
    <div className="App">
        <Routes />
        <Toaster />
    </div>
  );
}

export default App;
