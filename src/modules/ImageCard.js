import React, { PureComponent } from 'react';

export default class ImageCard extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            url: this.props.image.url,
            inputText: this.props.image.url
        }
    };

    _renderImage = () =>{
        if(this.props.imageOptions.parameterSet === false) {
            return this.state.url
        } else if (this.props.imageOptions.parameterSet === true) {
            return this.state.url.split('?')[0].split('#')[0] + '?' + this.props.imageOptions.parameterSetValue
        }
    }
    render() {
        return (
            <div class="image-card card">
                <img alt='placeholder-alt' src={this._renderImage()} />
                <input type="text" placeholder="Insert image URL here" value={this.state.inputText} onChange={e => {
                    this.setState({ inputText: e.target.value })
                }}></input>
                <button type="submit" onClick={e => {
                    this.setState({ url: this.state.inputText })
                }}>Reload image</button>
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
