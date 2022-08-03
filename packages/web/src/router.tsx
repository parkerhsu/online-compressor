import React from 'react'

const Home = React.lazy(() => import('./pages/home'))
const GifCompress = React.lazy(() => import('./pages/gif-compress'))
const ImageCompress = React.lazy(() => import('./pages/image-compress'))
const PdfCompress = React.lazy(() => import('./pages/pdf-compress'))

export default [
  {
    path: '/',
    component: <Home />
  },
  {
    path: '/image-compress',
    component: <ImageCompress />
  },
  {
    path: '/gif-compress',
    component: <GifCompress />
  },
  {
    path: '/pdf-compress',
    component: <PdfCompress />
  }
]
