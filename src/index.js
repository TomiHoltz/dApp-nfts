import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { HashRouter, Routes, Route } from "react-router-dom"; import { ChakraProvider } from "@chakra-ui/react";
import { Web3ReactProvider } from "@web3-react/core";
import { getLibrary } from "./config/web3";

ReactDOM.render(
  <React.StrictMode>
    <HashRouter>
      <ChakraProvider>
        <Web3ReactProvider getLibrary={getLibrary}>
          <Routes>
            <Route path="/" element={<App />} />
          </Routes>
        </Web3ReactProvider>
      </ChakraProvider>
    </HashRouter>
  </React.StrictMode>,
  document.getElementById("root")
);