import React from 'react';
import Preload from 'react-preload';
import Spinner from './Spinner';

const imgBase = 'https://api.fnkr.net/testimg/800x600/00CED1/FFF/?';

export class Example1 extends React.Component {
    _handleImageLoadError = (failedImages) => {
        this.setState({
            preloadError: true,
        });
    }

    _handleImageLoadSuccess = () => {
    }

    componentWillMount() {
        this.setState({
            cacheBreaker: Date.now(),
        })
    }

    render() {

        const images = [
            `${imgBase}text=1-${this.state.cacheBreaker}`,
            `${imgBase}text=2-${this.state.cacheBreaker}`,
            `${imgBase}text=3-${this.state.cacheBreaker}`,
            `http://not-a-real-image-url`,
        ];

        return (
            <Preload

                images={images}
                onError={this._handleImageLoadError}
                onSuccess={this._handleImageLoadSuccess}
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
        );
    }
}
