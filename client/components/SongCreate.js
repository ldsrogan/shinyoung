import React, { Component } from 'react';
import { gql } from 'apollo-boost';
import {graphql} from 'react-apollo';
import { Link, withRouter } from 'react-router-dom';
import query from '../queries/fetchSongs';

class SongCreate extends Component {
    constructor(props) {
        super(props);

        this.state = { title: '' }
    }

    onSubmit(event) {
        event.preventDefault();

        this.props.mutate({
            variables: {
                title: this.state.title
            },
            refetchQueries: [{ query }]
        }).then(() => this.props.history.push('/'));
    }

    render() {
        return (
            <div>
                <Link to="/">Back</Link>
                <h4>Create a New Song</h4>
                <form onSubmit={this.onSubmit.bind(this)}> 
                    <label>Song Title:</label>
                    <input
                        onChange={event => this.setState({title: event.target.value})}
                        value={this.state.title} />
                </form>
            </div>
        );
    }
}

const mutation = gql`
    mutation AddSong($title: String) {
        addSong(title: $title) {
            title
        }
    }
`;

export default graphql(mutation)(withRouter(SongCreate));