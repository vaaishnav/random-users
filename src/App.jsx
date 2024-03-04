import React, { useState, useEffect } from 'react';
import { Card, Button, Row, Col } from 'react-bootstrap';



function App() {
  const [userId, setUserId] = useState(1);
  const [user, setUser] = useState(null);
  const [bgColor, setBgColor] = useState('white');

  const apiCall = async () => {
    try {
      const response = await fetch(`https://dummyjson.com/users/${userId}`);
      const userData = await response.json();
      console.log(userData);
      setUser(userData);
    } catch (error) {
      console.error('Error fetching user:', error);
    }
  };

  useEffect(() => {
    apiCall(); 
  }, [userId]); 

  const handleButtonClick = () => {
    setUserId(prevUserId => prevUserId + 1); 
    const randomColor = '#' + Math.floor(Math.random()*16777215).toString(16);
    setBgColor(randomColor);
  };

  return (
    <>
      {user ? (
        <div className='container  p-5'>
          <Card>
            <Card.Header>Random User On Refresh</Card.Header>
            <Card.Body style={{ backgroundColor: bgColor, padding: '20px' }} >
              <div className='text-center'>
                <img className='img-responsive center-block' style={{ height: '100px', borderRadius: '50%',  }} src={user.image} alt="User Image" />
                <Card.Title>{user.firstName} {user.maidenName} {user.lastName}</Card.Title>
                <p>{user.genter}</p>
                <h2>User Details</h2>
              </div>
                


                <Row className='mt-5'>
                  <Col className='text-center'>
                    <p><b>Birth Date: </b>{user.birthDate}</p>
                    <p><b>Age: </b>{user.age}</p>
                    <p><b>Weight:</b>{user.weight}</p>
                    <p><b>Height</b>:{user.height}</p>
                  </Col>
                  
                  <Col className='text-center'>
                    <p><b>address:</b> {user.address.address}</p>
                    <p><b>Mobile Phone: </b>{user.phone}</p>
                    <p><b>Company: </b>{user.company.name}</p>
                    <p><b>job TitLe: </b>{user.company.title}</p>
                    <p><b>Email: </b>{user.email}</p>

                    </Col>
                  
                </Row>
                 
              
              <Card.Text>
                
              </Card.Text>
              <Button className='text-center' variant="primary" onClick={handleButtonClick}>Refresh</Button>
            </Card.Body>
          </Card>
        </div>
      ) : (
        <div>Loading...</div>
      )}
    </>
  );
}

export default App;