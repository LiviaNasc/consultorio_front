import { Fragment }from 'react'
import { Route, BrowserRouter, Routes, Navigate } from 'react-router-dom';
//import useAuth from "../hooks/useAuth";
import Home from '../pages/Home';
import Signin from '../pages/SingIn';
import Signup from '../pages/Signup';

const Private = ({ Item }) => {
    const signed = true;
    return signed > 0 ? <Item /> : <Signin />;
  };

const RoutesApp = () => {
  return (
    <BrowserRouter>
        <Fragment>
            <Routes>
                <Route exact path="/home" element={<Private Item={Home} />} />
                <Route path="/" element={<Signin />} />
                <Route  path="/signup" element={<Signup />} />
                <Route path="/signup/paciente" element={<Signup />} />
                <Route path="/signup/medico" element={<Signup />} />
                <Route path="*" element={<Signin />} />
            </Routes>
        </Fragment>
    </BrowserRouter>
  )
}

export default RoutesApp;