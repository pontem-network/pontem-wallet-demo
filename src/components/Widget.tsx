import React, { useLayoutEffect } from 'react';
import { loadWidget } from '@pontem/liquidswap-widget';

export const Widget = () => {
  useLayoutEffect(() => {
    loadWidget('liquidswap-widget');
  }, []);
  return (
    <div className="widgetWrapper">
      {/* eslint-disable-next-line @typescript-eslint/ban-ts-comment */}
      {/* @ts-ignore */}
      <liquidswap-widget/>
    </div>
  );
};
