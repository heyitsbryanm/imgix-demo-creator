import React from 'react';
import logo from './logo.svg';
import './css/styles.css'

import ImageCard from './modules/ImageCard'
import Group from './modules/Group'

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      groups: [{
        groupOptions: {
          title: "This is the title of a group.",
          description: "This is the description of the group.",
          editingMode: true,
          parameterSet: undefined
        },
        images: [{
          url: "http://bryansandbox.imgix.net/_static/images/img02.jpg"
        }]
      }]
    }
  };

  _addGroup = () => {
    let groupIndex = this.state.groups.length - 1;
    let groups = [...this.state.groups];
    let groupObject = Object.assign({},this.state.groups[groupIndex]);
    
    groups.push(groupObject);
    this.setState({groups})
  }

  _renderGroups = () => {
    return this.state.groups.map(mapx => {
      return <Group group={mapx} key={mapx.title}
        testing={this.testing}
      />
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

          {this._renderGroups()}
          <div className="group">
            <button className="addGroup" id="addGroup" onClick={()=>{
              this._addGroup()
            }}>Add group</button>
          </div>

        </section>
      </div>
    );
  }
}

