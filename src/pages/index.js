import React from "react"
import { Link } from "gatsby"

import Layout from "../components/layout"
import Image from "../components/image"
import SEO from "../components/seo"
// import '../main.scss'
import { Message, Input, Icon, Button, Table, Dimmer, Loader, Segment, Header } from 'semantic-ui-react'

const stub = [
    {
        name: "title",
        seeds: 1233,
        size: "1000mb",
        torrent: "fddsfd"
    }, {
        name: "title",
        seeds: 1233,
        size: "1000mb",
        torrent: "fddsfd"
    }, {
        name: "title",
        seeds: 1233,
        size: "1000mb",
        torrent: "fddsfd"
    }, {
        name: "title",
        seeds: 1233,
        size: "1000mb",
        torrent: "fddsfd"
    }, {
        name: "title",
        seeds: 1233,
        size: "1000mb",
        torrent: "fddsfd"
    }, {
        name: "title",
        seeds: 1233,
        size: "1000mb",
        torrent: "fddsfd"
    }, {
        name: "title",
        seeds: 1233,
        size: "1000mb",
        torrent: "fddsfd"
    }, {
        name: "title",
        seeds: 1233,
        size: "1000mb",
        torrent: "fddsfd"
    }, {
        name: "title",
        seeds: 1233,
        size: "1000mb",
        torrent: "fddsfd"
    }, {
        name: "title",
        seeds: 1233,
        size: "1000mb",
        torrent: "fddsfd"
    },
]

class IndexPage extends React.Component {
    state = {
        loading: false,
        results: stub
    }
    loading = () => this.setState({ loading: true })
    loaded = () => this.setState({ loading: false })

    render() {
        const { loading, results } = this.state
        const empty = results.length
        return (
            <Layout>
                <SEO title="Home" />
                <Segment>
                    <Input fluid icon='search' placeholder='Search...' />
                </Segment>
                {/* <Input icon='search' placeholder='Search...' /> */}

                <div class="ui one column stackable center aligned grid">
                    <div class="column twelve wide">
                        Your stuff here
   </div>
                </div>
                <Dimmer.Dimmable dimmed={loading}>
                    <Table striped compact>
                        {/* <caption>Found Table.HeaderCellat many torrents</caption> */}
                        <Table.Header>
                            <Table.Row>
                                <Table.HeaderCell >Name</Table.HeaderCell>
                                <Table.HeaderCell collapsing>Seeds</Table.HeaderCell>
                                <Table.HeaderCell collapsing>Size</Table.HeaderCell>
                                <Table.HeaderCell collapsing>Torrent</Table.HeaderCell>
                            </Table.Row>
                        </Table.Header>
                        <Table.Body>
                            {[].map(x => {
                                return (
                                    <Table.Row>
                                        <Table.Cell>{x.name}</Table.Cell>
                                        <Table.Cell>{x.seeds}</Table.Cell>
                                        <Table.Cell>{x.size}</Table.Cell>
                                        <Table.Cell><a href="#">Download</a></Table.Cell>
                                    </Table.Row>
                                )
                            })}
                        </Table.Body>
                    </Table>
                    <Dimmer active={loading} onClickOutside={this.loaded}>
                        <div>
                            <Loader active inline='centered' > Loading </Loader>
                        </div>
                    </Dimmer>
                </Dimmer.Dimmable>
                <Message icon warning>
                    <Icon name='undo' />
                    <Message.Content>
                        <Message.Header>Nothing Found</Message.Header>
                        We looked everywhere, try another search term.
                    </Message.Content>
                </Message>
                <Message icon negative>
                    <Icon name='undo' />
                    <Message.Content>
                        <Message.Header>Nothing Found</Message.Header>
                        We looked everywhere, try another search term.
                    </Message.Content>
                </Message>



            </Layout>
        )
    }
}
export default IndexPage
