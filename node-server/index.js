import express from 'express'
import React from 'react'
import { renderToStaticMarkup } from 'react-dom/server'
import { ServerStyleSheet } from 'styled-components'
import template from './template'
import App from './App'

const PORT = 8080
const server = express()

server.get('*', (req, res) => {
  const title = 'SSR with styled-components!'
  const sheet = new ServerStyleSheet()
  const html = renderToStaticMarkup(sheet.collectStyles(<App title={title} />))
  res.send(template({
    css: sheet.getStyleTags(),
    body: html,
    title 
  }))
})

server.listen(PORT)
console.log(`Running on http://localhost:${PORT}`)