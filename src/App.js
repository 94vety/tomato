import './App.css';
import { Routes, Route } from "react-router-dom";
import Login from './components/Login/index';
import Home from './components/Home/index';
import Onchard from './components/Onchard/index';
import Manage from './components/Manage/index';
import SelfStudent from './components/SelfStudent/index';
import Records from './components/Records';

function App() {
  return (
    <Routes>
      <Route path='/' element={<Login />} />
      <Route path='/home' element={<Home />} />
      <Route path='/onchard' element={<Onchard />} />
      <Route path='/manage' element={<Manage />} />
      <Route path='/selfstudent' element={<SelfStudent />} />
      <Route path='/records' element={<Records />} />
    </Routes>
  );
}

export default App;
