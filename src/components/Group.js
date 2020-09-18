import React, { PureComponent } from 'react';

import ImageCard from './ImageCard';
import customParameterFunctions from '../functions/customParameterFunctions'

import _ from 'lodash'

export default class Group extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            groupOptions: this.props.group.groupOptions,
            imageOptions: this.props.group.groupOptions.imageOptions,
            title: this.props.group.groupOptions.title,
            description: this.props.group.groupOptions.description,
            hamburger: null
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
            counter += 1;
            this.setState({
                images: arrayClone
            }, () => {
                if (counter === array.length) {
                    let groupsClone = _.clone(this.props.group);
                    groupsClone.images = arrayClone;

                    this.props._modifyAppState(this.props.groupIndex, groupsClone, 'group')
                }
            })
        });
        if (array.length === 0) {

            let groupsClone = { ...this.props.group };
            groupsClone.images.push(
                {
                    baseUrl: "https://assets.imgix.net/examples/blueberries.jpg",
                    customCodeParams: "",
                    imageParameters: "w=600&h=600&fit=crop&auto=compress,format",
                    url: 'https://assets.imgix.net/examples/blueberries.jpg?w=600&h=600&fit=crop&auto=compress,format'
                });
            this.props._modifyAppState(this.props.groupIndex, groupsClone, 'group')
        }

    };

    _renderImageCard = () => {
        return Object.entries(this.props.group.images).map(mapx => {
            let [imageIndex, image] = mapx;
            return <ImageCard
                _modifyAppState={this.props._modifyAppState}
                group={this.props.group}
                groupIndex={this.props.groupIndex}
                imageIndex={imageIndex}
                key={`imageCardId_${this.props.groupIndex + imageIndex}`}
                image={image}
                customCodeParams={this.props.group.images[imageIndex].customCodeParams}
                imageOptions={this.props.group.groupOptions.imageOptions}
                lockedEditing={this.props.lockedEditing}
                _handleCustomTemplates={this._handleCustomTemplates}
            />
        })
    }

    _handleTextInputChange = (stateKey, e) => {
        this.setState({ [stateKey]: e })
    }

    _handleCustomTemplates = async () => {
        let customFunction = this.props.group.groupOptions.imageOptions.customFunction;
        if (customFunction !== 'false' && customFunction !== false) {
            await customParameterFunctions[customFunction](customFunction, this.props._modifyAppState, this.props.groupIndex, this.props.group).then((resolveFunction) => {
                return resolveFunction
            })
                .then((res) => {
                    this.props._modifyAppState(this.props.groupIndex, res);
                })
        }
    }


    render() {
        return (

            <div className={`group ${(this.props.group.groupOptions.layoutStyle || 'halfWidth')}`}>
                <div class={`options-menu ${this.state.hamburger}`} hidden={!this.props.lockedEditing}>
                    <ul>
                        <li>Move up</li>
                        <li>Move down</li>
                        <li onClick={e => {
                            let groupClone = _.cloneDeep(this.props.group);
                            groupClone.groupOptions.layoutStyle = 'halfWidth'
                            this.props._modifyAppState(this.props.groupIndex, groupClone, () => {
                                this._handleCustomTemplates();
                            })
                        }}>Half width</li>
                        <li onClick={e => {
                            let groupClone = _.cloneDeep(this.props.group);
                            groupClone.groupOptions.layoutStyle = 'fullWidth'
                            this.props._modifyAppState(this.props.groupIndex, groupClone, () => {
                                this._handleCustomTemplates();
                            })
                        }}>Full width</li>
                        <li>
                            <select onChange={(e) => {
                                let groupClone = Object.assign({}, this.props.group);
                                groupClone.groupOptions.imageOptions.customFunction = e.target.value;
                                this.props._modifyAppState(this.props.groupIndex, groupClone);
                                this._handleCustomTemplates()
                            }}>
                                <option value={false}>No custom functions</option>
                                <option value="centerFace">Center Face</option>
                            </select>
                        </li>
                    </ul>
                </div>
                <div class={`options-hamburger ${this.state.hamburger}`} onClick={(e) => {
                    if (this.state.hamburger === 'active') {
                        this.setState({ hamburger: '' })
                    } else {
                        this.setState({ hamburger: 'active' })
                    }
                }}>
                    <svg className={`options-hamburger_open  ${this.state.hamburger}`} width="30" height="30" viewBox="0 0 30 30" xmlns="http://www.w3.org/2000/svg">
                        <title>Hamburger menu</title>
                        <description>Hamburger menu button</description>
                        <path d="M30 2H0V6H30V2Z" />
                        <path d="M30 13H0V17H30V13Z" />
                        <path d="M30 24H0V28H30V24Z" />
                    </svg>
                    <svg className={`options-hamburger_close  ${this.state.hamburger}`} width="16" height="16" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
                        <path d="M16 1L1 16L0 15L15 0L16 1Z" />
                        <path d="M1 0L16 15L15 16L0 1L1 0Z" />
                    </svg>

                </div>
                <div class="section_divider"></div>
                <div className="textContentContainer">
                    <h2 className="groupTitle" hidden={!this.props.lockedEditing}>{this.state.title}</h2>
                    <h6 hidden={this.props.lockedEditing}>title</h6>
                    <input type="text" hidden={this.props.lockedEditing} className="h2 editableField heading title" value={this.state.title}
                        onChange={(e) => {
                            this._handleTextInputChange('title', e.target.value)
                        }}
                        onBlur={(e) => {
                            this.setState({ title: e.target.value }, () => {
                                let groupClone = _.cloneDeep(this.props.group);
                                groupClone.groupOptions.title = this.state.title;
                                this.props._modifyAppState(this.props.groupIndex, groupClone)
                            });
                        }} />

                    <p hidden={!this.props.lockedEditing} className="groupDescription">{this.props.group.groupOptions.description}</p>
                    <h6 hidden={this.props.lockedEditing}>description</h6>
                    <input type="text" hidden={this.props.lockedEditing} className="h2 groupDescription p editableField heading description" placeholder="Enter a description" value={this.state.description}
                        onChange={(e) => {
                            this._handleTextInputChange('description', e.target.value)
                        }}
                        onBlur={(e) => {
                            this.setState({ description: e.target.value }, () => {
                                let groupClone = _.cloneDeep(this.props.group);
                                groupClone.groupOptions.description = this.state.description;
                                this.props._modifyAppState(this.props.groupIndex, groupClone)
                            });
                        }} />
                </div>
                <div hidden={this.props.lockedEditing} className="optionsContainer">

                    <div>
                        <ul>
                            <label htmlFor="setGroupWidth"></label>
                            <form className="group-parameters">
                                <div className="area1">
                                    <label htmlFor="groupParametersValue">Apply parameter set here</label>
                                    <input type="text" id="groupParametersValue" placeholder="ex: ?w=400&h=500...." value={this.state.imageOptions.parameterSetValue}
                                        onChange={e => {
                                            this.setState({
                                                imageOptions: {
                                                    parameterSet: this.props.group.groupOptions.imageOptions.parameterSet,
                                                    parameterSetValue: e.target.value
                                                }
                                            })
                                        }}
                                    ></input>
                                </div>
                                <button className="button button1" type="submit"
                                    onClick={e => {
                                        e.preventDefault();
                                        let parameterSetValue = this.state.imageOptions.parameterSetValue.replace('?', '').trim();

                                        this.setState({
                                            imageOptions: {
                                                parameterSetValue: parameterSetValue,
                                                parameterSet: this.props.group.groupOptions.imageOptions.parameterSet
                                            }
                                        }, () => {
                                            let groupClone = Object.assign({}, this.props.group);
                                            groupClone.groupOptions.imageOptions.parameterSetValue = this.state.imageOptions.parameterSetValue;
                                            groupClone.groupOptions.imageOptions.parameterSet = true;
                                            groupClone.groupOptions.imageOptions.appendParameterSet = false;
                                            this.props._modifyAppState(this.props.groupIndex, groupClone, () => {
                                                this._handleCustomTemplates();
                                            });
                                        })

                                    }}
                                >Apply parameters</button>
                                <button className="button button2" type="submit"
                                    onClick={e => {
                                        e.preventDefault();
                                        let parameterSetValue = this.state.imageOptions.parameterSetValue.replace('?', '').trim();

                                        this.setState({
                                            imageOptions: {
                                                parameterSetValue: parameterSetValue,
                                                parameterSet: this.props.group.groupOptions.imageOptions.parameterSet
                                            }
                                        }, () => {
                                            let groupClone = Object.assign({}, this.props.group);
                                            groupClone.groupOptions.imageOptions.parameterSetValue = this.state.imageOptions.parameterSetValue;
                                            groupClone.groupOptions.imageOptions.parameterSet = false;
                                            groupClone.groupOptions.imageOptions.appendParameterSet = true;
                                            this.props._modifyAppState(this.props.groupIndex, groupClone, () => {
                                                this._handleCustomTemplates();
                                            });
                                        })
                                    }}
                                >Append parameters</button>
                                <button className="button button3" type="submit"
                                    onClick={e => {
                                        e.preventDefault();
                                        let parameterSetValue = this.state.imageOptions.parameterSetValue.replace('?', '').trim();
                                        this.setState({
                                            imageOptions: {
                                                parameterSetValue: parameterSetValue,
                                                parameterSet: this.props.group.groupOptions.imageOptions.parameterSet
                                            }
                                        }, () => {
                                            let groupClone = Object.assign({}, this.props.group);
                                            groupClone.groupOptions.imageOptions.parameterSetValue = this.state.imageOptions.parameterSetValue;
                                            groupClone.groupOptions.imageOptions.parameterSet = false;
                                            groupClone.groupOptions.imageOptions.appendParameterSet = false;
                                            this.props._modifyAppState(this.props.groupIndex, groupClone, () => {
                                                this._handleCustomTemplates();
                                            });
                                        })
                                    }}
                                >Unset group parameters</button>

                            </form>
                        </ul>
                    </div>

                </div>

                <div className="images-container">
                    {this._renderImageCard()}
                    <div className="image-card card emptyCard" hidden={this.props.lockedEditing}>
                        <div className="svgContainer">
                            <svg viewBox="0 0 67 67" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <title>Add image</title>
                                <description>Add image</description>
                                <path d="M0 0H67V67H0V0Z" />
                                <path d="M0 8.375V46.0625H16.75H46.0625H50.25V8.375H0ZM46.0625 37.6875L33.5 20.9375L20.5188 37.2687L12.5625 29.3125L4.1875 37.6875V12.5625H46.0625V37.6875Z" fill="white" />
                                <path d="M12.5625 25.125C14.8752 25.125 16.75 23.2502 16.75 20.9375C16.75 18.6248 14.8752 16.75 12.5625 16.75C10.2498 16.75 8.375 18.6248 8.375 20.9375C8.375 23.2502 10.2498 25.125 12.5625 25.125Z" fill="white" />
                                <path d="M58.625 54.4375V12.5625H54.4375V50.6688H4.1875V54.4375H58.625Z" fill="white" />
                                <path d="M62.8125 20.9375V59.0438H12.5625V62.8125H67V20.9375H62.8125Z" fill="white" />
                                <path d="M0 0V-2H-2V0H0ZM67 0H69V-2H67V0ZM67 67V69H69V67H67ZM0 67H-2V69H0V67ZM0 2H67V-2H0V2ZM65 0V67H69V0H65ZM67 65H0V69H67V65ZM2 67V0H-2V67H2Z" />
                            </svg>
                        </div>

                        <div className="card-info-container center">
                            <button className="addImage button" onClick={(e) => {
                                this._addImageCard();
                            }}>Add image</button>
                            <button className="deleteGroup button danger" id="deleteGroup" onClick={(e) => {
                                let groupsClone = [...this.props.groups];
                                groupsClone = groupsClone.filter((x, y) => {
                                    return this.props.groupIndex != y
                                })
                                this.props._modifyAppState(this.props.groupIndex, groupsClone, () => {
                                    this._handleCustomTemplates();
                                })
                            }}>Delete group</button>
                        </div>
                    </div>
                </div>
            </div>

        )
    }
}