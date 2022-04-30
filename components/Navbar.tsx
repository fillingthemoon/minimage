import { useEffect } from 'react'

import NextLink from 'next/link'

import Submenu from './Submenu'
import SubmenuAccordion from './SubmenuAccordion'
import NavLink from './Navlink'

import {
  Box,
  Container,
  Flex,
  HStack,
  IconButton,
  useDisclosure,
  Accordion,
  AccordionItem,
} from '@chakra-ui/react'
import { HamburgerIcon, CloseIcon } from '@chakra-ui/icons'

const links: any[] = [
  // {
  //   name: 'Home',
  //   href: '/',
  // },
  // {
  //   name: 'FAQ',
  //   href: '/faq',
  // },
]

type Props = {
  isMobileMenuOpen: boolean,
}

const MobileMenu = (props: Props) => {
  const { isMobileMenuOpen } = props

  useEffect(() => {
    const bodyElm = document.getElementsByTagName('body')
    bodyElm[0].setAttribute(
      'style',
      `overflow:${isMobileMenuOpen ? 'hidden' : 'none'};`
    )
  }, [isMobileMenuOpen])

  return isMobileMenuOpen ? (
    <Box display={{ lg: 'none' }} position="absolute" width="100vw">
      <Box backgroundColor="white.500">
        <Accordion allowToggle fontSize="1.1rem">
          {links.map((link, i) => {
            return !link.submenu ? (
              // Accordion navbar item
              <AccordionItem key={i}>
                <NavLink
                  name={link.name}
                  href={link.href}
                  accordion={true}
                />
              </AccordionItem>
            ) : (
              // Accordion item with a submenu containing other items
              <AccordionItem>
                <SubmenuAccordion
                  key={i}
                  name={link.name}
                  href={link.href}
                  submenu={link.submenu}
                />
              </AccordionItem>
            )
          })}
        </Accordion>
      </Box>
      <Box backgroundColor="rgba(0,0,0,0.6)" height="100vh" />
    </Box>
  ) : null
}

const Navbar = () => {
  const {
    isOpen: isMobileMenuOpen,
    onOpen: onMobileMenuOpen,
    onClose: onMobileMenuClose,
  } = useDisclosure()

  return (
    <Box bg="white.500" shadow="md" position="sticky" zIndex={2} top={0}>
      <Box px={4} py={4}>
        <Container maxW="container.lg">
          <Flex h={16} align="center" justify={'space-between'}>
            {links.length > 0 &&
              <IconButton
                icon={
                  isMobileMenuOpen ? (
                    <CloseIcon fontSize="18px" />
                  ) : (
                    <HamburgerIcon fontSize="25px" />
                  )
                }
                aria-label={'Open Menu'}
                display={{ lg: 'none' }}
                onClick={isMobileMenuOpen ? onMobileMenuClose : onMobileMenuOpen}
                backgroundColor="white.500"
                color="primary.500"
                transition="0.2s"
                _hover={{
                  transform: 'scale(1.05)',
                  transition: '0.2s',
                }}
              />
            }
            <NextLink href="/" passHref>
              <Box _hover={{ cursor: 'pointer' }} color="primary.500" fontSize="1.6rem" letterSpacing={3}>
                <Box as="span" fontWeight="400">
                  MIN
                </Box>
                <Box as="span" fontWeight="800">
                  Image
                </Box>
              </Box>
            </NextLink>
            <HStack
              spacing={10}
              display={{ base: 'none', lg: 'flex' }}
              fontSize="1.1rem"
            >
              {links.map((link, i) => {
                return !link.submenu ? (
                  // Normal navbar item
                  <NavLink key={i} name={link.name} href={link.href} />
                ) : (
                  // Navbar item with a submenu containing other items
                  <Submenu
                    key={i}
                    name={link.name}
                    href={link.href}
                    submenu={link.submenu}
                  />
                )
              })}
            </HStack>
          </Flex>
        </Container>
      </Box>

      <MobileMenu isMobileMenuOpen={isMobileMenuOpen} />
    </Box>
  )
}

export default Navbar
