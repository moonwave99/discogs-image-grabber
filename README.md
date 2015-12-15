# Discogs Image Grabber

Grab [Discogs](https://www.discogs.com) images via CLI / Node.js:

    $ discogs --token a9c8d34176060890ba50bc300d43ce01 --userAgentURL http://yourwebsite.com --requestURL /releases/561793

The `token` is strictly needed, you can get it from the [developer settings page](https://www.discogs.com/settings/developers) of your Discogs account (see _Generate new token_).

In order not to write `token`and `userAgentURL` all over the place, you may place them in your environment variables, either globally or via `.env` file, like:

    DISCOGS_TOKEN=a9c8d34176060890ba50bc300d43ce01
    DISCOGS_USER_AGENT_URL=http://yourwebsite.com
