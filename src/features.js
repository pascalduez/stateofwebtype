define([
    'Version',
    'browsers',
    'data/values',
    'data/font-face',
    'data/font-feature-settings',
    'data/font-kerning',
    'data/hyphenate-character',
    'data/hyphenate-limit-chars',
    'data/hyphenate-limit-last',
    'data/hyphenate-limit-lines',
    'data/hyphenate-limit-zone',
    'data/hyphens'
  ], function (
    Version,
    browsers,
    values,
    fontface,
    fontFeatureSettings,
    fontKerning,
    hyphenateCharacter,
    hyphenateLimitChars,
    hyphenateLimitLast,
    hyphenateLimitLines,
    hyphenateLimitZone,
    hyphens) {
  function parseRange (str, browserVersions) {
    var tmp = str.split('-'),
        start = -1,
        end = -1;

    if (tmp.length === 1) {
      start = browserVersions.indexOf(Version.parse(tmp[0]));
      end = start;
    } else if (tmp.length === 2) {
      if (tmp[0] === "") {
        start = 0;
      } else {
        start = browserVersions.indexOf(Version.parse(tmp[0]));
      }

      if (tmp[1] === "") {
        end = browserVersions.size();
      } else {
        end = browserVersions.indexOf(Version.parse(tmp[1]));
      }
    } else {
      throw new Error('Range is not valid: "' + str + '".');
    }

    if (start === -1 || end === -1) {
      throw new Error('Bad browser support range: "' + str + '".');
    } else {
      return browserVersions.slice(start, end + 1);
    }
  }

  function findRelations(features, result) {
    features.forEach(function (feature) {
      result.push(feature.name);

      if (feature.features) {
        findRelations(feature.features, result);
      }
    });
  }

  function init(feature) {
    if (!feature.name) {
      throw new Error('Feature does not have a name.');
    }

    if (feature.browsers) {
      var tmp = {};

      feature.browsers.forEach(function (browser) {
        var id = browser.name

        if (browsers[id]) {
          if (!tmp[id]) {
            tmp[id] = [];
          }

          browser.range = parseRange(browser.range, browsers[id].versions);

          tmp[id].push(browser);
        } else {
          console.error('Feature "' + feature.name + '" uses an unknown browser: "' + id + '".');
        }
      });

      var result = [];

      Object.keys(browsers).forEach(function (browserId) {
        if (tmp[browserId]) {
          result.push({
            id: browserId,
            name: browsers[browserId].name,
            support: tmp[browserId].map(function (data) {
              return {
                range: data.range,
                value: values[data.support]
              };
            })
          });
        }
      });
      feature.browsers = result;
    } else {
      console.error('Feature "' + feature.name  + '" does not have browser support data.');
    }

    if (feature.features) {
      feature.features = feature.features.map(init);

      var seeAlso = [];
      feature.hasRelations = true;
      findRelations(feature.features, seeAlso);
      feature.seeAlso = seeAlso.sort(function (a, b) {
        return a.localeCompare(b);
      });
    }

    return feature;
  }

  return {
    '@font-face': init(fontface),
    'font-feature-settings': init(fontFeatureSettings),
    'font-kerning': init(fontKerning),
    'hyphenate-character': init(hyphenateCharacter),
    'hyphenate-limit-chars': init(hyphenateLimitChars),
    'hyphenate-limit-lines': init(hyphenateLimitLines),
    'hyphenate-limit-zone': init(hyphenateLimitZone),
    'hyphens': init(hyphens)
  };
});