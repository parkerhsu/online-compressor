import React, { Component } from 'react';

import styles from './indexResponse.module.css';

export default class Home2 extends Component {
  state = {};
  render() {
    return (
      <div className={`${styles.page} flex-col`}>
        <div className={`${styles['block_1']} flex-col`}>
          <div className={`${styles['block_2']} flex-col`}>
            <div className={`${styles['text-wrapper_1']} flex-row`}>
              <span className={`${styles['text_1']}`}>开始使用</span>
            </div>
            <div className={`${styles['text-wrapper_2']} flex-row`}>
              <span className={`${styles['text_2']}`}>Compressor</span>
            </div>
            <div className={`${styles['section_1']} flex-row`}>
              <div className={`${styles['group_1']} ${styles['group']} flex-col`}>
                <img
                  className={`${styles['image_1']}`}
                  src='/img/pic.png'
                />
                <span className={`${styles['text_3']}`}>图片压缩</span>
                <span className={`${styles['text_4']}`}>不损失视觉效果，降低图片体积</span>
              </div>
              <div className={`${styles['group_2']} ${styles['group']} flex-col`}>
                <img
                  className={`${styles['image_2']}`}
                  src='/img/pdf.png'
                />
                <span className={`${styles['text_5']}`}>GIF压缩</span>
                <span className={`${styles['text_6']}`}>不改变尺寸，大幅减小动图体积</span>
              </div>
              <div className={`${styles['group_3']} ${styles['group']} flex-col`}>
                <img
                  className={`${styles['image_3']}`}
                  src='/img/pdf.png'
                />
                <span className={`${styles['text_7']}`}>PDF压缩</span>
                <span className={`${styles['text_8']}`}>极大压缩PDF体积</span>
              </div>
            </div>
            {/* <div className={`${styles['section_2']} flex-col`} /> */}
          </div>
        </div>
      </div>
    );
  }
}