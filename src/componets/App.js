import './App.css';
import React, {useState} from 'react';
import ResponsiveAppBar from "./appBar/ResponsiveAppBar";
import ModalWindow from "./modalWindow/ModalWindow";
import Sandwich from "./sandwich/Sandwich";

function App() {
    const [openModalWindow, setOpenModalWindow] = useState(false);

  return (
    <div className="App">
        <ResponsiveAppBar openModalWindow={setOpenModalWindow} />
        <Sandwich />
        <ModalWindow openModalWindow={openModalWindow} setOpenModalWindow={setOpenModalWindow} />
    </div>
  );
}

export default App;
