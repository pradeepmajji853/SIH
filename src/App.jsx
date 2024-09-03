import './App.css'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from './Layouts/Layout';
import Home from './pages/Home';
import Encrypt from './pages/Encrypt';
import Decrypt from './pages/Decrypt';


function App() {

  return (
    <>
     <Router>
      <Routes>
        
        <Route
          path="/"
          element={
            <Layout>
              <Home/>
            </Layout>
          }
        />
 <Route
          path="/encrypt"
          element={
            <Layout>
              <Encrypt />
            </Layout>
          }
        />



        <Route
          path="/decrypt"
          element={
            <Layout>
              <Decrypt />
            </Layout>
          }
        />
        


      </Routes>
    </Router>
      
    </>
  )
}

export default App
