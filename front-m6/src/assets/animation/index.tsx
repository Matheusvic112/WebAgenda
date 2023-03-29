import { useState, useEffect } from "react";
import { Text } from "@chakra-ui/react";

export const TypingAnimation = () => {
  const [text, setText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [loopNum, setLoopNum] = useState(0);
  const [typingSpeed, setTypingSpeed] = useState(150);

  const messages = ["Todos os seus contatos salvos na webAgenda"];

  useEffect(() => {
    let timer: string | number | NodeJS.Timeout | undefined;
    const handleType = () => {
      const currentIndex = loopNum % messages.length;
      const currentMessage = messages[currentIndex];

      if (!isDeleting) {
        setText(currentMessage.substring(0, text.length + 1));
      } else {
        setText(currentMessage.substring(0, text.length - 1));
      }

      setTypingSpeed(isDeleting ? 30 : 150);

      if (!isDeleting && text === currentMessage) {
        setTypingSpeed(2000);
        setIsDeleting(true);
      } else if (isDeleting && text === "") {
        setIsDeleting(false);
        setLoopNum(loopNum + 1);
      }
    };

    timer = setTimeout(handleType, typingSpeed);

    return () => clearTimeout(timer);
  }, [text, isDeleting, loopNum, typingSpeed, messages]);

  return (
    <Text fontSize="3x1" fontWeight="bold" textAlign="center">
      {text}
      <Text as="span" animation="blink 0.7s infinite" display="inline">
        .
      </Text>
    </Text>
  );
};
