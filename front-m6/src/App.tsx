import { ApiProvider } from "./context/apiContext";
import React from "react";
import { ChakraProvider } from "@chakra-ui/react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Browser } from "./Routes/route";
import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faUser,
  faPhone,
  faEnvelope,
  faEdit,
} from "@fortawesome/free-solid-svg-icons";

const App: React.FC = () => {
  library.add(faUser, faPhone, faEnvelope, faEdit);
  return (
    <ChakraProvider>
      <ApiProvider>
        <Browser />
        <ToastContainer />
      </ApiProvider>
    </ChakraProvider>
  );
};

export default App;
