import React, { PureComponent } from 'react';
import axios from 'axios';

export default class ImageCard extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            url: this.props.image.url,
            inputText: this.props.image.url,
            group: this.props.group,
            counter: 0,
            contentLength: null
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

    _getImageSize = (image) => {
        if(image.indexOf('format') > -1 && image.indexOf('auto') > -1) {
            image += `&fm=webp`
        };
        return axios.get(image).then(response => {
            let contentLength = Math.round(response.headers["content-length"]/1000);
            this.setState({contentLength: `Content-length: ${contentLength} kb`})
            // return response.headers["content-length"].toString()
            return null
        }).catch((err) => {
            console.log('err trying to retrieve image from:')
            console.log(image)
            console.log(err)
            return "Unable to get size"
        })
    }

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
        this._getImageSize(image);
        return image;
    }


    render() {
        return (
            <div className="image-card card">
                <div className="img-container">
                    <img alt="placeholder-alt" src={this._renderImage()} />
                </div>
                <div className="card-info-container">
                    <p>{this.state.contentLength}</p>
                    <input type="text" className="editableFields" placeholder="Insert image URL here" value={this.state.inputText}
                        onChange={e => {
                            this.setState({ inputText: e.target.value })
                        }}
                        onBlur={e => {
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
                        }}
                    ></input>
                    <p className="wrap">
                        <code className="parameters inline">{this._renderImage().split('?')[1] || 'No parameters'}</code>
                    </p>
                    <div className="imageActions">
                        <a href={this.props.image.url} className="button" target="_blank" rel="noopener noreferrer" key={`buttonId${this.props.groupIndex + this.props.imageIndex}`} hidden={this.props.lockedEditing}>
                            <svg className="noFill imageActions-openInNewTab" width="29" height="24" viewBox="1 0 29 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <title>Open in new tab</title>
                                <description>Open in new tab`</description>
                                <rect x="6.375" y="1" width="21.625" height="14.875" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="bevel" />
                                <path d="M17.9375 6.75C17.9375 6.33579 17.6017 6 17.1875 6L10.4375 6C10.0233 6 9.6875 6.33579 9.6875 6.75C9.6875 7.16421 10.0233 7.5 10.4375 7.5L16.4375 7.5V13.5C16.4375 13.9142 16.7733 14.25 17.1875 14.25C17.6017 14.25 17.9375 13.9142 17.9375 13.5V6.75ZM5.06158 19.9366L17.7178 7.28033L16.6572 6.21967L4.00092 18.8759L5.06158 19.9366Z" fill="white" />
                                <rect x="3" y="4.375" width="20.7812" height="14.875" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="bevel" />
                            </svg>
                        </a>
                        <a href={`https://sandbox.imgix.com/view?url=${encodeURIComponent(this._renderImage())}`} className="button" target="_blank" rel="noopener noreferrer" key={`buttonId${this.props.groupIndex + this.props.imageIndex}`} hidden={this.props.lockedEditing}>
                            <svg className="imageActions-openInSandbox" viewBox="0 0 25 18" xmlns="http://www.w3.org/2000/svg">
                                <title>Open in Sandbox</title>
                                <description>Open in Sandbox</description>
                                <line y1="3" x2="25" y2="3" stroke-width="2" />
                                <line y1="9" x2="25" y2="9" stroke-width="2" />
                                <line y1="15" x2="25" y2="15" stroke-width="2" />
                                <circle cx="20" cy="15" r="3" />
                                <circle cx="13" cy="9" r="3" />
                                <circle cx="6" cy="3" r="3" />
                            </svg>
                        </a>
                        <button type="submit" key={`buttonId${this.props.groupIndex + this.props.imageIndex}`} hidden={this.props.lockedEditing}>
                            <svg className="imageActions-duplicate" viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <title>Duplciate the image</title>
                                <description>Duplciate the image</description>
                                <path d="M0 3.25V17.875H6.5H17.875H19.5V3.25H0ZM17.875 14.625L13 8.125L7.9625 14.4625L4.875 11.375L1.625 14.625V4.875H17.875V14.625Z" />
                                <path d="M4.875 9.75C5.77246 9.75 6.5 9.02246 6.5 8.125C6.5 7.22754 5.77246 6.5 4.875 6.5C3.97754 6.5 3.25 7.22754 3.25 8.125C3.25 9.02246 3.97754 9.75 4.875 9.75Z" />
                                <path d="M22.75 21.125V4.875H21.125V19.6625H1.625V21.125H22.75Z" />
                                <path d="M24.375 8.125V22.9125H4.875V24.375H26V8.125H24.375Z" />
                            </svg>

                        </button>
                        <button type="submit" key={`buttonId${this.props.groupIndex + this.props.imageIndex}`} hidden={this.props.lockedEditing} onClick={e => {
                            let groupClone = { ...this.props.group };
                            groupClone.images = groupClone.images.filter((x, y) => {
                                return y != this.props.imageIndex
                            })
                            this.props._modifyAppState(this.props.groupIndex, groupClone, () => {
                                this.props._handleCustomTemplates();
                            })
                        }}>
                            <svg className="imageActions-deleteImage" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <title>Delete the image</title>
                                <desc>Delete the image</desc>
                                <path d="M16 1L1 16L0 15L15 0L16 1Z" />
                                <path d="M1 0L16 15L15 16L0 1L1 0Z" />
                            </svg>
                        </button>
                    </div>
                    <div className="center subtext metadata">


                    </div>
                </div>
            </div>
        );
    }
}
