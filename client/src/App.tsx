
import { BrowserRouter, Routes, Route } from "react-router-dom"
import Listings from "./pages/Listings"
import PropertyDetails from "./pages/PropertyDetails"


const App = () => {

  return (
       <BrowserRouter>
             
            <Routes>
              <Route path="/" element={<Listings/>}/>
              <Route path="/details" element={<PropertyDetails/>}/>
            </Routes>
       
       </BrowserRouter>
  )
}

export default App