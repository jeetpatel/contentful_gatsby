import * as React from "react"
import { graphql } from "gatsby"
import Layout from "../components/layout"
import * as sections from "../components/sections"
import Fallback from "../components/fallback"
import SEOHead from "../components/head"
import { GatsbyImage, getImage } from "gatsby-plugin-image"
import * as styles from "../components/about-hero.css"
import Modal from "../components/Modal"
import {
  Box,
  Container,
  Heading,
  Section,
  Text,
  Space,
  FlexList,
  Icon,
  Link,
} from "../components/ui"
import "../../public/css/grid.css"

const { documentToHtmlString } = require("@contentful/rich-text-html-renderer")

function SmartImage({ image, className }) {
  if (!image) return null

  const gatsbyImg = getImage(image.gatsbyImageData)
  return gatsbyImg ? (
    <GatsbyImage image={gatsbyImg} alt={image.alt || ""} className={className} />
  ) : (
    <img
      src={image.url}
      alt={image.alt || ""}
      className={className}
      loading="lazy"
      width="100"
    />
  )
}


export default function Products(props) {
  const { productData } = props.data
  const pageContent = productData.pageContent || {};
  const extraSection = productData.extraSection || {};

  return (
    <Layout>

      <Section>
        <Container>
          <flex gap={4} variant="responsive">
            {productData ? (
              <div class="content">
                <h1>{pageContent.headline}</h1>
                <div class="content-wrapper">
                  {pageContent.subline}
                  {pageContent.products.length > 0 && (
                    <div className="grid-container">
                      {pageContent.products.map(product => (
                        <div key={product.id} className="grid-item">
                          <GatsbyImage
                            alt={product.featuredImage.alt}
                            image={getImage(product.featuredImage.gatsbyImageData)}
                            className="card-image"
                          />

                          <h3>{product.name}</h3>
                          <div className="description">
                            <div dangerouslySetInnerHTML={{ __html: documentToHtmlString(JSON.parse(product.description.raw)) }} />
                          </div>
                          <Link to={`/products/${product.contentful_id}`}>
                            View Feature
                          </Link>
                        </div>
                      ))}
                    </div>
                  )}
                  {extraSection.length > 0 && (
                    <div class="extra-section">
                      {extraSection.map(section => {
                        // Collect the three blocks into an array so we can map once
                        const blocks = [1, 2, 3].map(n => ({
                          key: `block${n}`,
                          image: section[`block${n}Image`],
                          body: section[`block${n}Body`]
                        }))
                
                        return (
                        <Section>
                          <Heading variant="subheadSmall">{section.headline}</Heading>
                          <FlexList gutter={3} variant="start" responsive wrap>
                            {blocks.map(({ key, image, body }) => (
                            <Box as="li" key={key} width="third" p={4} py={3}>
                              <SmartImage image={image} className={styles.extraSectionImage} />
                              <Space size={2} />
                              {body && (
                                <Text>
                                  {documentToHtmlString(JSON.parse(body.raw))}
                                </Text>
                              )}
                            </Box>
                          ))}
                          </FlexList>
                        </Section>
                        )
                      })}
                    </div>
                  )}
                </div>
              </div>
            ) : (
              <div>
                <h1>404 - Page not found.</h1>
                <p>Content will be added here soon.</p>
              </div>
            )}
          </flex>
        </Container>
      </Section>
    </Layout>
  )
}

export const Head = (props) => {
  const { productData } = props.data
  return <SEOHead {...productData} />
}
export const query = graphql`
  {
  productData: contentfulLandingPage(slug: {eq: "pricing"}) {
		pageName
    pageContent {
      ...productTableComponent
    }
    extraSection {
      ...extraSectionComponent
    }
  }
}
fragment extraSectionComponent on ContentfulInfoBlockComponent {
  id
  headline
  subline
  block1Image {
    alt
    url
    gatsbyImageData
  }
  block2Image {
    alt
    url
    gatsbyImageData
  }
  block3Image {
    alt
    url
    gatsbyImageData
  }
  block1Body {
    raw
  }
  block2Body {
    raw
  }
  block3Body {
    raw
  }
  colorPalette
  
}

fragment productTableComponent on ContentfulProductTableComponent {
  id
  headline
  subline
  products {
    name
    contentful_id
    description {
      raw
    }
    featuredImage {
      gatsbyImageData(layout: CONSTRAINED, width: 400)
      title
      description
    }
  }
}`;