import { BrowserRouter, Routes, Route } from "react-router-dom"

import LandingPage from "./Pages/LandingPage"
import ListingsPage from "./Pages/ListingsPage"
import AccountPage from "./Pages/AccountPage"



const App = () => {
  return (
    <BrowserRouter>
         
         <Routes>
             <Route path="/" element={<LandingPage/>}/>
             <Route path="/listing" element={<ListingsPage/>}/>
             <Route path="/account" element={<AccountPage/>}/>
         </Routes>
    
    </BrowserRouter>
  )
}

export default App