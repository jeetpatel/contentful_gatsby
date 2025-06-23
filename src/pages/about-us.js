import * as React from "react"
import { graphql } from "gatsby"
import Layout from "../components/layout"
import * as sections from "../components/sections"
import Fallback from "../components/fallback"
import SEOHead from "../components/head"
import { GatsbyImage, getImage } from "gatsby-plugin-image"
import * as styles from "../components/about-hero.css"
import {
  Box,
  ButtonList,
  Container,
  Flex,
  Heading,
  Kicker,
  Section,
  Subhead,
  Text,
} from "../components/ui"

const { documentToHtmlString } = require("@contentful/rich-text-html-renderer")

export default function About(props) {
  const { aboutPage } = props.data
  const bodyRawJson = JSON.parse(aboutPage.body.raw)
  const bodyHtml = documentToHtmlString(bodyRawJson)
  const leadership = aboutPage.body.references

  return (
    <Layout>
      <Section>
        <Container>
          <flex gap={4} variant="responsive">
            {aboutPage ? (
              <div class="content">
                <h1>{aboutPage.name}.</h1>
                <div style={{ maxWidth: "100%" }}>
                  {aboutPage.featuredImage && (
                    <Heading as="h2" className={styles.aboutHeroHeader}>
                      {aboutPage.shortDescription.shortDescription}
                    </Heading>
                  )}
                  <div class="featured-image">
                    <GatsbyImage
                      alt={aboutPage.featuredImage.alt}
                      image={getImage(aboutPage.featuredImage.gatsbyImageData)}
                      className={styles.aboutHeroImage}
                    />
                  </div>
                  <div dangerouslySetInnerHTML={{ __html: bodyHtml }} />
                  <div class="leadership-wrapper">
                    {leadership.length > 0 && (
                    <section className="mt-10">
            
                      {leadership.map(person => (
                        <div
                          key={person.contentful_id}
                          className="border rounded-xl p-5 my-6 shadow-sm">
                          <div class="avatar-image">
                            <GatsbyImage
                              alt={person.avatar.alt}
                              image={getImage(person.avatar.gatsbyImageData)}
                              className={styles.avatarImage}
                            />
                          </div>
                          <div className="italic text-sm text-gray-500">
                            {person.name && (
                              <span className="person-name"><strong>{person.name} | </strong></span>
                            )}
                            {person.location && (
                              <span class="location">{person.location}</span>
                            )}
                            {person.website && (
                              <span class="website">
                                &nbsp;<a href={person.website} target="_blank" rel="noopener noreferrer">
                                  {person.website}
                                </a>
                              </span>
                            )}
                          </div>
                          <div dangerouslySetInnerHTML={{ __html: documentToHtmlString(JSON.parse(person.bio.raw)) }} />
                        </div>
                      ))}
                    </section>
                  )}
                  </div>
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
  const { aboutPage } = props.data
  return <SEOHead {...aboutPage} />
}
export const query = graphql`
  query BusinessInfoWithPersonTopics {
    aboutPage: contentfulBusinessInfoTopic(contentful_id: { eq: "ohspi5gYQSqQdFADFTg6F" }) {
      name
      shortDescription {
        shortDescription
      }

      featuredImage {
        url
        gatsbyImageData
        title
      }

      body {
        raw
        references {
          ... on ContentfulPersonTopic {
            __typename
            ...TopicPersonFields
          }
        }
      }
    }
  }

  fragment TopicPersonFields on ContentfulPersonTopic {
    contentful_id
    name
    location
    website
    avatar {
      url
      gatsbyImageData
      description
    }
    bio {
      raw
    }
  }`;

// export const query = graphql`
//   {

//     aboutPage: contentfulBusinessInfoTopic(contentful_id: { eq: "ohspi5gYQSqQdFADFTg6F" }) {
//         name
//         shortDescription {
//           shortDescription
//         }
  
//         featuredImage {
//           url
//           description
//           title
//         }
  
//         body {
//           raw                          
          
//         }
//       }
    

    
//   }`
