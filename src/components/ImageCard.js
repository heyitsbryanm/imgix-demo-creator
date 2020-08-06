import React, { PureComponent } from 'react';

export default class ImageCard extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            url: this.props.image.url,
            inputText: this.props.image.url,
            group: this.props.group,
            counter: 0
        }
        // inherited props:
        // this.props.imageOptions
        // this.props.lockedEditing
        // this.props._modifyAppState()
        // this.props.group
        // this.props.groupIndex
        // this.props.imageIndex
    };

    componentDidMount() {
        this.setState({ inputText: this.props.image.url });
    };

    _renderImage = () => {
        let image = this.props.image.baseUrl
        if (this.props.imageOptions.parameterSet === true) {
            image = this.props.image.baseUrl + '?' + this.props.imageOptions.parameterSetValue
        } else if (this.props.imageOptions.appendParameterSet === true) {
            if (this.props.image.url.indexOf('?') > -1) {
                image = this.props.image.url + '&' + this.props.imageOptions.parameterSetValue
            } else {
                image = this.props.image.baseUrl + '?' + this.props.imageOptions.parameterSetValue
            }
        } else if (this.props.imageOptions.parameterSet === false) {
            image = this.props.image.baseUrl + '?' + (this.props.image.imageParameters || '');
        }

        // custom functions
        if (this.props.group.groupOptions.imageOptions.customFunction) {
            image = this.props.image.baseUrl + '?' + this.props.customCodeParams
        }
        return image;
    }



    render() {
        return (
            <div className="image-card card">
                <img alt="placeholder-alt" src={this._renderImage()} />
                <input type="text" disabled={this.props.lockedEditing} placeholder="Insert image URL here" value={this.state.inputText} onChange={e => {
                    this.setState({ inputText: e.target.value })
                }}></input>
                <button type="submit" hidden={this.props.lockedEditing} onClick={e => {
                    this.setState({ url: this.state.inputText }, () => {
                        let groupClone = Object.assign({}, this.props.group);
                        groupClone.images[this.props.imageIndex].url = this.state.inputText;

                        let splitUrl = this.state.inputText.split('?');
                        groupClone.images[this.props.imageIndex].baseUrl = splitUrl[0];
                        groupClone.images[this.props.imageIndex].imageParameters = splitUrl[1];

                        this.props._modifyAppState(this.props.groupIndex, groupClone, () => {
                            this.props._handleCustomTemplates();
                        })
                    })
                }}>Reload image</button>

                <button type="submit" key={`buttonId${this.props.groupIndex + this.props.imageIndex}`} hidden={this.props.lockedEditing} onClick={e => {
                    let groupClone = { ...this.props.group };
                        groupClone.images = groupClone.images.filter((x,y)=>{
                            return y != this.props.imageIndex
                        })
                        this.props._modifyAppState(this.props.groupIndex, groupClone, () => {
                            this.props._handleCustomTemplates();
                        })
                }}>Delete image</button>
                <div className="center subtext metadata">
                    <p>
                        <a href={this.props.image.url} target="_blank" rel="noopener noreferrer" >Open in new tab</a>
                    </p>
                    <p>
                        <a href={`https://sandbox.imgix.com/view?url=${encodeURIComponent(this._renderImage())}`} target="_blank" rel="noopener noreferrer">Open in sandbox</a>
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
