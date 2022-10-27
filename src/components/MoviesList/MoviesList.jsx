import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Row, Spin, Alert } from 'antd'
import './MoviesList.css'
import { SingleMovie } from '../SingleMovie'

export default class MoviesList extends Component {
  constructor(props) {
    super(props)
    this.renderCards = () => {
      const { data, onMovieRate } = this.props
      return data.map(({ id, title, description, posterPath, releaseDate, genreIds, voteAverage, rating }) => {
        return (
          <SingleMovie
            key={id}
            title={title}
            description={description}
            imgPath={posterPath}
            releaseDate={releaseDate}
            genreIds={genreIds}
            voteAverage={voteAverage}
            onMovieRate={onMovieRate}
            movieId={id}
            rating={rating}
          />
        )
      })
    }
  }

  render() {
    const { status } = this.props
    if (status === 'loading') {
      return <Spin size="large" />
    } else if (status === 'success') {
      return (
        <Row gutter={[32, 32]} className="movies-list">
          {this.renderCards()}
        </Row>
      )
    } else {
      return <Alert message="Something went wrong" description="Can't get movies" type="error" showIcon />
    }
  }
}
MoviesList.defaultProps = {
  data: null,
  status: 0,
  onMovieRate: () => {},
}

MoviesList.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
      releaseDate: PropTypes.string.isRequired,
      voteAverage: PropTypes.number.isRequired,
      rating: PropTypes.number,
      genres: PropTypes.arrayOf(
        PropTypes.shape({
          id: PropTypes.number.isRequired,
          name: PropTypes.string.isRequired,
        })
      )
    })),
  status: PropTypes.string,
  onMovieRate: PropTypes.func,
}
