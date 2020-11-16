import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {useState, useEffect} from 'react';
import CoffeeShop from '../CoffeeShop/CoffeeShop';
import Radio from '@material-ui/core/Radio';
import React from 'react';
import { usePosition } from '../../hooks/usePosition/usePosition';

function App() {
  const [position, setPosition] = useState();
  const [data, setData] = useState();
  const [coffeeShopDetails, setDetails] = useState();
  const [selectedValue, setSelectedValue] = React.useState('name');

  // Get user geolocation on component mount
  useEffect(() => {
    const geo = navigator.geolocation;
    if (!geo) {
      return 'User denied Geolocation';
    }

    geo.getCurrentPosition((coords) => {
      let position = {
        latitude: coords.coords.latitude,
        longitude: coords.coords.longitude
      }
      setPosition(position)
    }, (err) => {
      console.error(err);
    });
  }, []);

  // Callback after the position is loaded
  useEffect(() => {
    async function fetchData() {
      if(!position) return;

      // Note: should be env variables
      let client_id = "DZKU5Z5IQHL3RYJBGT1RPIVTMRF552VIBFK0QIQ3ZUXZX0FK"
      let client_secret = "SKTXXHXM5101HZHGRLLSMOCH1GKTF00DC3ZFMNO41W1NGFIN"
      let url = `https://api.foursquare.com/v2/venues/explore?client_id=${client_id}&client_secret=${client_secret}&v=20201101&ll=${position.latitude},${position.longitude}&radius=10000&query=coffee&limit=10`;

      try {
        let detailedData = new Array();
        fetch(url, {
            method: 'GET',
        }).then(response => response.json())
        .then(data => {setData(data)});

        
        /* Get all venue details with their IDs
        .then(data => {
          console.log(data);
          let coffeeshops = data.response.groups[0].items;
          let ids = new Array();
          
          
          
          let promise = new Promise((resolve, reject) => {
            coffeeshops.forEach(shop => {
              let url = `https://api.foursquare.com/v2/venues/${coffeeshops[0].venue.id}?client_id=${client_id}&client_secret=${client_secret}&v=20201101`;

              fetch(url, {
                method: 'GET',
              }).then(response => response.json())
              .then(data => {
                detailedData.push(data)
              }).catch((error) => {
                console.error(error);
              })
            })

            resolve();
          }); 

          promise.then(() => {
            //do something with the details, ex.
             setCoffeshopDetails(detailedData);
          }) 

          console.log(ids);
        }) */
      } catch (error) {
        console.error(error);
      }
    }
    
    fetchData();
  }, [position]);

  useEffect(() => {
    if(!data) return;

    console.log(data);
    let shopData = data.response.groups[0].items;
    let coffeeShops = new Array();

    shopData.forEach(shop => {
      coffeeShops.push({
        name: shop.venue.name,
        distance: shop.venue.location.distance
      });
    });

    setDetails(coffeeShops);
  }, [data])

  useEffect(() => {
    if(!coffeeShopDetails) return;

    //setStartRender("true");
  }, [coffeeShopDetails])

  const handleChange = (event) => {
    setSelectedValue(event.target.value);
    console.log(event.target.value)
  };

  return (
    <div className="App">
      <div className="App-header">
        <p style={{ margin:0 }}>Name</p>
        <Radio
          checked={selectedValue === 'name'}
          onChange={handleChange}
          value="name"
          name="radio-button-demo"
          inputProps={{ 'aria-label': 'name' }}
        />
        <Radio
          checked={selectedValue === 'distance'}
          onChange={handleChange}
          value="distance"
          name="radio-button-demo"
          inputProps={{ 'aria-label': 'distance' }}
        />
        <p style={{ margin:0 }}>Distance</p>
      </div>
      {(!coffeeShopDetails) ? (<p>loading</p>) : (
        <div className="App-body">
          {Object.keys(coffeeShopDetails).map(index => {
            return <CoffeeShop key={index} name={coffeeShopDetails[index].name} distance={coffeeShopDetails[index].distance}></CoffeeShop>
          })}
        </div>
      )}
    </div>
  );
}

export default App;
