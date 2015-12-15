# Discogs Image Grabber

Grab [Discogs](https://www.discogs.com) release covers via command line:

    $ discogs --token a9c8d34176060890ba50bc300d43ce01 --userAgentURL http://yourwebsite.com --requestURL /releases/561793

The `requestURL` parameter is the relative URL for **master releases** and **releases** according to [Discogs API documentation](https://www.discogs.com/developers/#page:database).

Note the different URL schema between website and API:

    http://www.discogs.com/Slowdive-Outside-Your-Room-EP/release/582239
    http://api.discogs.com/releases/582239

    http://www.discogs.com/Slowdive-Outside-Your-Room-EP/master/9486
    http://api.discogs.com/masters/9486

API uses plural (`releases`, `masters`)!

---

The `token` is strictly needed, you can get it from the [developer settings page](https://www.discogs.com/settings/developers) of your Discogs account (see _Generate new token_).
Regarding the user agent, Discogs API states that [_your application must provide a User-Agent string that identifies itself_](https://www.discogs.com/developers/#page:home,header:home-general-information), so providing the `userAgentURL` parameter will result in issuing the request with:

    discogs-image-grabber/{version} +http://yourwebsite.com

In order not to write `token`and `userAgentURL` all over the place, you may place them in your environment variables, either globally or via [`.env`](https://github.com/motdotla/dotenv) file, like:

    DISCOGS_TOKEN=a9c8d34176060890ba50bc300d43ce01
    DISCOGS_USER_AGENT_URL=http://yourwebsite.com

---

If you want to use it into your scripts:

    var DiscogsGrabber = require('discogs-image-grabber')

    DiscogsGrabber({
      requestURL:   '/releases/561793',
      token:        'a9c8d34176060890ba50bc300d43ce01',
      userAgentURL: 'http://yourwebsite.com'
    }).then(function(file){
      // file is the absolute path of the saved image
    }).catch(function(error){
      // too bad
    })

---

## Disclaimer

Make a fair use of this, so do not pipe a gazillion request per seconds: Discogs limits them [to 20 per minute per IP address](https://www.discogs.com/developers/#page:home,header:home-rate-limiting), so `_.throttle` is your friend.
