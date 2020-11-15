import {useState, useEffect} from 'react';

export const usePosition = () => {
    const [position, setPosition] = useState({});
    const [error, setError] = useState(null);
  
    const setCoordinates = ({coords}) => {
      setPosition({
        latitude: coords.latitude,
        longitude: coords.longitude
      });
    };  
  
    const onError = (err) => {
      setError(err.message);
    }
  
    useEffect(() => {
      const geo = navigator.geolocation;
      if (!geo) {
        setError('User denied Geolocation');
        return;
      }
  
      let pos = geo.getCurrentPosition(setCoordinates, onError);
      
      return pos;
    }, []);
  
    return {...position, error}
  }