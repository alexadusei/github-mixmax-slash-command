# GitHub Link Preview for Mixmax (with Slash Commands)

Ever wanted to share your GitHub in an email, but get tired of having ot copy & paste your link hundreds of times? With Mixmax's slash command feature, you can quicken the process by simplying entering a username, no trailing URLs necessary.

# Instructions
1. Start by downloading the repo. You can run this locally on your computer or put it on your own server.
2. Go to your [Mixmax Integrations](https://app.mixmax.com/dashboard/integrations) and scroll down until you see __Add Slash Command__
3. Fill out the following information:
  * __Name__: Search GitHub
  * __Command__: /github
  * __Command Parameter Suggestions API URL__: http://localhost:9145/typeahead
  * __Command Parameter Resolver API URL__: http://localhost:9145/resolver
4. Open Gmail or Inbox and click Compose. Type __/github__ followed by a username of any existing Github account.

## Note
In terms of running it locally, you'll have to restart Chrome in "insecure" mode. Mixmax has [great instructions] (http://sdk.mixmax.com/docs/chrome-insecure-content-https-request-blocked-when-developing-locally) on doing this.

This is a small concept that can work for generally any commonly shared website with an open API (GitHub, LinkedIn, Angel List, Pinterest, etc). You can learn how to make your own Mixmax slash commands [here](http://sdk.mixmax.com/docs/tutorial-giphy-slash-command).
