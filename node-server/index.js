import express from 'express'
import React from 'react'
import { renderToStaticMarkup } from 'react-dom/server'
import template from './template'
import App from './App'

const PORT = 8080
const server = express()

server.get('*', (req, res) => {
  const title = 'Hello SSR!'
  const html = renderToStaticMarkup(<App title={title} />)
  const css = require('./dist/main.css')
  
  res.send(template({
    body: html,
    title,
    css,
  }))
})

server.listen(PORT)
console.log(`Running on http://localhost:${PORT}`)