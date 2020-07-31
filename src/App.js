import React from 'react';
import './css/styles.css'

import Group from './components/Group'

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: null
    }
  };

  componentDidMount() {
    let param = window.location.search.replace('?', '');
    if (param.length > 0 && param.toLowerCase().indexOf('load=') > -1) {
      param = param.split('&').filter(x => x.includes('load'))[0].split('=')[1];
      this.setState(JSON.parse(atob(param)))
    } else {
      this.setState({
        data: true,
        lockedEditing: false,
        sharedUrl: '',
        title: 'imgix demo creator',
        description: 'Welcome to the imgix demo creator. You can use this tool to create visual comparisons between images, separated into groups.',
        groups: [{
          groupOptions: {
            title: "This is the title of a group.",
            description: "This is the description of the group.",
            imageOptions: {
              parameterSet: false,
              parameterSetValue: '',
              customFunction: false
            }
          },
          images: [{
            url: "http://bryansandbox.imgix.net/_static/images/img02.jpg",
            baseUrl: "http://bryansandbox.imgix.net/_static/images/img02.jpg",
            customCodeParams: '',
            imageParameters: 'w=500&auto=compress,format'
          }]
        }]
      }, () => {
      })
    }
  }

  _addGroup = () => {
    let groupIndex = this.state.groups.length - 1;
    let groups = [...this.state.groups];
    let groupObject = Object.assign({}, this.state.groups[groupIndex]);

    groups.push(groupObject);
    this.setState({ groups })
  }

  _modifyAppState = (groupIndex, array, callback) => {
    let arrayClone = [...this.state.groups];
    arrayClone.splice(groupIndex, 1, array);
    this.setState({
      groups: arrayClone
    }, () => {
      if (typeof callback == "function"){
        callback();
      }
    })

  }

  _renderGroups = () => {
    return Object.entries(this.state.groups).map(mapx => {
      let [groupIndex, group] = mapx;
      return <Group groupIndex={groupIndex} group={group} key={group.title + groupIndex}
        lockedEditing={this.state.lockedEditing} _modifyAppState={this._modifyAppState}
      />
    })
  }

  _sharePreview = () => {
    let sharedUrl = window.location.host + '?load=' + btoa(JSON.stringify(this.state));
    this.setState({ sharedUrl });
  }

  _handleTextInputChange = (stateKey, e) => {
    this.setState({ [stateKey]: e })
  }

  render() {
    if (!this.state.data) {
      return <div />
    } else {
      return (
        <div className='App'>
          <header className='header'>
            <div className="pageOptions">
              <a href={this.state.sharedUrl} target="_blank" rel="noopener noreferrer" >{this.state.sharedUrl}</a>
              <button onClick={(e) => {
                e.preventDefault();
                { this._sharePreview() };
              }}>Generate a preview link</button>
              <input type="checkbox" id="lockedEditing" checked={this.state.lockedEditing} onChange={() => {
                this.setState({ lockedEditing: !this.state.lockedEditing })
              }} />
              <label htmlFor="lockedEditing">Lock editing?</label>
            </div>

            <h1 className="mainTitle" hidden={!this.state.lockedEditing}>{this.state.title}</h1>
            <h1 hidden={this.state.lockedEditing}>Title</h1>
            <textarea hidden={this.state.lockedEditing} className="h1 editableField title" value={this.state.title}
              onChange={(e) => {
                this._handleTextInputChange('title', e.target.value)
              }}
              onBlur={(e) => {
                this.setState({ title: e.target.value });
              }} />

            <p className="mainDescription" hidden={!this.state.lockedEditing}>{this.state.description}</p>
            <p hidden={this.state.lockedEditing}>Title</p>
            <textarea hidden={this.state.lockedEditing} className="p editableField description" value={this.state.description}
              onChange={(e) => {
                this._handleTextInputChange('description', e.target.value)
              }}
              onBlur={(e) => {
                this.setState({ description: e.target.value });
              }} />
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
}

