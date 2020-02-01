const express = require('express');
const router = express.Router();
const ow = require('oversmash').default();

/**
 * GET player info.
 * batleTag param format example PlayerName-1234
 * Refert to oversmash documentation for more info
 * https://github.com/filp/oversmash
 *
 * Response example:
 *{
 *    "name": "Killer#1832",
 *    "nameEscaped": "Killer-1832",
 *    "nameEscapedUrl": "Killer%231832",
 *  "accounts": [
 *  {
 *      "level": 260,
 *      "portrait": "https://d1u1mce87gyfbn.cloudfront.net/game/unlocks/0x02500000000017AC.png",
 *      "platform": "pc",
 *      "public": true
 *    }
 *  ]
 *}
 **/

router.get('/:battleTag/:platform?/:region?', function(req, res, next) {
  const battleTag = req.params.battleTag.replace('-', '#');
  const platform = req.params.platform;
  const region = req.params.region;

  ow.player(battleTag)
    .then(player => {
      res.json(player);
    })
    .catch(error => {
      console.log(error);
      next(error);
    });
});

module.exports = router;
