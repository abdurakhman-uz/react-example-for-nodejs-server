import { useToast, Wrap, WrapItem } from "@chakra-ui/react";

function Message(status, message) {
  const toast = useToast();

  return (
    <Wrap>
      <WrapItem>
        {toast({
          title: `${status} toast`,
          status: status,
          isClosable: true,
        })}
      </WrapItem>
    </Wrap>
  );
}

export default Message
