import React from 'react';
import ImageHelper from './ImageHelper';

class Preload extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            ready: false
        };
    }

    componentWillMount() {
        if (!this.props.images || this.props.images.length === 0) {
            this._handleSuccess();
        }
    }

    componentDidMount() {
        if (!this.state.ready) {
            ImageHelper
                .loadImages(this.props.images)
                .then(this._handleSuccess, this._handleError);

            if (this.props.autoResolveDelay && this.props.autoResolveDelay > 0) {
                this.autoResolveTimeout = setTimeout(this._handleSuccess, this.props.autoResolveDelay);
            }
        }
    }

    componentWillUnmount() {
        clearTimeout(this.autoResolveTimeout);
    }

    _handleSuccess() {
        clearTimeout(this.autoResolveTimeout);

        if (this.state.ready) {
            return;
        }

        this.setState({
            ready: true
        });

        if (this.props.onSuccess) {
            this.props.onSuccess();
        }
    }

    _handleError(err) {
        if (this.props.resolveOnError) {
            this._handleSuccess();
        }

        if (this.props.onError) {
            this.props.onError(err);
        }
    }

    render() {
        return (this.state.ready && this.props.mountChildren ? this.props.children : this.props.loadingIndicator);
    }
}

Preload.propTypes = {
    //Rendered on success
    children: React.PropTypes.node.isRequired,

    //Rendered during load
    loadingIndicator: React.PropTypes.node.isRequired,

    //Array of image urls to be preloaded
    images: React.PropTypes.array,

    //If set, the preloader will automatically show
    //the children content after this amount of time
    autoResolveDelay: React.PropTypes.number,

    //Error callback. Is passed the error
    onError: React.PropTypes.func,

    //Success callback
    onSuccess: React.PropTypes.func,

    //Whether or not we should still show the content
    //even if there is a preloading error
    resolveOnError: React.PropTypes.bool,

    //Whether or not we should mount the child content after
    //images have finished loading (or after autoResolveDelay)
    mountChildren: React.PropTypes.bool
};

Preload.getDefaultProps = () => {
    return {
        images: [],
        resolveOnError: true,
        mountChildren: true
    };
};

export default Preload;
