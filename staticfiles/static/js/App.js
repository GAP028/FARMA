import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HeaderDrawer from '../../../blog/static/react/components/HeaderDrawer';
import Header from '../../../blog/static/react/components/Header';
import SubMenu from '../../../blog/static/react/pages/SubMenu';
import FaceMask from '../../../blog/static/react/pages/FaceMask';
import BufferCap from '../../../blog/static/react/pages/BufferCap';
import Equipment from '../../../blog/static/react/pages/Equipment';
import Ventilator from '../../../blog/static/react/pages/Ventilator';
import HandWash from '../../../blog/static/react/pages/HandWash';
import Sanitizer from '../../../blog/static/react/pages/Sanitizer';
import Bandages from '../../../blog/static/react/pages/Bandages';
import BPMachine from '../../../blog/static/react/pages/BPMachine';
import HomePage from '../../../blog/static/react/pages/HomePage';
import Footer from '../../../blog/static/react/components/Footer';



function App() {
return (
    <Router>
      <Header/>
      <HeaderDrawer/>
        <Routes>
          <Route path="/" element={<HomePage />} /> 
          <Route path="/submenu" element={<SubMenu />} />
          <Route path="/facemask" element={<FaceMask />} />
          <Route path="/buffercap" element={<BufferCap />} />
          <Route path="/equipment" element={<Equipment />} />
          <Route path="/ventilator" element={<Ventilator />} />
          <Route path="/handwash" element={<HandWash />} />
          <Route path="/sanitizer" element={<Sanitizer />} />
          <Route path="/bandages" element={<Bandages />} />
          <Route path="/bpmachine" element={<BPMachine />} />
        </Routes>
        <Footer/>
    </Router>
  
  );
}
export default App;

