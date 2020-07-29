import React, { PureComponent } from 'react';

export default class ImageCard extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            url: this.props.image.url,
            inputText: this.props.image.url
        }
        // inherited props:
        // this.props.imageOptions
        // this.props.lockedEditing
    };

    _renderImage = () => {
        if (this.props.imageOptions.parameterSet === false) {
            return this.state.url
        } else if (this.props.imageOptions.parameterSet === true) {
            return this.state.url.split('?')[0].split('#')[0] + '?' + this.props.imageOptions.parameterSetValue
        }
    }

    render() {
        return (
            <div class="image-card card">
                <img alt="placeholder-alt" src={this._renderImage()} />
                <input type="text" disabled={this.props.lockedEditing} placeholder="Insert image URL here" value={this.state.inputText} onChange={e => {
                    this.setState({ inputText: e.target.value })
                }}></input>
                <button type="submit" onClick={e => {
                    this.setState({ url: this.state.inputText })
                }}>Reload image</button>
                <textarea disabled={this.props.lockedEditing} className="caption demoElement" value="This is the caption for the image"/>
                <div className="center subtext metadata">
                    <p>
                        <a href={this.state.url} target="_blank">Open in new tab</a>
                    </p>
                    <p>
                        <a href={`https://sandbox.imgix.com/view?url=${encodeURIComponent(this._renderImage())}`} target="_blank">Open in sandbox</a>
                    </p>
                    <p className="wrap">
                        <span className="bold">parameters: </span>
                        {console.log('this._renderImage() is: ',this._renderImage())}
                        <code className="parameters inline">{this._renderImage().split('?')[1] || 'No parameters'}</code>
                    </p>
                    <br />
                </div>
            </div>
        );
    }
}
