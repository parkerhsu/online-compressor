import React, { Component } from 'react'
import styles from '../../pages/home/Home1/indexResponse.module.css'

export default class Header extends Component {
  render() {
    return (
      <div className={`${styles['box_1']} flex-row`}>
        <img className={`${styles['image_1']}`} src={'/img/logo.png'} onClick={this.props.toHome} />
        <a href="/image-compress" className={`${styles['text_1']}`}>
          图片压缩
        </a>
        <a href="/gif-compress" className={`${styles['paragraph_1']}`}>
          GIF压缩
        </a>
        <a href="/pdf-compress" className={`${styles['paragraph_2']}`}>
          PDF压缩
        </a>
      </div>
    )
  }
}
