import React from 'react'
import Navbar from './Navbar'
import ContactFooter from './ContactFooter'
import { Container, Flex } from '@chakra-ui/react'

type Props = {
  children: React.ReactNode
  pageHero?: {
    text: string
  }
}

const Layout = (props: Props) => {
  const { children } = props

  return (
    <Flex minHeight="100vh" flexDirection="column">
      <Navbar />
      <Container maxW="container.lg" flexGrow={1} my={{ base: 10, md: 20 }}>
        {children}
      </Container>
      <ContactFooter />
    </Flex>
  )
}

export default Layout
