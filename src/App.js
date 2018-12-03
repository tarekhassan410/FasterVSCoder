import React, { Component } from "react";
import "./bulma_theme.css";
import axios from "axios";

class App extends Component {
  state = {
    shortcuts: [],
    source: 'data',
    value: null
  };

  constructor(){
    super()
    this.filterList = this.filterList.bind(this)
  }

  componentDidMount() {
    this.getData()
  }

  getData(){
    axios.get(`./` + this.state.source + `.json`).then(response => {
      this.setState({
        shortcuts: response.data.windows
      });
    });
  }

  filterList(e){
    this.setState({
      value: e.target.value.charAt(0).toUpperCase() + e.target.value.slice(1)
    })
    
  }

  render() {

    const list = this.state.value == null || '' ? this.state.shortcuts : this.state.shortcuts.filter( shortcut => shortcut.command.includes(this.state.value) && shortcut.command  )

    return (
      <div>
        <div className="hero section is-medium is-primary is-bold">
          <div className="container has-text-centered">
            <div className="field">
              <p className="control has-icons-left has-icons-right">
                <input onChange={this.filterList} className="input is-primary is-radiusless is-medium" type="email" placeholder="Search commands 'Cut', 'Copy', 'Delete, 'Toggle' etc " />
                <span className="icon is-small is-left">
                  <i className="fas fa-search" />
                </span>
              </p>
            </div>
          </div>
        </div>

        <div className="section">
          <div className="container">
            <table className="table is-fullwidth is-striped is-hoverable">
              <thead className="">
                <tr>
                <th>Command</th>
                  <th>Key</th>
                </tr>
              </thead>
              <tbody>
                {list.map((s, i) => (
                  <tr key={i} className="menu-list">
                    <td>{s.command}</td>
                    <td>{s.key}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
