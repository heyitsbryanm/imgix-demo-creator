import React from 'react';
import logo from './logo.svg';
import './css/styles.css'

import ImageCard from './modules/ImageCard'
import Group from './modules/Group'

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      lockedEditing: false,
      groups: [{
        groupOptions: {
          title: "This is the title of a group.",
          description: "This is the description of the group.",
          editingMode: true,
          imageOptions: {
            parameterSet: false,
            parameterSetValue: ''
          }
        },
        images: [{
          url: "http://bryansandbox.imgix.net/_static/images/img02.jpg",
          baseUrl: "http://bryansandbox.imgix.net/_static/images/img02.jpg",
        }]
      }]
    }
  };

  _addGroup = () => {
    let groupIndex = this.state.groups.length - 1;
    let groups = [...this.state.groups];
    let groupObject = Object.assign({}, this.state.groups[groupIndex]);

    groups.push(groupObject);
    this.setState({ groups })
  }

  _modifyState = (groupIndex,array) => {
    let arrayClone = [...this.state.groups];
    arrayClone.splice(groupIndex,1,array);
    this.setState({
      groups: arrayClone
    })

  }

  _renderGroups = () => {
    return Object.entries(this.state.groups).map(mapx => {
      console.log('mapx[0] is: ', mapx[0]);
      return <Group groupIndex={mapx[0]} group={mapx[1]} key={mapx[1].title}
        lockedEditing={this.state.lockedEditing} _modifyState={this._modifyState}
      />
    })
  }


  render() {
    return (
      <div className='App'>
        <header className='header'>
          <h1>imgix-demo-creator</h1>
          <p>Hello there! This is the imgix demo creator. We're creating a skeleton of it. This paragraph is the ehro image of the file.</p>
          <div class="pageOptions">
            <input type="checkbox" id="lockedEditing" checked={this.state.lockedEditing} onClick={() => {
              this.setState({ lockedEditing: !this.state.lockedEditing })
            }} />
            <label htmlFor="lockedEditing">Lock editing?</label>
          </div>
        </header>
        <section className='container'>

          {this._renderGroups()}
          <div className="group" hidden={this.state.lockedEditing}>
            <button className="addGroup" id="addGroup" onClick={() => {
              this._addGroup()
            }}>Add group</button>
          </div>

        </section>
      </div>
    );
  }
}

