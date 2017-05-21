import express from 'express'
import React from 'react'
import { renderToStaticMarkup } from 'react-dom/server'
import template from './template'
import App from './App'

const PORT = 8080
const server = express()

server.get('*', (req, res) => {
  const title = 'Hello world!'
  const html = renderToStaticMarkup(<App title={title} />)
  res.send(template({
    body: html,
    title 
  }))
})

server.listen(PORT)
console.log(`Running on http://localhost:${PORT}`)