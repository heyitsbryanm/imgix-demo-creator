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
      sharedUrl: '',
      groups: [{
        groupOptions: {
          title: "This is the title of a group.",
          description: "This is the description of the group.",
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

  _modifyState = (groupIndex, array) => {
    let arrayClone = [...this.state.groups];
    arrayClone.splice(groupIndex, 1, array);
    this.setState({
      groups: arrayClone
    })

  }

  _renderGroups = () => {
    return Object.entries(this.state.groups).map(mapx => {
      return <Group groupIndex={mapx[0]} group={mapx[1]} key={mapx[1].title}
        lockedEditing={this.state.lockedEditing} _modifyState={this._modifyState}
      />
    })
  }

  _sharePreview = () => {
    let sharedUrl = window.location.host + '?load=' + btoa(JSON.stringify(this.state));
    this.setState({ sharedUrl })
  }

  componentDidMount() {
    console.log('updated')
    let param = window.location.search.replace('?', '');
    if (param.length > 0 && param.toLowerCase().indexOf('load=') > -1) {
      param = param.split('&').filter(x => x.includes('load'))[0].split('=')[1];
      console.log('JSON.parse(atob(param)) is: ',JSON.parse(atob(param)))
      this.setState(JSON.parse(atob(param)))
      // console.log(JSON.parse(atob(param)))
    }
  }

  render() {
    return (
      <div className='App'>
        <header className='header'>
          {/* {this._loadPreview()} */}
          <h1>imgix-demo-creator</h1>
          <p>Hello there! This is the imgix demo creator. We're creating a skeleton of it. This paragraph is the ehro image of the file.</p>
          <div class="pageOptions">
            <p>{this.state.sharedUrl}</p>
            <button onClick={(e) => {
              e.preventDefault();
              { this._sharePreview() };
            }}>Share preview</button>
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

