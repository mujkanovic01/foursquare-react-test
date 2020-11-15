import logo from '../logo.svg';
import './App.css';
import {useState, useEffect} from 'react';
import {usePosition} from '../hooks/usePosition/usePosition';
import {getPlaces} from '../api/api'

function App() {
  const {latitude, longitude, error} = usePosition();
  const [data, setData] = useState({});
  console.log(latitude, longitude, error);

  useEffect(async () => {
    async function fetchData() {
      let client_id = "DZKU5Z5IQHL3RYJBGT1RPIVTMRF552VIBFK0QIQ3ZUXZX0FK"
      let client_secret = "SKTXXHXM5101HZHGRLLSMOCH1GKTF00DC3ZFMNO41W1NGFIN"
      let url = `https://api.foursquare.com/v2/venues/explore?client_id=${client_id}&client_secret=${client_secret}&v=20190425&ll=${latitude},${longitude}&radius=10000&query=coffee&limit=10`;

      try {
          fetch(url, {
              method: 'GET',
          }).then(response => response.json())
          .then(data => setData(data));
      } catch (error) {
          console.error(error);
      }
    }
    
    fetchData();
  }, []);

  console.log(data);

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
