import React, { useContext, useState } from "react";
import axios from "axios";
import {
  FormControl,FormLabel,Input,Button,Stack,Flex,Text,useDisclosure,Modal,ModalOverlay,ModalContent,ModalHeader,ModalCloseButton,ModalBody,ModalFooter
} from "@chakra-ui/react";
import { apiProvider } from "../../context/clienteContext";

export const LoginModal: React.FC = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");

  const handleCredentialsChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setCredentials((prevCredentials) => ({
      ...prevCredentials,
      [name]: value,
    }));
  };
  
  const { onSubmitLogin } = useContext(apiProvider);

  return (
    <>
      <Flex flexDirection="column"alignItems="center" as="header" h={50}>
        <Button width={75} colorScheme="teal" border={5} onClick={onOpen}>
          Login
        </Button>
      </Flex>

      <Modal
        isOpen={isOpen}
        onClose={onClose}
        initialFocusRef={React.useRef(null)}
        finalFocusRef={React.useRef(null)}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader />
          <ModalCloseButton />
          <ModalBody pb={6}>
            <Stack spacing={4}>
              <FormControl id="email">
                <FormLabel>Email</FormLabel>
                <Input
                  type="email"
                  name="email"
                  value={credentials.email}
                  onChange={handleCredentialsChange}
                  placeholder="Digite seu email"
                />
              </FormControl>
              <FormControl id="password">
                <FormLabel>Password</FormLabel>
                <Input
                  type="password"
                  name="password"
                  value={credentials.password}
                  onChange={handleCredentialsChange}
                  placeholder="Digite sua senha"
                />
              </FormControl>
              {error && <Text color="red.500">{error}</Text>}
            </Stack>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={() => onSubmitLogin(credentials, setError)}>
              Login
            </Button>
            <Button onClick={onClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};