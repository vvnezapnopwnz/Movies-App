import { Component } from "react";
import "./search-panel.css";

export default class SearchPanel extends Component {
  constructor() {
    super();
    this.onLabelChange = (event) => {
        const { value } = event.target
        const { onSearch } = this.props
        onSearch(value)
      }
  }

  render () {
    return (
        <div className="search-panel" placeholder="Type to search...">
            <form className="search-panel__form" >
            <input value={this.props.searchQuery} onChange={this.onLabelChange}
                type="text"
                className="search-panel__input"/>
            </form>
      </div>
    )
  }
}