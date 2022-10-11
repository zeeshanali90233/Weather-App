
import Header from './Components/header';

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Layout } from './Components/Layout';
import { About } from './Components/About';

function App() {

  return (
    <div>
      <Router>
      <Header title="Weather" searchBar={true}/>
        <Routes>
          <Route path="/about" element={<About/>} />    
        <Route path="/" element={<Layout />}>
        </Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
