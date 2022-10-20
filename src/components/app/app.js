import React, { Component } from "react";
import { Offline, Detector } from "react-detect-offline";
import MovieService from "../../services/movie-service";
import "./app.css";
import MovieList from "../movies-list";
import SearchPanel from "../search-panel";
// import _ from 'lodash';
import { Pagination } from "antd";

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      status: "loading",
      data: null,
      page: 1,
      total_pages: 0,
      searchQuery: null,
    };
    this.movieService = new MovieService();

      this.onSearch = (query) => {
        const promise = new Promise((resolve, reject) => {
          this.setState({ status: "loading", searchQuery: query });
          resolve(this.movieService
          .getResources(query))
        })

        promise.then(({ results }) => {
          return results.map(this.movieService._transformMovieData);
        }).then((results) => {
          this.setState({ data: results, status: "success"})
        })
      }

      this.onPaginationChange = (page) => {
        const promise = new Promise((resolve, reject) => {
          this.setState({ status: "loading"})
          resolve(this.movieService
          .getResources(this.state.searchQuery, page))
        })

        promise.then(({ results, page, total_pages }) => {
          return {results:results.map(this.movieService._transformMovieData), page, total_pages};
        }).then(({results, page, total_pages}) => {
          this.setState({ data: results, status: "success", page, total_pages})
        })
      }
  }

  componentDidMount () {
    this.movieService
    .getResources()
    .then(({ results, ...pageData }) => {
      return {results: results.map(this.movieService._transformMovieData), ...pageData};
    })
    .then(({results, total_pages, page}) => {
      this.setState({ data: results, status: "success", page, total_pages });
    }).catch((error) => {
      this.setState({ status: "error"})
    })
  }

  render() {
    const { status, data } = this.state;

    return (
      <div className="app">
        <Detector
          render={({ online }) => (
            <div className={online ? "container" : null}>
              {online ? (
                <React.Fragment>
                <SearchPanel 
                  onEdit={this.onEdit}
                  editInput={this.editInput}
                  searchQuery={this.searchQuery}
                  onSearch={this.onSearch}/>
                <MovieList data={data} status={status} />
                <Pagination
                  className="pagination"
                  current={this.state.page}
                  onChange={(num) => this.onPaginationChange(num)}
                  total={this.state.total_pages}
                  pageSize={20}
                  hideOnSinglePage
                />
                </React.Fragment>

              ) : (
                <Offline>You are currently offline</Offline>
              )}
            </div>
          )}
        />
      </div>
    );
  }
}
