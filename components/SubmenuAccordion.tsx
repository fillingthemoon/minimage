import NavLink from './Navlink'

import {
  Box,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
} from '@chakra-ui/react'

type Props = {
  name: string
  href: string
  submenu: {
    name: string
    href: string
  }[]
}

const SubmenuAccordion = (props: Props) => {
  const { name, href, submenu } = props

  return (
    <>
      <AccordionButton py={4} px={10} _hover={{ backgroundColor: "gray.100" }}>
        <Box
          fontWeight={600}
          fontSize="1.1rem"
          flex="1"
          textAlign="left"
          color="primary.500"
          _hover={{
            textDecoration: 'none',
            cursor: 'pointer',
          }}
        >
          {name}
        </Box>
        <AccordionIcon color="primary.500" />
      </AccordionButton>
      <AccordionPanel
        p="10px 0"
        backgroundColor="white.500"
        display="flex"
        flexDirection="column"
        alignItems="flex-start"
        fontSize="1.1rem"
      >
        {submenu.map((item, j: number) => (
          <NavLink
            key={j}
            name={item.name}
            href={href + item.href}
            accordion={true}
            submenuItem={true}
          />
        ))}
      </AccordionPanel>
    </>
  )
}

export default SubmenuAccordion
