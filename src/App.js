import logo from './logo.svg';
import './App.css';
import Weatherapp from './Components/Weatherapp';

function App() {
  return (
    <div className="App">
      <Weatherapp basename="/weatherapp-react"/>
    </div>
  );
}

export default App;
