import React from 'react';
import logo from './logo.svg';
import './css/styles.css'

import ImageCard from './modules/ImageCard'


export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      groups: [{
        groupOptions: {

        },
        images: [{
          url: "http://bryansandbox.imgix.net/_static/images/img02.jpg"
        }]
      }]
    }
  };

  _addImage = () => {
    let blankImage = this.state.images[0];
    let groups = this.state.groups[0].images.push(blankImage);
    this.setState({
      groups: groups
    })
  }

  render() {
    return (
      <div className='App'>
        <header className='header'>
          <h1>imgix-demo-creator</h1>
          <p>Hello there! This is the imgix demo creator. We're creating a skeleton of it. This paragraph is the ehro image of the file.</p>
        </header>
        <section className='container'>

          <div>
            This div should contain the container's options. Such as:
            <ul>
              <li>Apply parameter set</li>
              <li>Use `srcsets`</li>
              <ul>
                <li>Or, to use individual parameters per image</li>
                <li>Option to apply custom code to create parameters. Like, a script</li>
              </ul>
              <li>Use `srcsets`</li>
              <ul>
                <li>Option to use a custom sizes attribute for a group of images</li>
              </ul>
              <li>Option to make set images to “fill” container or to </li>
              <li>Option to apply all changes and reload images</li>
            </ul>
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

            <ImageCard
            images={this.state.groups[0].images}/>
            <div class="card">
              <button class="addImage" id="addImage">Add image</button>
            </div>
          </div>
        </section>
      </div>
    );
  }
}

