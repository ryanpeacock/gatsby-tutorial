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

const BlogTemplate = ({data, pageContext}) => {
  // const data = useStaticQuery(GET_MARKDOWNPOSTS)
  const { edges, totalCount } = data.allMarkdownRemark
  const {currentPage, isFirstPage, isLastPage, totalPages} = pageContext
  const nextPage = `/blog/${String(currentPage + 1)}`
  const prevPage = currentPage - 1 === 1 ? '/blog' : `/blog/${String(currentPage - 1)}`
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
        {/* Pagination Links */}
        <div style={{display: 'flex', alignItems: 'center', justifyContext: 'space-around', maxWidth: 300, margin: '0 auto'}}>
          {!isFirstPage && (
            <Link to={prevPage} rel="prev">
              Prev Page
            </Link>
          )}{Array.from({lenth: totalPages}, (_, index) => (
            <Link key={index} tp={`/blog/${index === 0 ? "" : index + 1}`}>
              {index + 1}
            </Link>
          ))}
          {!isLastPage && (
            <Link to={nextPage} rel="next">
            Next Page
            </Link>
          )}
        </div>
      </div>
    </Layout>
  )
}

export const query = graphql`
query($skip:Int!, $limit:Int!) {
  allMarkdownRemark (skip:$skip, limit: $limit, 
    (
      sort: {order: DESC, fields: [frontmatter___date]}
    )) {
    totalCount
    edges {
      node {
        id
        frontmatter {
          title
          date((formatString:"MMMM Do, YYYY"))
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

export default BlogTemplate
