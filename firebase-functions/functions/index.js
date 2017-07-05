const functions = require('firebase-functions');
const nodemailer = require('nodemailer')

const gmailEmail = functions.config().gmail.email
const gmailPassword = functions.config().gmail.password
const transporter = nodemailer.createTransport({
  service: 'Gmail',
  auth: {
    user: gmailEmail,
    pass: gmailPassword,
  }
})

exports.githubWebhook = functions.https.onRequest((req, res) => {
  const { action } = req.body

  if (action !== 'opened') {
    console.log(`opened じゃないので除外したよ👍: ${action}`)
    res.end()
    return
  }

  const targetEmail = functions.config().target.email
  const { issue, repository } = req.body

  sendTalknote({
    from: gmailEmail,
    to: targetEmail,
    text: `
      eureka に新しい投稿がありました🎉 by ${issue.user.login}\
      \n
      # ${issue.title}
      ${issue.html_url}
    `,
  })

  res.end()
})

const sendTalknote = data => {
  transporter.sendMail(data)
    .then(console.log(`🚀${data.to} にメールした`))
    .catch(error => {
      console.error(error)
    })
}
