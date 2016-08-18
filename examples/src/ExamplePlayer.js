import React, { PropTypes } from 'react';

export default class ExamplePlayer extends React.Component {

    static propTypes = {
        children: PropTypes.element.isRequired,
    }

    state = {
        playing: false,
    }

    _handleClickPlay = () => {
        this.setState({
            playing: true,
        })
    }

    _handleClickReset = () => {
        this.setState({
            playing: false,
        })
    }

    getButton() {
        if (this.state.playing) {
            return (
                <button
                    onClick={this._handleClickReset}
                    type="button"
                    className="btn btn-primary"
                >Reset</button>);
        }

        return (
            <button
                onClick={this._handleClickPlay}
                type="button"
                className="btn btn-info"
            >Play</button>);
    }

    render() {

        return (
            <div>
              <div className="row">
                  <div className="col-xs-12">
                      {this.getButton()}
                  </div>
              </div>
              <div className="row" style={{marginTop: '1em'}}>
                <div className="col-xs-12">
                    {this.state.playing && this.props.children}
                </div>
              </div>
            </div>
        );
    }
}
