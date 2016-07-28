import React from 'react';
import { createDevTools } from 'redux-devtools';
import DockMonitor from 'redux-devtools-dock-monitor';
import ChartMonitor from 'redux-devtools-chart-monitor';
import LogMonitor from 'redux-devtools-log-monitor';

export default createDevTools(
  <DockMonitor toggleVisibilityKey="ctrl-h"
               changePositionKey="ctrl-w"
               changeMonitorKey="ctrl-m">
    <LogMonitor />
    <ChartMonitor />
  </DockMonitor>
);
