import React from "react"
import { Link } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"

import Bart from "../components/Bart"

const IndexPage = () => {
  return (
    <Layout>
      <SEO title="Home" />

      <Bart />

      <Link to="/page-2/">Go to page 2</Link>
    </Layout>
  )
}

export default IndexPage
