import { useContext, useState } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Button,
  FormControl,
  FormLabel,
  Input,
} from "@chakra-ui/react";

import { userClienteContext } from "../../context/apiContext";
import { api } from "../../services/request";
import { createContact } from "../../toast";
import { IModalProps } from "../../interfaces/dashboard";

export function NovoContatoModal({ isOpen, onClose }: IModalProps) {
  const [nomeCompleto, setNomeCompleto] = useState("");
  const [email, setEmail] = useState("");
  const [telefone, setTelefone] = useState("");
  const { currentContact, getNew } = userClienteContext();

  async function handleAddContato(onClose: () => void) {
    try {
      const token = localStorage.getItem("token");

      await api.post(
        "/contact",
        {
          nome_completo: nomeCompleto,
          email: email,
          telefone: telefone,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setNomeCompleto("");
      setTelefone("");
      setEmail("");
      createContact();
      onClose();
      getNew();
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Novo Contato</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <FormControl>
            <FormLabel>Nome Completo</FormLabel>
            <Input
              onChange={(event) => setNomeCompleto(event.target.value)}
              placeholder="Digite o Nome Completo"
              defaultValue={currentContact?.nome_completo}
            />
          </FormControl>
          <FormControl>
            <FormLabel>E-mail</FormLabel>
            <Input
              onChange={(event) => setEmail(event.target.value)}
              placeholder="Digite o Email"
              defaultValue={currentContact?.email}
            />
          </FormControl>
          <FormControl>
            <FormLabel>Telefone</FormLabel>
            <Input
              onChange={(event) => setTelefone(event.target.value)}
              placeholder="Digite o telefone"
              defaultValue={currentContact?.telefone}
            />
          </FormControl>
        </ModalBody>
        <ModalFooter>
          <Button colorScheme="blue" onClick={() => handleAddContato(onClose)}>
            Salvar
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
