import React from 'react';
import Preload from '../../modules/index';
import Spinner from './Spinner';

const imgBase = 'https://picsum.photos/800/600?';

export class Example1 extends React.Component {
    _handleImageLoadError = (failedImages) => {
        this.setState({
            preloadError: true,
        });
    }

    _handleImageLoadSuccess = () => {
    }

    componentWillMount() {
        this.bustCache()
    }

    _handleClickNewImages = () => {
        this.bustCache()
    }

    bustCache() {
        this.setState({
            cacheBreaker: Date.now(),
        })
    }

    _getProgress = (completedCount, total) => {
        const percent = (Math.round(completedCount/total * 10000)/100).toFixed(2) + '%'
        console.log(percent);
    }

    render() {
        const images = [
            `${imgBase}text=1-${this.state.cacheBreaker}`,
            `${imgBase}text=2-${this.state.cacheBreaker}`,
            `${imgBase}text=3-${this.state.cacheBreaker}`,
            `https://not-a-real-image-url`,
        ];

        return (
            <div>
                <button
                    onClick={this._handleClickNewImages}
                    type="button"
                    className="btn btn-primary"
                >Load New Images</button>
                <Preload
                    images={images}
                    onError={this._handleImageLoadError}
                    onSuccess={this._handleImageLoadSuccess}
                    loadingIndicator={<Spinner />}
                    getProgress={this._getProgress}
                    mountChildren
                    resolveOnError
                >
                    <div>
                        {this.state.preloadError &&
                            <div className="alert alert-warning" role="alert">
                            <span className="glyphicon glyphicon-exclamation-sign" aria-hidden="true"></span>
                            <span className="sr-only">Error:</span>
                            There was an error loading some of the images
                            </div>
                        }
                        {images.map((url, i) =>
                            <div key={i} className="col-xs-6 col-md-3">
                                <span className="thumbnail">
                                <img src={url} />
                                </span>
                            </div>
                        )}
                    </div>
                </Preload>
            </div>
        );
    }
}
