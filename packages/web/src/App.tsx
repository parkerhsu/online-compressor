import React, { useEffect, useState } from 'react'
import { Button, Upload, message } from 'antd'
import type { UploadProps } from 'antd'
import axios from '@/utils/axios'
import routers from './router'
import { Routes, Route } from 'react-router-dom'
import './App.less'

function App() {
  return (
    <div className="App">
      <React.Suspense fallback={<span>Loading...</span>}>
        <Routes>
          {routers.map((routeConfig) => (
            <Route path={routeConfig.path} element={routeConfig.component} />
          ))}
        </Routes>
      </React.Suspense>
    </div>
  )
}

export default App
