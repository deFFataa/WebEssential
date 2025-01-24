/// <reference types="vite/client" />
import './bootstrap';

import { createInertiaApp } from '@inertiajs/react'
import { createRoot } from 'react-dom/client'
import React from 'react'
import Layout from './Layout/Layout';
import '../css/app.css'

createInertiaApp({
  title: title => `${title} - Web Essentials`,
  resolve: name => {
    const pages = import.meta.glob('./Pages/**/*.tsx', { eager: true })
    let page: any = pages[`./Pages/${name}.tsx`]
    page.default.layout = page.default.layout || (page => <Layout children={page} />)
    return page
  },
  setup({ el, App, props }) {
    createRoot(el).render(<App {...props} />)
  },
  progress: {
    color: '#4B5563'
  }
})