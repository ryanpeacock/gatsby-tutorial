import React from "react"
import Layout from "../components/layout"
import { Link } from "gatsby"
import { useStaticQuery, graphql } from "gatsby"

const GET_FILEDATA = graphql`
  {
    allFile {
      edges {
        node {
          relativePath
          size
          extension
          birthTime
        }
      }
    }
  }
`

const PageThree = () => {
  const data = useStaticQuery(GET_FILEDATA)

  const { edges } = data.allFile

  return (
    <Layout>
      <div>
        <h1>Page 3</h1>
        <table>
          <thead>
            <tr>
              <th>Relative Path</th>
              <th>Size of Image</th>
              <th>Extension</th>
              <th>Birthtime</th>
            </tr>
          </thead>
          <tbody>
            {edges.map((edge, index) => {
              const { relativePath, size, extension, birthTime } = edge.node
              return (
                <tr key={index}>
                  <td>{relativePath}</td>
                  <td>{size}</td>
                  <td>{extension}</td>
                  <td>{birthTime}</td>
                </tr>
              )
            })}
          </tbody>
        </table>
        <Link to="/page-2">Go to page 2</Link>
      </div>
    </Layout>
  )
}

export default PageThree
