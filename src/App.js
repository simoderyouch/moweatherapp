
import './App.css';
import './global.css';

import Sidebar from './components/Sidebar/Sidebar'
import Mainweather from './components/main-weather/Mainweather'

function App() {


  return (
    <div className='main-app'>

      <Sidebar />

      <Mainweather />
    </div>

  );
}

export default App;
