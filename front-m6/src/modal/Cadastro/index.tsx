        import React, { useContext, useState } from "react";
        import {
        FormControl,
        FormLabel,
        Input,
        Button,
        Stack,
        Flex,
        Text,
        useDisclosure,
        Modal,
        ModalOverlay,
        ModalContent,
        ModalHeader,
        ModalCloseButton,
        ModalBody,
        ModalFooter
        } from "@chakra-ui/react";
        import { apiProvider } from "../../context/clienteContext";

        export const RegisterModal: React.FC = () => {
            const { isOpen, onOpen, onClose } = useDisclosure();
            const [registerSuccess, setRegisterSuccess] = useState(false);

            const [credentials, setCredentials] = useState({

            email: "",
            nome_completo: "",
            password: "",
            telefone: "",
            });
            const [error, setError] = useState("");
        
            const handleCredentialsChange = (
            event: React.ChangeEvent<HTMLInputElement>
            ) => {
            const { name, value } = event.target;
            setCredentials((prevCredentials) => ({
                ...prevCredentials,
                [name]: value,
            }));
            };
        
            const { onSubmitRegisterUser } = useContext(apiProvider);
        
            const handleRegisterClick = async () => {
            try {
                if (credentials.email === "") {
                setError("Por favor, digite um email válido.");
                return;
                }
                if (credentials.nome_completo === "") {
                setError("Por favor, digite seu nome completo.");
                return;
                }
                if (credentials.telefone === "") {
                setError("Por favor, digite seu número de telefone.");
                return;
                }
                if (credentials.password === "") {
                setError("Por favor, digite uma senha.");
                return;
                }
                await onSubmitRegisterUser(credentials);
                onClose();
                setRegisterSuccess(true);
                setTimeout(() => {
                    window.location.reload();
                  }, 2000);

            } catch (error) {
                setError("Ocorreu um erro ao tentar cadastrar o usuário.");
            }
            };

    return (
        <>
        <Flex flexDirection="column" alignItems="center" as="header" h={50}>
            <Button width={75} colorScheme="teal" border={5} onClick={onOpen} marginLeft={5}>
            Cadastrar
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
            <ModalHeader>Register</ModalHeader>
            <ModalCloseButton />
            <ModalBody pb={6}>
                <Stack spacing={4}>
                <FormControl id="nome_completo">
                    <FormLabel>Nome Completo</FormLabel>
                    <Input
                    type="nome_completo"
                    name="nome_completo"
                    value={credentials.nome_completo}
                    onChange={handleCredentialsChange}
                    placeholder="Digite seu nome completo"
                    />
                </FormControl>
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
                <FormControl id="telefone">
                    <FormLabel>Telefone</FormLabel>
                    <Input
                    type="telefone"
                    name="telefone"
                    value={credentials.telefone}
                    onChange={handleCredentialsChange}
                    placeholder="Digite seu telefone"
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
                <Button colorScheme="blue" mr={3} onClick={handleRegisterClick}>
                Register
                </Button>

            </ModalFooter>
            </ModalContent>
        </Modal>
        </>
    );
    };
    