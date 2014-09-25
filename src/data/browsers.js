define(function () {
  return {
    chrome: {
      name: 'Chrome',
      versions: [4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40],
      current: 37
    },
    firefox: {
      name: 'Firefox',
      versions: ['3.6', 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35],
      current: 32
    },
    ie: {
      name: 'Internet Explorer',
      versions: ['5.5', 6, 7, 8, 9, 10, 11],
      current: 11
    },
    safari: {
      name: 'Safari',
      versions: ['3.2', 4, 5, '5.1', 6, '6.1', 7, '7.1', 8],
      current: '7.1'
    },
    opera: {
      name: 'Opera',
      versions: ['10.1', '10.5', '10.6', 11, '11.1', '11.5', '11.6', 12, '12.1', '12.16', 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25],
      current: 24
    },
    ios: {
      name: 'Safari on iOS',
      versions: ['3.2', '4.1', '4.3', '5.1', '6.1', '7.1', 8],
      current: 8
    },
    android: {
      name: 'Android Browser',
      versions: ['2.2', '2.3', 3, 4, '4.1', '4.3', '4.4', '4.4.3'],
      current: '4.4'
    }
  }
});