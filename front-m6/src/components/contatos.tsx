import { useState, useEffect } from "react";
import {
  Box,
  Button,
  Card,
  CardBody,
  CardFooter,
  Flex,
  Heading,
} from "@chakra-ui/react";
import { api } from "../services/request";
import { iContact, iUser } from "../interfaces/dashboard";
import { Navigate } from "react-router-dom";
import { userClienteContext } from "../context/apiContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEdit,
  faEnvelope,
  faPhone,
  faUser,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import { EditarModal } from "../modal/Edit";

type FilteredContactsFn = (filter: string) => iContact[];

interface Props {}

export function Contatos(props: Props) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [user, setUser] = useState<iUser>();
  const [redirect, setRedirect] = useState(false);
  const [filteredContacts, setFilteredContacts] = useState<iContact[]>([]);

  const { contacts, setContacts, handleDeleteContato } = userClienteContext();
  const { setCurrentContact, currentContact, getNew } = userClienteContext();

  useEffect(() => {
    async function apiGet() {
      const token = localStorage.getItem("token");
      if (!token) {
        return setRedirect(true);
      }
      try {
        const res = await api.get<iUser>("/contact", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setContacts(res.data.contatos);
        setFilteredContacts(res.data.contatos);
        setUser(res.data);
      } catch (error) {
        console.error(error);
      }
    }
    apiGet();
  }, []);

  function handleOpenModal() {
    setIsModalOpen(true);
  }

  
  function handleCloseModal() {
    setIsModalOpen(false);
  }


  if (redirect) {
    return <Navigate to="/" />;
  }

  return (
    <>
      <Heading marginBottom={25} fontFamily="fantasy">Lista de contatos</Heading>

      <Box
        display="flex"
        flexWrap="wrap"
        overflow="hidden"
        justifyContent="center"
        alignItems="center"
      >
        {contacts?.map((contato: any) => (
          <Card
            key={contato.id}
            style={{
              overflow: "hidden",
              padding: "10px",
              margin: "5px",
              minWidth: "200px",
              maxWidth: "400px",
              fontSize: "clamp(1rem, 2vw, 2rem)",
            }}
          >
            <CardBody>
              <Box>
                <Flex style={{ fontSize: "15px", marginBottom: "10px" }}>
                  <FontAwesomeIcon
                    icon={faUser}
                    style={{ marginRight: "5px" }}
                  />
                  {contato.nome_completo}
                </Flex>
                <Flex style={{ fontSize: "12px", marginBottom: "10px" }}>
                  <FontAwesomeIcon
                    icon={faPhone}
                    style={{ marginRight: "10px" }}
                  />
                  {contato.telefone}
                </Flex>
                <Flex fontSize="0.8rem">
                  <FontAwesomeIcon
                    icon={faEnvelope}
                    style={{ marginRight: "10px" }}
                  />
                  {contato.email}
                </Flex>
              </Box>
            </CardBody>
            <CardFooter>
              <Button
                onClick={() => handleDeleteContato(contato.id)}
                style={{ marginRight: "10px" }}
              >
                <FontAwesomeIcon
                  icon={faTrash}
                  style={{ marginRight: "10px" }}
                />
                Excluir
              </Button>
              <Button onClick={() => handleOpenModal()}>
                <FontAwesomeIcon
                  icon={faEdit}
                  style={{ marginRight: "10px", width: "10px" }}
                />
                Editar
              </Button>
            </CardFooter>
          </Card>
        ))}
      </Box>

      {user && (
        <EditarModal
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          contato={user}
        />
      )}
    </>
  );
}
