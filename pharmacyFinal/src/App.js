import React from 'react';
import store from './store'
import {BrowserRouter,Routes,Route} from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css'
import NavBar from './components/Header/NavBar'
import Container from './components/Hero/Container'
import {Provider} from 'react-redux'
import Login from './components/forms/Login'
import SignUp from './components/forms/SignUp'
import AddMedicine from './components/forms/addMedicine'
import AddPharmacy from './components/forms/AddPharmacy'
import AfterLog from './components/forms/AfterLog'
import SearchResult from './components/info/SearchResult'
import Users from './components/info/Users'



function App() {

  return (
    <BrowserRouter>
  <Provider store={store}>
  <div className="App">
    {/* <NavBar /> */}
    <Routes>
    
      <Route path="/"  element={<Container />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signUp" element={<SignUp />} />
      <Route path="/medicine" element={<AddMedicine />} />
      <Route path="/pharmacy" element={<AddPharmacy />} />
      <Route path="/result" element={<SearchResult  />} />
      <Route path="/info" element={<Users />} />
      <Route path="/hello" element={<AfterLog />} />

    </Routes>
    </div>
    </Provider>
    </BrowserRouter>
  );
}

export default App

