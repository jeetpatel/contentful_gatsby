import * as React from "react"
import { graphql } from "gatsby"
import Layout from "../components/layout"
import * as sections from "../components/sections"
import Fallback from "../components/fallback"
import SEOHead from "../components/head"
const { documentToHtmlString } = require("@contentful/rich-text-html-renderer")


// export default function Component() {
//   return <Layout>
//     <div>
//       <h1>Terms of Service</h1>
//       <p>Content will be added here soon.</p>
//     </div>
//   </Layout>
// }

export default function Terms(props) {
  // Check if data exists
  if (!props?.data?.contentfulBusinessInfoTopic) {
    return (
      <Layout>
        <h1>404 - Page not data found.</h1>
      </Layout>
    )
  }
  const { contentfulBusinessInfoTopic } = props.data
  const bodyRawJson = JSON.parse(contentfulBusinessInfoTopic.body.raw)
  const bodyHtml = documentToHtmlString(bodyRawJson)
  return (
    <Layout>
        <div>
        <h1>{contentfulBusinessInfoTopic?.name}</h1>
        <div dangerouslySetInnerHTML={{ __html: bodyHtml }} />
        </div>
    </Layout>
  )
}

export const Head = (props) => {
  const { contentfulBusinessInfoTopic } = props.data
  return <SEOHead {...contentfulBusinessInfoTopic} />
}

export const query = graphql` 
  {
  contentfulBusinessInfoTopic(contentful_id: {eq: "4a85oxws8g4rbfB44CkBCU"}) {
    id
    name
    body{
      raw
    }
    contentful_id
  }
}
`