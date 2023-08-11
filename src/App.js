import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import EmpListing from './EmpListing';
import EmpCreate from './EmpCreate';
import EmpDetail from './EmpDetail';
import EmpEdit from './EmpEdit';
import SignIn from './component/auth/SignIn';

function App() {
  return (
    <div className="container">
      <h1 className="text-center">Welcome to TMA Employee System</h1>
      <BrowserRouter>
        <Routes>
        <Route path='/' element={<SignIn />}></Route>
          <Route path='/employee/list' element={<EmpListing />}></Route>
          <Route path='/employee/create' element={<EmpCreate />}></Route>

          <Route path='/employee/detail/:empid' element={<EmpDetail />}></Route>
          <Route path='/employee/edit/:empid' element={<EmpEdit />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );

}

export default App;
