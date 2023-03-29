import {
  Box,
  Button,
  Flex,
  Heading,
  Input,
  InputGroup,
  InputLeftElement,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { FiLogOut } from "react-icons/fi";
import { Navigate } from "react-router-dom";
import { Contatos } from "../../components/contatos";
import { iUser } from "../../interfaces/dashboard";
import { NovoContatoModal } from "../../modal/newContact";

import { api } from "../../services/request";

export const Dashboard = () => {
  const [user, setUser] = useState<iUser>({} as iUser);
  const [redirect, setRedirect] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [searchValue, setSearchValue] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      return setRedirect(true);
    }

    api
      .get("/contact", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        setUser(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.reload();
  };

  const onCloseModal = () => {
    setIsOpen(false);
  };


  if (redirect) {
    return <Navigate to="/" />;
  }

  return (
    <Box>
      <Flex
        as="header"
        bg="gray.800"
        px="6"
        py="4"
        alignItems="center"
        justifyContent="space-around"
      >
        <Box>
          <Heading color="white">WebAgenda</Heading>
        </Box>
        <Box>
          <Button onClick={() => setIsOpen(true)}>Criar Contato</Button>
          <NovoContatoModal isOpen={isOpen} onClose={onCloseModal} />
          <Button
            leftIcon={<FiLogOut />}
            colorScheme="red"
            onClick={handleLogout}
            marginLeft={5}
          >
            Sair
          </Button>
        </Box>
      </Flex>
      <Box
        p="6"
        display="flex"
        justifyContent="center"
        flexDirection="column"
        alignItems="center"
      >
        {user && (
          <>
            <Flex
              display="flex"
              justifyContent="center"
              flexDirection="column"
              alignItems="center"
            >
              <Heading size="md">Olá, {user.nome_completo}!</Heading>
              <Box>
                <p>E-mail: {user.email}</p>
                <p>Telefone: {user.telefone}</p>
              </Box>
              <Contatos />
            </Flex>
          </>
        )}
      </Box>
    </Box>
  );
};
