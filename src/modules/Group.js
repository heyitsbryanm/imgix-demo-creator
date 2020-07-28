import React, { PureComponent } from 'react';

import ImageCard from './ImageCard';

export default class Group extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            images: this.props.group.images
        }
    }

    _addImageCard = (array) => {
        array.map(mapx => {
            let index = array.length - 1;
            let arrayClone = [...array];
            let arrayObject = Object.assign({}, array[index]);

            console.log('array is: ',array)
            arrayClone.push(arrayObject);
            console.log(this.state)
            this.setState({
                images: arrayClone
            })
        })
    };

    _renderImageCard = () => {
        return this.state.images.map(mapx => {
            return <ImageCard image={mapx} key={mapx.title}
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
                <div className="optionsContainer">


                    <div>
                        This div should contain the container's options. Such as:
          <ul>
                            <h3>Bulk parameter editing</h3>
                            <form>
                                <label htmlFor="groupParametersValue">Apply parameter set here</label>
                                <input type="text" id="groupParametersValue"></input>
                                <button type="submit">Apply parameters</button>
                                <button type="submit">Use individual parameters</button>
                            </form>
                        </ul>
                    </div>

                </div>

                {/* What design options should users have over groups?

          - Option to edit a group’s name
          - Option to add a description to a group
          - Option to add a group above
          - Option to add a group below
          - Option to make a group full width
          - Option to make a group half size
          - Option to delete a group
          - Option to duplicate a group
          - Option to restrict image size
              - Option to not restrict image size
          - Option to re-organize a group */}


                <div className="images-container">
                {this._renderImageCard()}
                    <div className="card">
                        <button className="addImage" id="addImage" onClick={(e) => {
                            this._addImageCard(this.state.images)
                        }}>Add image</button>
                    </div>
                </div>
            </div>

        )
    }
}