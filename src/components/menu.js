import React from "react"
import { Link, graphql, useStaticQuery } from "gatsby"
import {
  Container,
  Flex,
  FlexList,
  Space,
  NavLink,
  Button,
  InteractiveIcon,
  Nudge,
  VisuallyHidden,
} from "./ui"
import {
  mobileNavOverlay,
  mobileNavLink,
  desktopHeaderNavWrapper,
  mobileHeaderNavWrapper,
  mobileNavSVGColorWrapper,
} from "./header.css"
import BrandLogo from "./brand-logo"

const Header = () => {
  const data = useStaticQuery(graphql`
    {
      contentfulNavigationMenu(contentful_id: { eq: "BtIJpF1q3Td9pT0lkzipx" }) {
        internalName
        menuItems {
          groupName
          featuredPages {
            pageName
            slug
          }
        }
      }
    }
  `)

  const { contentfulNavigationMenu: headerMenu } = data
  if (!headerMenu) {
    return null
  }

  return (
    <header>
      <Container className={desktopHeaderNavWrapper}>
        <Space size={2} />
        <Flex variant="spaceBetween">
          <NavLink to="/">
            <VisuallyHidden>Home</VisuallyHidden>
            <BrandLogo />
          </NavLink>
          <nav>
            <FlexList gap={4}>
              {headerMenu.menuItems.map((item, index) => {
                const firstPage = item.featuredPages?.[0] // ✅ safely get first item
                if (!firstPage) return null
                return (
                  <li>
                    <NavLink to={`/${firstPage.slug}`}>{item.groupName}</NavLink>
                  </li>
                )
              })}
            </FlexList>
          </nav>
        </Flex>
      </Container>
    </header>
  )
}

export default Header

