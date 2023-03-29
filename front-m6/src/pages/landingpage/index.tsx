import { Box, Image, Flex, Heading, Text } from "@chakra-ui/react";
import { RegisterModal } from "../../modal/Register";
import { LoginModal } from "../../modal/Login";
import { TypingAnimation } from "../../assets/animation";
import homemCelular from "../landingpage/HomemCelular.png"
export const LandingPage = () => {
 
  return (
    <>
      <Flex display="flex" alignItems="center" h={700} justifyContent="center">
        <Box
          sx={{
            "@media screen and (max-width: 600px)": {
              display: "none",
            },
          }}
        >
          <Image src={homemCelular} h={450} alt="Dan Abramov" />
        </Box>

        <Box
          textAlign="center"
          h={500}
          paddingTop={20}
          w={550}
          boxShadow="2px 2px 0px rgba(0,0,0,0.1), 4px 4px 0px rgba(0,0,0,0.1), 6px 6px 0px rgba(0,0,0,0.1), 8px 8px 0px rgba(0,0,0,0.1), 10px 10px 0px rgba(0,0,0,0.1)"
          border="2px solid #000000"
          borderRadius="md"
        >
          <Heading as="h1" size="4xl" mb={8} fontFamily="cursive">
            <Text color="red">Bem-vindo </Text> à webAgenda
          </Heading>
          <TypingAnimation />
          <Flex
            display="flex"
            justifyContent="center"
            h={260}
            alignItems="center"
          >
            <LoginModal />
            <RegisterModal />
          </Flex>
        </Box>
      </Flex>
    </>
  );
};

export default LandingPage;
