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
    this.capitalize = this.capitalize.bind(this);

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

  capitalize(text){
    text = text.toLowerCase()
    .split(' ')
    .map((s) => s.charAt(0).toUpperCase() + s.substring(1))
    .join(' ');
    return text
  }

  filterList(e) {
    this.setState({
      value: e.target.value.toLowerCase()
    });
  }

  render() {
    const list =
      this.state.value == null || ""
        ? this.state.shortcuts
        : this.state.shortcuts.filter(
            shortcut =>
              shortcut.command.toLowerCase().includes(this.state.value)  && shortcut.command
          );

    return (
      <div>
        <div className="hero section is-medium is-primary is-bold">
          <div className="container has-text-centered">
            <div className="title has-text-dark is-size-1">Faster VS Coder  </div>
            <div className="subtitle has-text-dark is-size-5">
              Search, learn and code faster with VS Code editor shortcuts <br />
              <span className="subtitle has-text-grey-dark is-size-7 has-text-centered">
                {" "}
                Made with <i className="fas fa-heart" /> by{" "}
                <a
                  href="https://twitter.com/tarekhassan"
                  rel="noopener noreferrer"
                  className="has-text-link"
                  target="_blank"
                >
                  {" "}
                  @tarekhassan{" "}
                  </a>
                  <div className=" is-grouped has-text-centered">
              <a className="button github-button" href="https://github.com/tarekhassan410/FasterVSCoder" aria-label="Star tarekhassan410/FasterVSCoder on GitHub">Star</a>
              <a className="button github-button" href="https://github.com/tarekhassan410/FasterVSCoder/fork" aria-label="Fork tarekhassan410/FasterVSCoder on GitHub">Fork</a>
              </div>
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
