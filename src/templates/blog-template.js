import React from "react"
import { useStaticQuery, graphql, Link } from "gatsby"
import Layout from "../components/layout"

const GET_MARKDOWNPOSTS = graphql`
  {
    allMarkdownRemark {
      totalCount
      edges {
        node {
          id
          frontmatter {
            title
            date
          }
          fields {
            slug
          }
          excerpt
        }
      }
    }
  }
`

const BlogTemplate = () => {
  const data = useStaticQuery(GET_MARKDOWNPOSTS)
  const { edges, totalCount } = data.allMarkdownRemark
  return (
    <Layout>
      <div>
        <h1 style={{ display: "inlineBlock", borderBottom: "1px solid" }}>
          Gatsby Garb Blog
        </h1>
        <h4>{totalCount} Posts</h4>
        <>
          {edges.map(edge => {
            const {
              frontmatter: { title, date },
              id,
              excerpt,
              fields: { slug },
            } = edge.node
            return (
              <div key={id}>
                <h3>
                  <Link to={`/posts${slug}`}>{title}</Link>
                  <span style={{ color: "#bbb" }}>{` - ${date}`}</span>
                </h3>
                <p>{excerpt}</p>
              </div>
            )
          })}
        </>
      </div>
    </Layout>
  )
}

export default BlogTemplate
