import React from "react"
import { sortBy } from 'lodash'

import Layout from "../components/layout"
import SEO from "../components/seo"
// import '../main.scss'
import { Router, navigate, Location } from "@reach/router"
import { Message, Input, Button, Table, Segment } from 'semantic-ui-react'
import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'
import xbytes from 'xbytes'

// var mock = new MockAdapter(axios);
const log = console.log
// const stub = [
//         {
//         title: "title3",
//         seeds: 3,
//         size: "1000mb",
//         torrent: "fddsfd",
//         magnet: "asdf"
//     },
//     {
//         title: "title",
//         seeds: 1,
//         size: "1000mb",
//         torrent: "fddsfd",
//         magnet: "asdf"
//     }, {
//         title: "title1",
//         seeds: 2,
//         size: "1000mb",
//         torrent: "fddsfd",
//         magnet: "asdf"
//     },
// ]
// mock.onGet(new RegExp("/torrents/*")).reply(200, {
//     torrents: stub
// }
// );

//normalizes text of size with different units
function parseSize(inp) {
    return inp.map(x => {
        const number = xbytes.parseSize(x.size)
        x.number = number
        x.size = xbytes(number)
        return x
    })
}

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

class IndexPage extends React.Component {
    state = {
        loading: false,
        results: [],
        error: false,
        nothing: true, //if no query has been made
        input: "",
        column: 'seeds',
        direction: 'descending'
    }
    componentDidMount() {
        if (this.props.query) {
            this.searchBegun()
        }
    }
    componentDidUpdate(prevProps, prevState) {
        if (prevProps.query != this.props.query) {
            this.searchBegun()
        }
    }
    handleSort = (clickedColumn) => () => {
        const { column, results, direction } = this.state

        if (column !== clickedColumn) {
            this.setState({
                column: clickedColumn,
                results: sortBy(results, [clickedColumn]),
                direction: 'ascending',
            })
            return
        }

        this.setState({
            results: results.reverse(),
            direction: direction === 'ascending' ? 'descending' : 'ascending',
        })
    }
    initialSort = (results) => {
        const { column, direction } = this.state
        let sResults = sortBy(results, column)
        if (direction == 'descending') {
            sResults = sResults.reverse()
        }
        return sResults
    }
    searchBegun = () => {
        const query = this.props.query
        this.setState({ ...stateFlags, loading: true })
        http.get("/torrents/" + query).then(this.searchResolve).catch(x => {
            console.log(x)
            this.setState({ ...stateFlags, error: true })
        })
    }
    searchResolve = (res) => {
        const r = this.initialSort(parseSize(res.data.torrents))
        const query = this.props.query
        this.setState({ ...stateFlags, results: r })
    }
    hInput = (e) => {
        this.setState({ input: e.target.value })
    }
    hSubmit = (e) => {
        if (e.key == "Enter") {
            this.searchBegin()
        }
    }
    searchBegin = () => {
        navigate("/search/" + this.state.input)
    }
    render() {
        const query = this.props.query
        // const props.location.state.input
        const { loading, results, error, nothing, column, direction } = this.state
        const { hInput, hSubmit, searchBegin } = this
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
                    <Input onChange={hInput} onKeyPress={hSubmit} fluid loading={inputLoading} icon={searchIcon} iconPosition='left' action={<Button onClick={searchBegin}>Search</Button>} placeholder='Search torrents' />
                </Segment>
                {message}
                {!nothing && <Table striped compact sortable>
                    <Table.Header>
                        <Table.Row>
                            <Table.HeaderCell
                                sorted={column === 'title' ? direction : null}
                                onClick={this.handleSort('title')}
                            >Name</Table.HeaderCell>
                            <Table.HeaderCell collapsing
                                sorted={column === 'seeds' ? direction : null}
                                onClick={this.handleSort('seeds')}
                            >Seeds</Table.HeaderCell>
                            <Table.HeaderCell collapsing
                                sorted={column === 'number' ? direction : null}
                                onClick={this.handleSort('number')}
                            >Size</Table.HeaderCell>
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

const ClientRoutes = props => (
    <Location>
        {({ location }) => (
            <Router location={location} className="router">
                {props.children}
            </Router>
        )}
    </Location>
)

const Page = props => (
    <div>
        {props.page}
    </div>
)

const Routed = () => (
    <ClientRoutes>
        <IndexPage path="/search/:query" />
        <IndexPage path="/" />
    </ClientRoutes>
)


export default Routed
