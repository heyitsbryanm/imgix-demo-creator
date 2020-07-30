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
        // this.props._modifyState()
        // this.props.group
        // this.props.groupIndex
        // this.props.imageIndex
    };

    _renderImage = () => {
        if (this.props.imageOptions.parameterSet === false) {
            return this.props.image.url
        } else if (this.props.imageOptions.parameterSet === true) {
            return this.props.image.url.split('?')[0].split('#')[0] + '?' + this.props.imageOptions.parameterSetValue
        }
    }



    render() {
        return (
            <div class="image-card card">
                <img alt="placeholder-alt" src={this._renderImage()} />
                <input type="text" disabled={this.props.lockedEditing} placeholder="Insert image URL here" value={this.state.inputText} onChange={e => {
                    this.setState({ inputText: e.target.value })
                }}></input>
                <button type="submit" hidden={this.props.lockedEditing} onClick={e => {
                    this.setState({ url: this.state.inputText },()=>{
                        let groupClone = Object.assign({},this.props.group);
                        groupClone.images[this.props.imageIndex].url = this.state.url;
                        this.props._modifyState(this.props.groupIndex,groupClone)
                    })
                }}>Reload image</button>
                <div className="center subtext metadata">
                    <p>
                        <a href={this.props.image.url} target="_blank">Open in new tab</a>
                    </p>
                    <p>
                        <a href={`https://sandbox.imgix.com/view?url=${encodeURIComponent(this._renderImage())}`} target="_blank">Open in sandbox</a>
                    </p>
                    <p className="wrap">
                        <span className="bold">parameters: </span>
                        <code className="parameters inline">{this._renderImage().split('?')[1] || 'No parameters'}</code>
                    </p>
                    <br />
                </div>
            </div>
        );
    }
}
