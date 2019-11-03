/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React from "react"
import PropTypes from "prop-types"
import { useStaticQuery, graphql } from "gatsby"

import Header from "./header"
import 'semantic-ui-css/semantic.min.css'
import "./layout.css"
// import "../main.scss"
// import "uikit/dist/css/uikit.min.css"
// import "uikit/dist/js/uikit.min.js"

class Layout extends React.Component {
//   componentDidMount() {
//     try {
//       this.UIkit = require('uikit/dist/js/uikit')
//       this.Icons = require('uikit/dist/js/uikit-icons')
//       this.UIkit.use(this.Icons)
//     } catch (e) {
//       console.error(e)
//     }
//   }
    render() {
//         const data = useStaticQuery(graphql`
//     query SiteTitleQuery {
//       site {
//         siteMetadata {
//           title
//         }
//       }
//     }
//   `)

        return (
            <>
                <Header siteTitle={"All Torrents"} />
                <div
                    style={{
                        margin: `0 auto`,
                        maxWidth: 960,
                        padding: `0px 1.0875rem 1.45rem`,
                        paddingTop: 0,
                    }}
                >
                    <main>{this.props.children}</main>
                    <footer>
                        © {new Date().getFullYear()}, Built with
          {` `}
                        <a href="https://www.gatsbyjs.org">Gatsby</a>
                    </footer>
                </div>
            </>
        )
    }


}

Layout.propTypes = {
    children: PropTypes.node.isRequired,
}

export default Layout
