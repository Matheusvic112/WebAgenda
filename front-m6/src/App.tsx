import React from "react";
import { ChakraProvider } from "@chakra-ui/react";
import { LoginModal } from "./modal/Login";
import { ToastContainer } from "react-toastify";
import ApiContext from "./context/clienteContext";
import "react-toastify/dist/ReactToastify.css";
import LandingPage from "./pages/landingpage";

const App: React.FC = () => {
  return (
    <ChakraProvider>
      <ApiContext>
        <LandingPage />
        <ToastContainer />
      </ApiContext>
    </ChakraProvider>
  );
};

export default App;
