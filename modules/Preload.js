import React, { PropTypes, Component } from 'react';
import ImageHelper from './ImageHelper';

const propTypes = {
    // Rendered on success
    children: PropTypes.element.isRequired,

    // Rendered during load
    loadingIndicator: PropTypes.node.isRequired,

    // Array of image urls to be preloaded
    images: PropTypes.array,

    // If set, the preloader will automatically show
    // the children content after this amount of time
    autoResolveDelay: PropTypes.number,

    // Error callback. Is passed the error
    onError: PropTypes.func,

    // Success callback
    onSuccess: PropTypes.func,

    // Whether or not we should still show the content
    // even if there is a preloading error
    resolveOnError: PropTypes.bool,

    // Whether or not we should mount the child content after
    // images have finished loading (or after autoResolveDelay)
    mountChildren: PropTypes.bool,
};

const defaultProps = {
    images: [],
    resolveOnError: true,
    mountChildren: true,
    loadingIndicator: null,
};

class Preload extends Component {
    constructor(props) {
        super(props);

        this.state = {
            ready: false,
        };

        this._handleSuccess = this._handleSuccess.bind(this);
        this._handleError = this._handleError.bind(this);
        this._mounted = false;
    }

    componentWillMount() {
        if (!this.props.images || this.props.images.length === 0) {
            this._handleSuccess();
        }
    }

    componentDidMount() {
        this._mounted = true;
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
        this._mounted = false;
        if (this.autoResolveTimeout) {
            clearTimeout(this.autoResolveTimeout);
        }
    }

    _handleSuccess() {
        if (this.autoResolveTimeout) {
            clearTimeout(this.autoResolveTimeout);
            console.warn('images failed to preload, auto resolving');
        }

        if (this.state.ready || !this._mounted) {
            return;
        }

        this.setState({
            ready: true,
        });

        if (this.props.onSuccess) {
            this.props.onSuccess();
        }
    }

    _handleError(err) {

        if(!this._mounted) {
            return;
        }

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

Preload.propTypes = propTypes;
Preload.defaultProps = defaultProps;

export default Preload;
