import React, { Component } from "react";
import "./bulma_theme.css";
import axios from "axios";
import "./index.css";

class App extends Component {
  state = {
    shortcuts: [],
    source: "data",
    value: null
  };

  constructor() {
    super();
    this.filterList = this.filterList.bind(this);
  }

  componentDidMount() {
    this.getData();
  }

  getData() {
    axios.get(`./` + this.state.source + `.json`).then(response => {
      this.setState({
        shortcuts: response.data.windows
      });
    });
  }

  filterList(e) {
    this.setState({
      value: e.target.value.charAt(0).toUpperCase() + e.target.value.slice(1)
    });
  }

  render() {
    const list =
      this.state.value == null || ""
        ? this.state.shortcuts
        : this.state.shortcuts.filter(
            shortcut =>
              shortcut.command.includes(this.state.value) && shortcut.command
          );

    return (
      <div>
        <div className="hero section is-medium is-primary is-bold">
          <div className="container has-text-centered">
            <div className="title has-text-dark is-size-1">Faster <span className='has-text-white'>VSCode</span>  </div>
            <div className="subtitle has-text-dark is-size-5">
              List of shortcuts of VSCode to code with efficiency <br />
              <span className="subtitle has-text-grey-dark is-size-7">
                {" "}
                Made by{" "}
                <a
                  href="https://twitter.com/tarekhassan"
                  rel="noopener noreferrer"
                  className="has-text-link"
                  target="_blank"
                >
                  {" "}
                  @tarekhassan{" "}
                </a>{" "}
              </span>
            </div>

            <div className="field">
              <p className="control has-icons-left has-icons-right">
                <input
                  onChange={this.filterList}
                  className="input is-primary is-radiusless is-medium"
                  type="email"
                  placeholder="Search commands 'Cut', 'Copy', 'Delete, 'Toggle' etc "
                />
                <span className="icon is-small is-left">
                  <i className="fas fa-search" />
                </span>
              </p>
            </div>
          </div>
        </div>

        <div className="section">
          <div className="container has-text-centered" style={{ overflowX:'auto' }}>
            <table className="table is-fullwidth is-striped is-hoverable" >
              <thead>
                <tr>
                  <th className="is-size-4">Command</th>
                  <th className="is-size-4">Key</th>
                </tr>
              </thead>
              <tbody>
                {list.map((s, i) => (
                  <tr key={i}>
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
