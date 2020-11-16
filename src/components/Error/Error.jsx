import Card from 'react-bootstrap/Card'
import './Error.css'
function Error() {
    return(
        <Card className="error">
        <Card.Body style={{ color: 'black' }}>
            <Card.Title className="error-title">Unable to access your location</Card.Title>
            <Card.Text>
            Unfortunatelly, our app needs permission to access your location. We promise not to misuse your personal infromation in any way. <br/> <br/> Thank you for your trust!
            </Card.Text>
        </Card.Body>
        </Card>
    );
}

export default Error;