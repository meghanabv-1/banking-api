import React from 'react';
import { ToastContainer } from "react-toastify";

import Header from "./components/common/Header";
import Routes from './routes';

function App() {
  return (
    <div className="container-fluid">
      <Header />
      <Routes/>
      <ToastContainer autoClose={3000} hideProgressBar />
    </div>
  );
}

export default App;
