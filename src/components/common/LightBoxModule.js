import React, { Component } from 'react';
import Lightbox from 'react-image-lightbox';

export default class LightBoxModule extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpenLightbox: props.isOpenLightbox,
      photos: props.photos,
      photoIndex: props.photoIndex,
      album: props.album
    };
  }
  render() {
    const { photos, photoIndex, album } = this.state;
    return (
      <Lightbox
        mainSrc={photos[photoIndex].original_image}
        nextSrc={" "}
        prevSrc={" "}
        onCloseRequest={this.props.closeLightBox}
        onMovePrevRequest={() =>
          this.setState({
            photoIndex: (photoIndex + photos.length - 1) % photos.length
          })}
        onMoveNextRequest={() =>
          this.setState({
            photoIndex: (photoIndex + 1) % photos.length
          })}
        imageTitle={
          album.cover_photo.image && !photos[photoIndex] ? (
            album.cover_photo.image_file_name
          ) : (
            photos[photoIndex].image_file_name
          )
        }
        imageCaption={'From Album ' + album.album_name}
      />
    );
  }
}
