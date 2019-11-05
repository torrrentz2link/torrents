import React from "react"
import { Link } from "gatsby"
import { sortBy } from 'lodash'

import Layout from "../components/layout"
import Image from "../components/image"
import SEO from "../components/seo"
// import '../main.scss'
import { Router, navigate } from "@reach/router"
import { Message, Input, Button, Table, Segment } from 'semantic-ui-react'
import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'

var mock = new MockAdapter(axios);
const log = console.log
const stub = [
    {
        title: "title",
        seeds: 1233,
        size: "1000mb",
        torrent: "fddsfd",
        magnet: "asdf"
    }, {
        title: "title",
        seeds: 1233,
        size: "1000mb",
        torrent: "fddsfd",
        magnet: "asdf"
    },
]
mock.onGet(new RegExp("/torrents/*")).reply(200, {
    torrents: stub
}
);

const isIntro = (
    <Message>
        <Message.Content>
            <Message.Header>Torrent Search</Message.Header>
            Search multiple torrent sites simulatenously with us. We aggregate results from: KickassTorrents, The Pirate Bay, Rarbg, Torrentz2, 1337x.
        </Message.Content>
    </Message>
)

function hasLoaded(number) {
    return (<Message success size='mini'>
        <Message.Content>
            <Message.Header>Found {number} results.</Message.Header>
        </Message.Content>
    </Message>)
}

const isLoading = (<Message icon info size='mini'>
    {/* <Icon name='circle notched' loading /> */}
    <Message.Content>
        <Message.Header>Loading</Message.Header>
    </Message.Content>
</Message>)

const isNothing = (<Message icon warning size='mini'>
    {/* <Icon name='undo' /> */}
    <Message.Content>
        <Message.Header>Nothing Found</Message.Header>
    </Message.Content>
</Message>)
const isError = (<Message icon negative size='mini'>
    {/* <Icon name='x' /> */}
    <Message.Content>
        <Message.Header>Error</Message.Header>
    </Message.Content>
</Message>)

const http = axios
// .create({
// //   baseURL: 'https://3000-f7a9f611-984b-4cc3-a802-859bf1fe449b.ws-ap0.gitpod.io/torrents',
//   timeout: 11000,
// });

const stateFlags = {
    loading: false,
    error: false,
    nothing: false,
}

var count = 0

class IndexPage extends React.Component {
    state = {
        loading: false,
        results: [],
        error: false,
        nothing: true, //if no query has been made
        input: "",
        column: null,
        direction: null,
    }
    makeState() {
        count += 1
        log(count, this.setState)
        switch (count) {
            case 0:
                this.setState({ ...stateFlags, nothing: true })
                break;
            case 1:
                this.setState({ ...stateFlags, results: stub })
                break;
            case 2:
                this.setState({ ...stateFlags, loading: true, results: [] })
                break;
            case 3:
                this.setState({ ...stateFlags, error: true, results: [] })
                break;
            case 4:
                count = -1
                this.setState({ ...stateFlags, results: [] })
                break;
        }

    }
    componentDidMount() {
        const that = this
        setInterval(this.makeState.bind(that), 1000)
    }
    render() {
        const query = this.props.query
        // const props.location.state.input
        const { loading, results, error, nothing } = this.state
        const empty = !results.length
        let message
        let searchIcon
        let inputLoading = false
        if (nothing) {
            searchIcon = 'search'
            message = isIntro
        } else if (error) {
            message = isError
            searchIcon = 'x'
        } else if (loading) {
            message = isLoading
            searchIcon = 'circle notched'
            inputLoading = true
        } else if (empty) {
            message = isNothing
            searchIcon = 'undo'
        } else {
            searchIcon = 'search'
            message = hasLoaded(results.length)
        }
        return (
            <Layout>
                <SEO title="Home" />
                <Segment>
                    <Input fluid loading={inputLoading} icon={searchIcon} iconPosition='left' action='Search' placeholder='Search torrents' />
                </Segment>
                {message}
                {!nothing && <Table striped compact sortable>
                    <Table.Header>
                        <Table.Row>
                            <Table.HeaderCell >Name</Table.HeaderCell>
                            <Table.HeaderCell collapsing sorted="descending">Seeds</Table.HeaderCell>
                            <Table.HeaderCell collapsing>Size</Table.HeaderCell>
                            <Table.HeaderCell collapsing>Torrent</Table.HeaderCell>
                        </Table.Row>
                    </Table.Header>
                    <Table.Body>
                        {results.map((x, i) => {
                            return (
                                <Table.Row key={i}>
                                    <Table.Cell>{x.title}</Table.Cell>
                                    <Table.Cell>{x.seeds}</Table.Cell>
                                    <Table.Cell>{x.size}</Table.Cell>
                                    <Table.Cell><a href="#">Download</a></Table.Cell>
                                </Table.Row>
                            )
                        })}
                    </Table.Body>
                </Table>}
            </Layout>
        )
    }
}

const routedIndex = () => {
    return (
        <Router>
            <IndexPage path='/:query' />
        </Router>
    )
}
export default IndexPage
