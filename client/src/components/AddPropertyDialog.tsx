import { Button, Col, Form, Modal, Row } from "react-bootstrap"


interface AddPropertyDialogProps {
    onDissmiss: () => void
}

const indianStates = [
    "Andhra Pradesh",
    "Arunachal Pradesh",
    "Assam",
    "Bihar",
    "Chhattisgarh",
    "Goa",
    "Gujarat",
    "Haryana",
    "Himachal Pradesh",
    "Jharkhand",
    "Karnataka",
    "Kerala",
    "Madhya Pradesh",
    "Maharashtra",
    "Manipur",
    "Meghalaya",
    "Mizoram",
    "Nagaland",
    "Odisha",
    "Punjab",
    "Rajasthan",
    "Sikkim",
    "Tamil Nadu",
    "Telangana",
    "Tripura",
    "Uttar Pradesh",
    "Uttarakhand",
    "West Bengal"
  ];
  
 
  

const AddPropertyDialog = ({onDissmiss}:AddPropertyDialogProps) => {
  return (
    <Modal show onHide={onDissmiss}>

        <Modal.Header closeButton>

            <Modal.Title>Upload Property</Modal.Title>

        </Modal.Header>



        <Modal.Body>
            <Form>
            

                    <Form.Group className="mb-3" controlId="formGridAddress1">
                        <Form.Label>Address (please obtain it from google maps or other)</Form.Label>
                        <Form.Control placeholder="1234 Main St" />
                    </Form.Group>

                    <Row className="mb-5">
                        <Form.Group as={Col} controlId="formGridCity">
                        <Form.Label>City</Form.Label>
                        <Form.Control />
                        </Form.Group>

                        <Form.Group as={Col} controlId="formGridState">
                        <Form.Label>State</Form.Label>
                        <Form.Select defaultValue="Choose...">
                            {
                                indianStates.map(state => <option>{state}</option>)
                            }
                        </Form.Select>
                        </Form.Group>

                        <Form.Group as={Col} controlId="formGridZip">
                        <Form.Label>Zip</Form.Label>
                        <Form.Control />
                        </Form.Group>
                    </Row>


                    <Row className="mb-3">
                    <Form.Group controlId="formFileMultiple" className="mb-3">
                        <Form.Label>2D images</Form.Label>
                        <Form.Control type="file" multiple />
                    </Form.Group>
                    </Row>


                    <Row className="mb-3">
                    <Form.Group controlId="formFileMultiple" className="mb-3">
                        <Form.Label>Panaroma images (optional)</Form.Label>
                        <Form.Control type="file" multiple />
                    </Form.Group>
                    </Row>

                     
                    <Row className="mb-3">
                    <Form.Group controlId="formFileMultiple" className="mb-3">
                        <Form.Label>Virtual Tour link (optional)</Form.Label>
                        <Form.Control type="text" placeholder="url"/>
                    </Form.Group>
                    </Row>


                    
                   <Row>
                    <Form.Group className="mb-3" controlId="formGridBuyType">
                        <Form.Label> Are you looking to sell, rent or other?</Form.Label>
                        <Form.Control placeholder="Sell" />
                    </Form.Group>
                    </Row>

                    <Row>
                    <Form.Group className="mb-3" controlId="formGridBuyType">
                        <Form.Label>Property Type (Apartment, House, etc)</Form.Label>
                        <Form.Control placeholder="House" />
                    </Form.Group>
                    </Row>


                    <Row>
                    <Form.Group as={Col} className="mb-3">
                         <Form.Label>Enter the sqft of the property..</Form.Label>
                        <Form.Control placeholder="1000" />
                    </Form.Group>
                    </Row>


                    <Row>
                    <Form.Group as={Col} className="mb-3">
                         <Form.Label>Enter the price/sqft of the property..</Form.Label>
                        <Form.Control placeholder="1000" />
                    </Form.Group>
                    </Row>


                    <Row>
                    <Form.Group as={Col} className="mb-3">
                         <Form.Label>Total Price</Form.Label>
                        <Form.Control placeholder="1000" />
                    </Form.Group>
                    </Row>

                    <Row>
                    <Form.Group as={Col} className="mb-3">
                         <Form.Label>Emi</Form.Label>
                        <Form.Control placeholder="1000" />
                    </Form.Group>
                    </Row>


                    <Row>
                    <Form.Group as={Col} className="mb-3">
                         <Form.Label>Total Bedrooms</Form.Label>
                        <Form.Control placeholder="2" />
                    </Form.Group>

                    <Form.Group as={Col} className="mb-3">
                         <Form.Label>Total Bathrooms</Form.Label>
                        <Form.Control placeholder="2" />
                    </Form.Group>
                    </Row>


                    <Row>
                    <Form.Group as={Col} className="mb-3">
                         <Form.Label>Owner's Name</Form.Label>
                        <Form.Control />
                    </Form.Group>


                    <Form.Group as={Col} className="mb-3">
                         <Form.Label>Phone</Form.Label>

                         <Form.Control/>

                    </Form.Group>
                    </Row>
                     
                         
                    <Row>
                    <Form.Group as={Col} className="mb-3">

                        <Form.Label>Email</Form.Label>

                        <Form.Control/>

                    </Form.Group>
                    </Row>



                    <Button type="submit">Upload Property</Button>

            </Form>
        </Modal.Body>

    </Modal>   
  )
}

export default AddPropertyDialog