import { Component } from "react";
import { Offline, Detector } from "react-detect-offline";
import MovieService from "../../services/movie-service";
import "./app.css";
import MovieList from "../movies-list";

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      status: "loading",
      data: null,
    };
    this.movieService = new MovieService();

    this.movieService
      .getResources()
      .then(({ results }) => {
        return results.map(this.movieService._transformMovieData);
      })
      .then((results) => {
        this.setState({ data: results, status: "success" });
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
                <MovieList data={data} status={status} />
              ) : (
                <Offline>Only shown offline (surprise!)</Offline>
              )}
            </div>
          )}
        />
      </div>
    );
  }
}
