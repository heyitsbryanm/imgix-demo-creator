import React, { PureComponent } from 'react';

export default class ImageCard extends PureComponent {
    constructor(props) {
        super(props)
    };

    render() {
        return (
            <div class="image-card card">
            <img alt='placeholder-alt' src={this.props.image.url} />
            <div className="center subtext metadata">
              <p>
                <span className="bold">url: </span>
                <a href='placeholder-link>'>placeholder-link</a>
              </p>
              <p>
                <span className="bold">size: </span>
                placeholder-size
              </p>
              <p className="wrap">
                <span className="bold">parameters: </span>
                <code className="parameters inline">placeholder-parameters</code>
              </p>

              <br />
            </div>
          </div>
        );
    }
}
