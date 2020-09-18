import React from 'react';
import './css/styles.css'
import _ from 'lodash';

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
      let loadedData = JSON.parse(atob(param));
      delete loadedData.sharedUrl;
      this.setState(loadedData)
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
            layoutStyle: 'halfWidth',
            imageOptions: {
              parameterSet: false,
              parameterSetValue: '',
              appendParameterSet: false,
              customFunction: false
            }
          },
          images: [{
            url: "http://bryansandbox.imgix.net/_static/images/img02.jpg?w=500&auto=compress,format",
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
    let groups = _.cloneDeep(this.state.groups);
    let groupObject = Object.assign({}, this.state.groups[groupIndex]);

    groups.push(groupObject);
    this.setState({ groups })
  }

  _modifyAppState = (groupIndex, array, callback) => {
    let arrayClone = _.cloneDeep(this.state.groups);
    if (typeof (array.groupOptions) == 'undefined') {
      arrayClone = array;
    } else {
      arrayClone.splice(groupIndex, 1, array);
    }
    this.setState({
      groups: arrayClone
    }, () => {
      if (typeof callback == "function") {
        callback();
      }
    })

  }

  _renderGroups = () => {
    return Object.entries(this.state.groups).map(mapx => {
      let [groupIndex, group] = mapx;
      return <Group groupIndex={groupIndex} group={group} key={'group_key_' + groupIndex}
        lockedEditing={this.state.lockedEditing} _modifyAppState={this._modifyAppState} groups={this.state.groups}
      />
    })
  }

  _sharePreview = () => {
    let newState = { ...this.state };
    delete newState.sharedUrl;

    let sharedUrl = window.location.host + '?load=' + btoa(JSON.stringify(newState));
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
          <header className='page-header'>
            <div className="page-width">
              <div className="page-width-inner">
                <div class="logo">
                  <div class="logo__item logo__image lightBlue logoPlaceholder">DEMO GENERATOR&nbsp;</div>
                  <div class="logo__item logo__powered">
                    <span class="logo__powered__item logo__powered__text">codepen by the</span>
                    <span class="logo__powered__item logo__powered__logo">&nbsp;imgix support team</span>.
                  </div>
                </div>
                <div className="pageOptions">
                  <button className="button" onClick={(e) => {
                    e.preventDefault();
                    { this._sharePreview() };
                  }}>Generate a preview link</button>
                  <button className={`button danger lockedEditing ${this.state.lockedEditing}`} onClick={(e) => {
                    this.setState({ lockedEditing: !this.state.lockedEditing });
                    e.preventDefault();
                  }}>Lock editing</button>
                  <button className={`button danger unlockEditing ${this.state.lockedEditing}`} onClick={(e) => {
                    this.setState({ lockedEditing: !this.state.lockedEditing })
                    e.preventDefault();
                  }}>Unlock editing</button>
                </div>
                <a href={this.state.sharedUrl} target="_blank" rel="noopener noreferrer" >{this.state.sharedUrl}</a>

              </div>
            </div>
          </header>

          <section className="fold">
            <div className="page-width">
              <div className="page-width-inner">
                <h1 className="mainTitle white" hidden={!this.state.lockedEditing}>{this.state.title}</h1>
                <h6 hidden={this.state.lockedEditing}>Title</h6>
                <input hidden={this.state.lockedEditing} className="h1 editableField title" value={this.state.title}
                  onChange={(e) => {
                    this._handleTextInputChange('title', e.target.value)
                  }}
                  onBlur={(e) => {
                    this.setState({ title: e.target.value });
                  }} />

                <h2 className="mainDescription subtitle" hidden={!this.state.lockedEditing}>{this.state.description}</h2>
                <h6 hidden={this.state.lockedEditing}>Description</h6>
                <input hidden={this.state.lockedEditing} className="mainDescription subtitle h2 editableField" value={this.state.description}
                  onChange={(e) => {
                    this._handleTextInputChange('description', e.target.value)
                  }}
                  onBlur={(e) => {
                    this.setState({ description: e.target.value });
                  }} />
              </div>
            </div>
          </section>

          <section className='container main-content'>
            <div className="page-width">
              <div className="page-width-inner">
                {this._renderGroups()}
                <div className="group placeholder-group" hidden={this.state.lockedEditing}  onClick={() => {

                      this._addGroup()
                    }}>
                  <div>
                    <div className='placeholder-svg'>
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
                    <button className="addGroup button" id="addGroup">Add group</button>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      );
    }
  }
}

