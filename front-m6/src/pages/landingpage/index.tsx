import { Box, Button, Flex, Heading, Text } from "@chakra-ui/react";
import { RegisterModal } from "../../modal/Cadastro";
import { LoginModal } from "../../modal/Login";

export const LandingPage = () => {
  return (<>
    <Flex display="flex" alignItems="center" h={700}  justifyContent="center">

        
    <Box textAlign="center" paddingTop={20}w={450} border="2px solid #000000"
    >
      <Heading as="h1" size="4xl" mb={8}>
        Bem-vindo à webAgenda
      </Heading>
      <Text fontSize="xl" mb={16}>
        Sua agenda online!
      </Text>
      <Flex display="flex" justifyContent="center">
        
      <LoginModal/>
      <RegisterModal/>
      </Flex>
    </Box>
    </Flex>
  </>
  );
};

export default LandingPage;
