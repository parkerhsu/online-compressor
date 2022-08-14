import React, { Component } from 'react'
import Header from '@/components/Header'
import styles from './indexResponse.module.css'

export default class Home1 extends Component {
  state = {}
  toHome2 = () => {}
  render() {
    return (
      <div className={`${styles.page} flex-col`}>
        <div className={`${styles['group_1']} flex-col`}>
          <div className={`${styles['section_1']} flex-col`}>
            <div className={`${styles['group_2']} flex-col`}>
              <Header />
              <span className={`${styles['text_2']}`}>Compressor</span>
              <span className={`${styles['paragraph_3']}`}>
                一款免费在线压缩产品
                <br />
                支持JPG、PNG、GIF、PDF等多种压缩格式
              </span>
              <img className={`${styles['image_2']}`} src="/img/start.png" onClick={this.toHome2} />
              <span className={`${styles['text_3']}`}>Php&nbsp;world&nbsp;first</span>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
