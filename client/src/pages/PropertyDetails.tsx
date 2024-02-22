import { useLocation } from "react-router-dom"
import { PropertyModel } from "../models/Property";
import {  Container, Tab, Tabs } from "react-bootstrap";
import Carou from "../components/Carou";
import PropertyText from "../components/PropertyText";




const PropertyDetails = () => {
  

  const location = useLocation();

  const property = location.state as PropertyModel;

 


  return (
    <Container> 

        <Tabs
          defaultActiveKey="profile"
          id="justify-tab-example"
          className="mb-3"
          justify
        >
          <Tab eventKey="profile" title="Home">

            <Carou details={property}/>

            <PropertyText details={property}/>
            
          </Tab>


          <Tab eventKey="home" title="Panaroma View">
            
          </Tab>


          <Tab eventKey="longer-tab" title="Virtual Tour">
          
          </Tab>


        </Tabs>
      
      

      


  
  </Container>
  )
}

export default PropertyDetails