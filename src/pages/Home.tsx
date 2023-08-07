import {useNavigate} from 'react-router-dom'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Button from "react-bootstrap/Button";

function Home() {
  const navigate = useNavigate();

  const signinhandle=(e: any) => {
    e.preventDefault;
    navigate('/signin')

    
  }
  return (
    <>
      <Navbar bg="dark" data-bs-theme="dark">
        <Container>
          <Navbar.Brand href="#home">Lecture</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link href="#home">Home</Nav.Link>
            <Nav.Link href="#a">About</Nav.Link>
            <Nav.Link href="#">Management</Nav.Link>
          </Nav>
        </Container>
      </Navbar>
      <div className="container" style={{marginTop:'220px'}}>
        <h3 style={{ textAlign: "center"}}>
          Welcome To Our Lecture Management App...
        </h3>
        <br/>
        <Button variant='success' style={{marginLeft:'430px',marginRight:'70px'}} onClick={signinhandle}>Sign In</Button>
        <Button variant='warning'>Sign Up</Button>
      </div>
    </>
  );
}

export default Home;