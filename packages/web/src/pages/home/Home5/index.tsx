import React, { Component } from 'react'

import styles from './indexResponse.module.css'

export default class Home5 extends Component {
  state = {}
  render() {
    return (
      <div className={`${styles.page} flex-col`}>
        <div className={`${styles['group_1']} flex-row`}>
          <div className={`${styles['text-wrapper_1']} flex-col justify-between`}>
            <span className={`${styles['text_1']}`}>功能多样</span>
            <span className={`${styles['paragraph_1']}`}>
              可选压缩质量
              <br />
              支持批量操作
              <br />
              提供打包下载
              <br />
              <br />
              <br />
            </span>
          </div>
          <div className={`${styles['section_1']} flex-col`} />
        </div>
      </div>
    )
  }
}
