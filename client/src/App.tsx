import { useEffect, useState } from "react"
import { PropertyModel } from "./models/Property";
import { getAllProperties } from "./api/Api";
import Property from "./components/Property";
import { Button, Col, Container, Row } from "react-bootstrap";
import AddPropertyDialog from "./components/AddPropertyDialog";



const App = () => {

  const [properties, setProperties] = useState<PropertyModel[]>([]);

  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    async function loadProperties() {
      try {
        const data = await getAllProperties();
        setProperties(data);
      } catch (error) {
        alert(error);
        console.error(error);
      }      
    }
    loadProperties()
  }, [])
  


  return (
    <Container>

      <Button onClick={()=>{setShowModal(true)}}>Upload Property</Button>

      {showModal && <AddPropertyDialog onDissmiss={() => setShowModal(false)}/>}
      
       <Row xs={1} md={2} xl={3} className="g-4" >
       
        {
          properties.map((property)=>{
  
            return(
              <Col key={property._id}>
                  <Property  details={property}/>
              </Col>
            )
          })
        }
       
       </Row>

    </Container>
  )
}

export default App