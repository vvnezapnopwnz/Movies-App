import React, { Component } from 'react';
import { Offline } from 'react-detect-offline';
import { Pagination } from 'antd';

import MovieService from '../../services/movie-service';
import './App.css';
import { MoviesList } from '../MoviesList';
import { Header } from '../Header';

// import _ from 'lodash';

import GenreContext from '../GenresContext/GenresContext.js';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      status: 'loading',
      data: null,
      page: 1,
      searchQuery: null,
      total_results: 0,
    };
    this.movieService = new MovieService();

    this.onSearch = (query) => {
      const promise = new Promise((resolve) => {
        this.setState({ status: 'loading', searchQuery: query });
        resolve(this.movieService.getResources(query));
      });
      promise
        .then(({ results, total_results, page }) => {
          console.log({ onSearch: results });
          // console.log({ results, ...data })
          return {
            results: results.map(this.movieService._transformMovieData),
            total_results,
            page,
          };
        })
        .then(({ results, total_results, page }) => {
          // console.log(results);
          this.setState({
            data: results,
            status: 'success',
            total_results,
            page,
          });
        })
        .catch(() => {
          this.setState({ status: 'error' });
        });
    };

    this.onPaginationChange = (page) => {
      const promise = new Promise((resolve) => {
        this.setState({ status: 'loading' });
        resolve(this.movieService.getResources(this.state.searchQuery, page));
      });
      promise
        .then(({ results, page, total_results }) => ({
          results: results.map(this.movieService._transformMovieData),
          page,
          total_results,
        }))
        .then(({ results, page, total_results }) => {
          this.setState({
            data: results,
            status: 'success',
            page,
            total_results,
          });
        })
        .catch(() => {
          this.setState({ status: 'error' });
        });
    };

    this.onMovieRate = async (value, movieId) => {
      this.movieService.rateMovie(value, movieId);
      // .then((data) => console.log(data));
    };

    this.onRatedTab = () => {
      // console.log("a");
      this.setState({ status: 'loading' });
      this.movieService
        .getRatedMovies()
        .then(({ results, page, total_results }) => {
          // console.log({ results, page, total_results });
          const newRes = results.map(this.movieService._transformMovieData);
          this.setState({
            data: newRes,
            page,
            total_results,
            status: 'success',
          });
        })
        .catch(() => {
          this.setState({ status: 'error' });
        });
    };
  }

  componentDidMount() {
    console.log("ComponentDidMount()");
    this.movieService
      .createGuestSession()
      .then(() => this.movieService.getGenres())
      .then(({ genres }) => {
        console.log(genres);
        this.setState({ genres });
      })
      .then(() => this.movieService.getResources())
      .then(({ results, ...pageData }) =>
        // console.log({ results, ...pageData })
        ({
          results: results.map(this.movieService._transformMovieData),
          ...pageData,
        })
      )
      .then(({ results, total_results, page }) => {
        this.setState({
          data: results,
          status: 'success',
          page,
          total_results,
        });
      })
      .catch(() => {
        this.setState({ status: 'error' });
      });
  }

  render() {
    const { status, data } = this.state;

    return (
      <div className="app">
        <Header
          onEdit={this.onEdit}
          editInput={this.editInput}
          searchQuery={this.searchQuery}
          onSearch={this.onSearch}
          onRatedTab={this.onRatedTab}
        />
        <GenreContext.Provider value={this.state.genres}>
          <MoviesList
            data={data}
            status={status}
            onMovieRate={this.onMovieRate}
          />
        </GenreContext.Provider>
        <Pagination
          className="pagination"
          current={this.state.page}
          onChange={(num) => this.onPaginationChange(num)}
          total={this.state.total_results}
          pageSize={20}
          hideOnSinglePage
          showSizeChanger={false}
          showLessItems
          showQuickJumper={false}
          showTotal={false}
        />
        <Offline>You are currently offline</Offline>
      </div>
    );
  }
}
