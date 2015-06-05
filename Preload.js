var React = require('react');
var ImageHelper = require('./ImageHelper');

var Preload = React.createClass({displayName: "Preload",

    propTypes: {
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
        resolveOnError: React.PropTypes.bool
    },

    getDefaultProps: function () {
        return {
            images: [],
            resolveOnError: true
        };
    },

    getInitialState: function () {
        return {
            ready: false
        };
    },

    componentWillMount: function () {
        if(!this.props.images || this.props.images.length === 0){
            this._handleSuccess();
        }
    },

    componentDidMount: function () {
        if(!this.state.ready){
            ImageHelper
                .loadImages(this.props.images)
                .then(this._handleSuccess, this._handleError);

            if(this.props.autoResolveDelay && this.props.autoResolveDelay > 0){
                this.autoResolveTimeout = setTimeout(this._handleSuccess, this.props.autoResolveDelay);
            }
        }
    },

    componentWillUnmount: function () {
        clearTimeout(this.autoResolveTimeout);
    },

    _handleSuccess: function () {
        clearTimeout(this.autoResolveTimeout);

        this.setState({ready: true});

        if(this.props.onSuccess){
            this.props.onSuccess();
        }
    },

    _handleError: function (err) {
        if(this.props.resolveOnError){
            this._handleSuccess();
        }

        if(this.props.onError){
            this.props.onError(err);
        }
    },

    render: function(){
        return (this.state.ready?this.props.children:this.props.loadingIndicator);
    }

});

module.exports = Preload;
