const express = require('express');
const router = express.Router();
const ow = require('oversmash').default();

/**
 * GET player stats.
 * batleTag param format example PlayerName-1234
 * Refert to oversmash documentation for more info
 * https://github.com/filp/oversmash
 *
 * Response example:
 *{
 *  "name": "Killer#1832",
 *  "nameEscaped": "Killer-1832",
 *  "platform": "pc",
 *  "stats": {
 *    "competitive_rank": {
 *      "tank": 2300,
 *      "damage": 2445,
 *      "support": 2945
 *    },
 *    "endorsement_level": 5,
 *    "games_won": 2351,
 *    "achievements":{
 *     ***list of achievements***
 *    },
 *    quickplay: {
 *      ***quickplay stats total and by hero***
 *    },
 *    competitive:{
 *    ***competitive stats total, best and by hero***
 *    }
 *  }
 *}
 **/

router.get('/:battleTag/:platform?/:region?', (req, res, next) => {
  const battleTag = req.params.battleTag.replace('-', '#');
  const platform = req.params.platform;
  const region = req.params.region;
  ow.playerStats(battleTag)
    .then(player => {
      res.json(player);
    })
    .catch(error => {
      console.log(error);
      next(error);
    });
});

module.exports = router;
