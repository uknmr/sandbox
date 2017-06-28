const amphtmlValidator = require('amphtml-validator')
const React = require('react')
const renderToStaticMarkup = require('react-dom/server').renderToStaticMarkup
const template = require('../template').default

describe('<App /> を renderToStaticMarkup() する場合', () => {
  const App = require('../App').default
  const title = 'title'
  const html = renderToStaticMarkup(<App title />)

  it('空の CSS を与えると amphtml-validator は PASS を返す', async () => {
    const sut = template({
      body: html,
      title, 
      css: '',
    })

    const validator = await amphtmlValidator.getInstance()
    const result = validator.validateString(sut);

    expect(result.status).toBe("PASS");
  })

  it('CSS に h1{color:red}h2{color:blue} を与えると amphtml-validator は PASS を返す', async () => {
    const sut = template({
      body: html,
      title, 
      css: 'h1{color:red}h2{color:blue}',
    })

    const validator = await amphtmlValidator.getInstance()
    const result = validator.validateString(sut);

    expect(result.status).toBe("PASS");
  })
})