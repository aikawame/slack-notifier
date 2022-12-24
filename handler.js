'use strict'

const { IncomingWebhook } = require('@slack/webhook')

module.exports.sentry = async (event) => {
  const webhook = new IncomingWebhook(process.env.SLACK_WEBHOOK_URL)

  const sentryBodyStr = event.body
  const sentryBody = JSON.parse(sentryBodyStr)
  const sentryEvent = sentryBody.event

  const project = sentryBody.project_slug
  const title = sentryEvent.title
  const url = sentryBody.url
  const culprit = sentryBody.culprit

  const payload = {
    blocks: [
      {
        type: 'section',
        text: {
          type: 'mrkdwn',
          text: `*<${url}|[${project}] ${title}>*`
        }
      },
      {
        type: 'section',
        text: {
          type: 'mrkdwn',
          text: `${culprit}`
        }
      }
    ]
  }

  await webhook.send(payload)

  return {
    statusCode: 200,
    body: JSON.stringify(
      {
        message: 'OK',
        input: event
      },
      null,
      2
    )
  }
}
