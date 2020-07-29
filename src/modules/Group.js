import React, { PureComponent } from 'react';

import ImageCard from './ImageCard';

export default class Group extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            groupOptions: this.props.group.groupOptions,
            imageOptions: this.props.group.groupOptions.imageOptions,
            title: this.props.group.groupOptions.title,
            description: this.props.group.groupOptions.description,
        }

        // inherited props
        // this.props.group
        // this.props.lockedEditing
        // this.props._modifyGroup()
        // this.props.groupIndex
    }

    _addImageCard = () => {
        let array = this.props.group.images;

        let counter = 0;
        array.map(mapx => {
            let index = array.length - 1;
            let arrayClone = [...array];
            let arrayObject = Object.assign({}, array[index]);
            arrayClone.push(arrayObject);
            console.log('arrayClone is: ', arrayClone)
            counter += 1;
            this.setState({
                images: arrayClone
            }, () => {
                if (counter === array.length) {
                    let groupsClone = Object.assign({}, this.props.group);
                    groupsClone.images = arrayClone;

                    this.props._modifyState(this.props.groupIndex, groupsClone, 'group')
                }
            })
        })
    };

    _renderImageCard = () => {
        return Object.entries(this.props.group.images).map(mapx => {
            return <ImageCard _modifyState={this.props._modifyState} group={this.props.group} groupIndex={this.props.groupIndex} imageIndex={mapx[0]} image={mapx[1]} key={mapx[1].title} imageOptions={this.props.group.groupOptions.imageOptions} lockedEditing={this.props.lockedEditing}
            />
        })
    }

    _handleTextInputChange = (stateKey, e) => {
        this.setState({ [stateKey]: e })
    }

    render() {
        return (

            <div className="group">
                <div className="textContentContainer">
                    <h2 className="groupTitle" hidden={!this.props.lockedEditing}>{this.state.title}</h2>
                    <h2 hidden={this.props.lockedEditing}>Title</h2>
                    <textarea hidden={this.props.lockedEditing} class="h2 editableField title" value={this.state.title}
                        onChange={(e) => {
                            this._handleTextInputChange('title', e.target.value)
                        }}
                        onBlur={(e) => {
                            this.setState({ title: e.target.value }, () => {
                                let groupClone = Object.assign({}, this.props.group);
                                groupClone.groupOptions.title = this.state.title;
                                this.props._modifyState(this.props.groupIndex, groupClone)
                            });
                        }} />

                    <p hidden={!this.props.lockedEditing} className="groupDescription">{this.props.group.groupOptions.description}</p>
                    <h2 hidden={this.props.lockedEditing}>description</h2>
                    <input type="text" hidden={this.props.lockedEditing} class="h2 editableField description" value={this.state.description}
                        onChange={(e) => {
                            this._handleTextInputChange('Description', e.target.value)
                        }}
                        onBlur={(e) => {
                            this.setState({ description: e.target.value }, () => {
                                let groupClone = Object.assign({}, this.props.group);
                                groupClone.groupOptions.description = this.state.description;
                                console.log('groupClone is: ', groupClone)
                                this.props._modifyState(this.props.groupIndex, groupClone)
                            });
                        }} />
                </div>
                <div hidden={this.props.lockedEditing} className="optionsContainer">

                    <div>
                        This div should contain the container's options. Such as:
          <ul>
                            <h3>Bulk parameter editing</h3>
                            <form>
                                <label htmlFor="groupParametersValue">Apply parameter set here</label>
                                <input type="text" id="groupParametersValue" value={this.props.group.groupOptions.parameterSetValue}
                                    onChange={e => {
                                        this.setState({
                                            imageOptions: {
                                                parameterSet: this.props.group.groupOptions.parameterSet,
                                                parameterSetValue: e.target.value
                                            }
                                        })
                                    }}
                                ></input>
                                <button type="submit"
                                    onClick={e => {
                                        e.preventDefault();
                                        let parameterSetValue = this.props.group.groupOptions.parameterSetValue.replace('?', '').trim()
                                        this.setState({
                                            imageOptions: {
                                                parameterSetValue: parameterSetValue,
                                                parameterSet: true
                                            }
                                        })

                                    }}
                                >Apply parameters</button>
                                <button type="submit"
                                    onClick={e => {
                                        e.preventDefault();
                                        this.setState({
                                            imageOptions: {
                                                parameterSetValue: this.props.group.groupOptions.parameterSetValue,
                                                parameterSet: false
                                            }
                                        })
                                    }}
                                >Unset group parameters</button>
                            </form>
                        </ul>
                    </div>

                </div>

                <div className="images-container">
                    {this._renderImageCard()}
                    <div className="card" hidden={this.props.lockedEditing}>
                        <button className="addImage" id="addImage" onClick={(e) => {
                            this._addImageCard()
                        }}>Add image</button>
                    </div>
                </div>
            </div>

        )
    }
}