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
  Link,
} from "../components/ui"
import "../../public/css/grid.css"

const { documentToHtmlString } = require("@contentful/rich-text-html-renderer")

export default function Products(props) {
  const { productData } = props.data

  return (
    <Layout>
      
      <Section>
        <Container>
          <flex gap={4} variant="responsive">
            {productData ? (
              <div class="content">
                <h1>{productData.headline}</h1>
                <div class="content-wrapper">
                  {productData.subline}
                  <Section>
                    <Container>
                      {productData.products.length > 0 && (
                        <div className="grid-container">
                          {productData.products.map(product => (
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
                    </Container>
                  </Section>
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
  const { products } = props.data
  return <SEOHead {...products} />
}
export const query = graphql`
  {
  productData: contentfulProductTableComponent(contentful_id:{eq:"5YZ9fKKF3Vg9bNV7x3Xl08"}) {
    headline
    subline
    products {
      id
      name
      contentful_id
      description {
        raw
      }
      featuredImage {
        gatsbyImageData(layout: CONSTRAINED, width: 400)
        url
        description
        alt
        title
      }
    }
  }
}`;