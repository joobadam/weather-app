import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Page1 from './Page1';
import Page2 from './Page2';
import Page3 from './Page3';
import BackgroundVideo from './components/BackgroundVideo';


function App() {
  return (
    <div className="container">
      <BackgroundVideo />
    <Router>
      <Routes>
        <Route path="/" element={<Page1/>} />
        <Route path="/add" element={<Page2/>} />
        <Route path="/city/:city" element={<Page3/>} />
        </Routes>
    </Router>
    </div>
  );
}

export default App;

