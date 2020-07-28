import React, { PureComponent } from 'react';

import ImageCard from './ImageCard';

export default class Group extends PureComponent {
    constructor(props) {
        super(props)
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

                    {/* <ImageCard
                        images={this.props.group.images} /> */}
                    <div className="card">
                        <button className="addImage" id="addImage">Add image</button>
                    </div>
                </div>
            </div>

        )
    }
}