import {  useState } from "react";
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
import { EditarModalProps } from "../../interfaces/dashboard";
import { api } from "../../services/request";
import { sucessoEdit } from "../../toast";
import { userClienteContext } from "../../context/apiContext";

export function EditarModal({ isOpen, onClose }: EditarModalProps) {
  const [nomeCompleto, setNomeCompleto] = useState("");
  const [email, setEmail] = useState("");
  const [telefone, setTelefone] = useState("");
  const [selectedField, setSelectedField] = useState("");
  const { contacts, currentContact, getNew } = userClienteContext();
  async function handleEdit() {
    let body = {};
    const token = localStorage.getItem("token");
    if (selectedField === "nome_completo" && nomeCompleto) {
      body = { nome_completo: nomeCompleto };
    } else if (selectedField === "email" && email) {
      body = { email: email };
    } else if (selectedField === "telefone" && telefone) {
      body = { telefone: telefone };
    }
    try {
      await api.patch(`/contact/${currentContact?.id}`,body,{
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      sucessoEdit();
      onClose();
      getNew();
    } catch (error) {
      console.error(error);
    }
  }

  function handleFieldSelect(event: React.ChangeEvent<HTMLSelectElement>) {
    setSelectedField(event.target.value);
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Editar contato</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <FormControl>
            <FormLabel>Escolha o campo a ser editado:</FormLabel>
            <select onChange={handleFieldSelect}>
              <option value="">Selecione um campo</option>
              <option value="nome_completo">Nome Completo</option>
              <option value="email">E-mail</option>
              <option value="telefone">Telefone</option>
            </select>
          </FormControl>
          {selectedField === "nome_completo" && (
            <FormControl>
              <FormLabel>Nome Completo</FormLabel>
              <Input
                onChange={(event) => setNomeCompleto(event.target.value)}
                placeholder="Digite o novo nome do contato"
              />
            </FormControl>
          )}
          {selectedField === "email" && (
            <FormControl>
              <FormLabel>E-mail</FormLabel>
              <Input
                onChange={(event) => setEmail(event.target.value)}
                placeholder="Digite o novo email do contato"
              />
            </FormControl>
          )}
          {selectedField === "telefone" && (
            <FormControl>
              <FormLabel>Telefone</FormLabel>
              <Input
                onChange={(event) => setTelefone(event.target.value)}
                placeholder="(99)99999-9999"
              />
            </FormControl>
          )}
        </ModalBody>
        <ModalFooter>
          <Button
            colorScheme="blue"
            onClick={handleEdit}
            isDisabled={!selectedField}
          >
            Salvar
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}

