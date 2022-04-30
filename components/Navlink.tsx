import NextLink from 'next/link'
import { Link } from '@chakra-ui/react'

type Props = {
  name: string
  href: string
  submenuItem?: boolean
  accordion?: boolean
}

const NavLink = ({ name, href, submenuItem, accordion }: Props) => {
  return (
    <NextLink href={href} passHref>
      <Link
        {...!submenuItem && { fontWeight: 600 }}
        display="flex"
        py={accordion ? 4 : 2}
        px={accordion && submenuItem ? 14 : submenuItem ? 4 : accordion ? 10 : 0}
        {...(submenuItem || accordion) && { width: '100%' }}
        color={'primary.500'}
        borderBottom="3px solid transparent"
        _hover={{
          textDecoration: 'none',
          backgroundColor: (submenuItem || accordion) && 'gray.100',
          borderColor: !(submenuItem || accordion) && 'primary.500',
        }}
      >
        {name}
      </Link>
    </NextLink>
  )
}

export default NavLink
