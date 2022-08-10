import React, { Component } from 'react';

import styles from './indexResponse.module.css';

export default class Home4 extends Component {
  state = {};
  render() {
    return (
      <div className={`${styles.page} flex-col`}>
        <div className={`${styles['section_1']} flex-col`}>
          <span className={`${styles['paragraph_1']}`}>
            简单实用
            <br />
          </span>
          <span className={`${styles['text_1']}`}>压缩前后对比，不改变视觉效果极大压缩图片大小</span>
          <img
            className={`${styles['image_1']}`}
            src='/img/Home4_pic.png'
          />
          <div className={`${styles['text-wrapper_1']} flex-row`}>
            <span className={`${styles['text_2']}`}>原图</span>
            <span className={`${styles['text_3']}`}>压缩后</span>
          </div>
        </div>
      </div>
    );
  }
}
