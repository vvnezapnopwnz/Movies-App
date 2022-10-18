import { Component } from "react";
import { Row, Spin, Alert } from "antd";
import "./movies-list.css";
import SingleMovie from "../single-movie";

export default class MoviesList extends Component {
  constructor(props) {
    super(props);
    this.renderCards = () => {
      const { data } = this.props;
      return data.map(({id, title, description,posterPath,
        releaseDate, genreIds, voteAverage}) => {
        return (
          <SingleMovie
            key={id}
            title={title}
            description={description}
            imgPath={posterPath}
            releaseDate={releaseDate}
            genreIds={genreIds}
            voteAverage={voteAverage}
          />
        );
      });
    };
  }

  render() {
    const { status } = this.props;
    if (status === "loading") {
      return  <Spin size="large" />;
    } else if (status === "success") {
      return (
        <Row gutter={[32, 32]} className="movies-list">
          {this.renderCards()}
        </Row>
      );
    } else {
      return (
        <Alert
        message="Something went wrong"
        description="Can't get movies"
        type="error"
        showIcon
      />
      )
    }
  }
}
