import NavLink from './Navlink'

import { VStack, Flex, Text } from '@chakra-ui/react'

type Props = {
  name: string
  href: string
  submenu: {
    name: string
    href: string
  }[]
}

const Submenu = (props: Props) => {
  const { name, href, submenu } = props

  return (
    <Flex role="group">
      <Text
        fontWeight={600}
        fontSize="1.1rem"
        p="10px 0"
        color="primary.500"
        _hover={{
          textDecoration: 'none',
          cursor: 'pointer',
        }}
      >
        {name}
      </Text>
      <VStack
        fontSize="1.1rem"
        display="none"
        position="absolute"
        mt="45px"
        pt="15px"
        shadow="md"
        spacing="0"
        backgroundColor="white.500"
        transition="0.3s"
        opacity="0"
        _groupHover={{
          display: 'flex',
          alignItems: 'flex-start',
          transition: '0.3s',
          opacity: '1',
        }}
      >
        {submenu.map((item, i) => (
          <NavLink
            key={i}
            name={item.name}
            href={href + item.href}
            submenuItem={true}
          />
        ))}
      </VStack>
    </Flex>
  )
}

export default Submenu
