import React, { useState } from'react';
import './index.scss';
import { BACKGROUND_COLORS, BACKGROUND_IMAGE_DEMO_URLS, BACKGROUND_IMAGE_URLS } from './const';

// TODO: 切换颜色后通知server 保证下次登录还是上一次的颜色
interface IProps {
  setBackground: (color: string) => void;
}

export default function BackgroundSwitcher(props: IProps) {
  const { setBackground } = props;

  const getFillIamge = (index: number) => {
    return BACKGROUND_IMAGE_URLS[index];
  }

  return (
    <div className="background-switcher">
      <p>colors</p>
      <div className="background-colors-block">
        {BACKGROUND_COLORS.map((color, index) => (
          <div key={index} className="background-color" style={{ background: color }} onClick={() => setBackground(color)} />
        ))}
      </div>

      <p style={{ marginTop: '1rem' }}>images</p>
      <div className="background-images-block">
        {BACKGROUND_IMAGE_DEMO_URLS.map((url, index) => (
          <div key={index} className="background-image" style={{ background: `url(${url})` }} onClick={() => setBackground(getFillIamge(index))} />
        ))}
      </div>
    </div>
  )
}