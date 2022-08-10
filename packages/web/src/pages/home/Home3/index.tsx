import React, { Component } from 'react';

import styles from './indexResponse.module.css';

export default class Home3 extends Component {
  state = {};
  render() {
    return (
      <div className={`${styles.page} flex-col`}>
        <div className={`${styles['group_1']} flex-col`}>
          <div className={`${styles['block_1']} flex-row`}>
            <div className={`${styles['group_2']} flex-col`}>
              <div className={`${styles['box_1']} flex-col`} />
            </div>
            <div className={`${styles['text-wrapper_1']} flex-col`}>
              <span className={`${styles['text_1']}`}>简约界面</span>
              <span className={`${styles['text_2']}`}>功能强大</span>
              <span className={`${styles['text_3']}`}>操作简单</span>
              <span className={`${styles['text_4']}`}>支持多种格式压缩</span>
            </div>
            <div className={`${styles['group_3']} flex-col`} />
          </div>
        </div>
      </div>
    );
  }
}
