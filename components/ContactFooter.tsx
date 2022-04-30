import { VStack, Text, Link } from '@chakra-ui/react'

const ContactFooter = () => {

  return (
    <VStack
      alignItems="center"
      p={6}
      fontWeight={600}
      textAlign="center"
    >
      <Text color="primary.500">
        Copyright &copy; 2022 MinImage
      </Text>
    </VStack>
  )
}

export default ContactFooter
