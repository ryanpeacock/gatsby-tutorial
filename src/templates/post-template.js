import React from "react"
import Layout from "../components/layout"
import { graphql } from "gatsby"

const PostTemplate = ({ data: post }) => {
  const {
    frontmatter: { title },
    html,
  } = post.markdownRemark
  return (
    <Layout>
      <div>
        <h1>{title}</h1>
        <div dangerouslySetInnerHTML={{ __html: post.html }} />
      </div>
    </Layout>
  )
}

export const query = graphql`
  query($slug: String!) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
      html
      frontmatter {
        title
      }
    }
  }
`

export default PostTemplate
