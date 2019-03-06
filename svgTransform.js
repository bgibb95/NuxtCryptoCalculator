// Allows jest to interpret SVGs when testing a component

module.exports = {
  process() {
    return 'module.exports = {};'
  },
  getCacheKey() {
    return 'svgTransform'
  }
}
