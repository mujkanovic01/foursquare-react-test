import Card from 'react-bootstrap/Card'
import './CoffeeShop.css'
import placeholder from './sample.jpg'
function CoffeeShop(props) {
    return(
        <Card>
        <Card.Img className="image" variant="top" src={placeholder}/>
        <Card.Body style={{ color: 'black' }}>
            <Card.Title>{props.name}</Card.Title>
            <Card.Text>
            Some quick example text to build on the card title and make up the bulk of
            the card's content.
            </Card.Text>
            <Card.Text className="secondary-text">Price: $$  </Card.Text>
            <Card.Text className="secondary-text">Distance: {props.distance}</Card.Text>
        </Card.Body>
        </Card>
    );
}

export default CoffeeShop;