import { Component } from "react";
import { Col, Card, Image } from "antd";
import "./single-movie.css";

export default class SingleMovie extends Component {
  constructor() {
    super();
    this.imgBase = "https://image.tmdb.org/t/p/w500";
  }

  render() {
    const { title, imgPath, description, releaseDate } = this.props;
    const imgLink = this.imgBase + imgPath;
    const image = imgPath ? <Image src={imgLink} alt={title} /> : null;
    return (
      <Col xs={24} md={12}>
        <Card>
          <div className="single-movie">
            <div className="single-movie__img">{image}</div>
            <div className="single-movie__info">
              <h5 className="single-movie__title">{title}</h5>
              <div className="single-movie__date">{releaseDate}</div>
              <div className="single-movie__genres">
                <span className="genre">Action</span>
                <span className="genre">Drama</span>
              </div>
              <div className="single-movie__description"><span>{description}</span></div>
            </div>
          </div>
        </Card>
      </Col>
    );
  }
}
