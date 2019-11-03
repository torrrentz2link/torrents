import React from "react"
import { Link } from "gatsby"

import Layout from "../components/layout"
import Image from "../components/image"
import SEO from "../components/seo"
// import '../main.scss'
import { Router, navigate } from "@reach/router"
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
    },
]

const isIntro = (
    <Message>
        <Message.Content>
            <Message.Header>Torrent Search</Message.Header>
            Search multiple torrent sites simulatenously with us. We aggregate results from: ... .
        </Message.Content>
    </Message>
)

function hasLoaded(number) {
    return (<Message success>
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

const isNothing = (<Message icon warning>
    {/* <Icon name='undo' /> */}
    <Message.Content>
        <Message.Header>Nothing Found</Message.Header>
    </Message.Content>
</Message>)
const isError = (<Message icon negative>
    {/* <Icon name='x' /> */}
    <Message.Content>
        <Message.Header>Error</Message.Header>
    </Message.Content>
</Message>)

function getPath() {
    return window.location.href.toString().split(window.location.host)[1]
}

function setPath(name) {
    var state = {};
    var title = 'Hello World';
    var url = 'hello-world.html';
    history.pushState(state, title, url);
}

class IndexPage extends React.Component {
    state = {
        loading: false,
        results: stub,
        error: false,
        nothing: true, //if no query has been made
        input: "",
    }
    loading = () => this.setState({ loading: true })
    loaded = () => this.setState({ loading: false })
    search = (e) =>{
        const val = e.target.value
        navigate(`/${val}`, {input: val})
    }
    searchResolve(res) {
        this.setState({ loading: false, error: false, nothing: false})
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
                    <Input fluid loading={inputLoading} icon={searchIcon} placeholder='Search torrents' />
                </Segment>
                {message}
                <Table striped compact>
                    <Table.Header>
                        <Table.Row>
                            <Table.HeaderCell >Name</Table.HeaderCell>
                            <Table.HeaderCell collapsing>Seeds</Table.HeaderCell>
                            <Table.HeaderCell collapsing>Size</Table.HeaderCell>
                            <Table.HeaderCell collapsing>Torrent</Table.HeaderCell>
                        </Table.Row>
                    </Table.Header>
                    <Table.Body>
                        {stub.map(x => {
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
                Intro
                We look through several torrent sites simulatenously.
            </Layout>
        )
    }
}

const routedIndex = () => {
    return (
        <Router>
                <IndexPage path='/:query'/>
        </Router>
    )
}
export default routedIndex
