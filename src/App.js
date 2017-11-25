import React, { Component } from 'react';
import { connect } from 'react-redux';
import { increase, decrease, fetchUser } from './actions';

class App extends Component {
  constructor(props) {
    super(props);

    this.searchUser = this.searchUser.bind(this);
  }

  searchUser(event) {
    this.props.fetchUser(event.target.value);
  }

  render() {
    return (
      <div>
        <div>
          <h2>Delayed Counter:</h2>
          <button onClick={this.props.increase}>Increase</button>
          <button onClick={this.props.decrease}>Decrease</button>
          <p>
            Number: {this.props.number}
          </p>
        </div>

        <hr />

        <div>
          <h2>Github Search:</h2>
          <input placeholder='Username' onChange={this.searchUser} />
          <p>
            <img src={this.props.image} alt='Not Found' width={100} />
          </p>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  number: state.counter.number,
  image: state.user.avatar_url
});

const mapDispatchToProps = {
  increase,
  decrease,
  fetchUser
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
