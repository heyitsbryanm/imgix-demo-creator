import React, { PureComponent } from 'react';

import ImageCard from './ImageCard';

export default class Group extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            images: this.props.group.images,
            imageOptions: this.props.group.groupOptions.imageOptions
        }

        // inherited props
        // this.props.group
        // this.props.lockedEditing
        // this.props._modifyGroup()
        // this.props.groupIndex
    }

    _addImageCard = () => {
        let array = this.state.images;

        let counter = 0;
        array.map(mapx => {
            let index = array.length - 1;
            let arrayClone = [...array];
            let arrayObject = Object.assign({}, array[index]);
            arrayClone.push(arrayObject);
            console.log('arrayClone is: ',arrayClone)
            counter+=1;
            this.setState({
                images: arrayClone
            },()=>{
                if(counter === array.length) {
                    let groupsClone = Object.assign({},this.props.group);
                    groupsClone.images = arrayClone;

                    this.props._modifyState(this.props.groupIndex,groupsClone,'group')
                }
            })
        })
    };

    _renderImageCard = () => {
        return this.state.images.map(mapx => {
            return <ImageCard image={mapx} key={mapx.title} imageOptions={this.state.imageOptions} lockedEditing={this.props.lockedEditing}
            />
        })
    }

    render() {
        return (

            <div className="group">
                <div className="textContentContainer">
                    <h2 className="groupTitle">{this.props.group.groupOptions.title}</h2>
                    <p className="description">{this.props.group.groupOptions.description}</p>
                </div>
                <div hidden={this.props.lockedEditing} className="optionsContainer">

                    <div>
                        This div should contain the container's options. Such as:
          <ul>
                            <h3>Bulk parameter editing</h3>
                            <form>
                                <label htmlFor="groupParametersValue">Apply parameter set here</label>
                                <input type="text" id="groupParametersValue" value={this.state.imageOptions.parameterSetValue}
                                    onChange={e => {
                                        this.setState({
                                            imageOptions: {
                                                parameterSet: this.state.imageOptions.parameterSet,
                                                parameterSetValue: e.target.value
                                            }
                                        })
                                    }}
                                ></input>
                                <button type="submit"
                                    onClick={e => {
                                        e.preventDefault();
                                        let parameterSetValue = this.state.imageOptions.parameterSetValue.replace('?', '').trim()
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
                                                parameterSetValue: this.state.imageOptions.parameterSetValue,
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