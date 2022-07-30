// Tim Sort provides accurate sorting in node < 11
// https://github.com/ben-rogerson/twin.macro/issues/20
import timSort from 'timsort'

function compareBackdropProperty(a, b) {
  // The order of grid properties matter when combined into a single object
  // So here we move backdrop-filter to the beginning to avoid being trumped
  // https://github.com/ben-rogerson/twin.macro/issues/363
  const A = /(^|:)backdrop-filter/.test(a) ? -1 : 0
  const B = /(^|:)backdrop-filter/.test(b) ? -1 : 0
  return A - B
}

function orderBackdropProperty(className) {
  const classNames = className.match(/\S+/g) || []
  timSort.sort(classNames, compareBackdropProperty)
  return classNames.join(' ')
}

function compareBgOpacityProperty(a, b) {
  // The order of bg-opacity matters when combined into a single object
  // So we move bg-opacity-xxx to the end to avoid being trumped by the bg color
  const A = /(^|:)bg-opacity-/.test(a) ? 0 : -1
  const B = /(^|:)bg-opacity-/.test(b) ? 0 : -1
  return A - B
}

function orderBgOpacityProperty(className) {
  const classNames = className.match(/\S+/g) || []
  timSort.sort(classNames, compareBgOpacityProperty)
  return classNames.join(' ')
}

function compareFilterProperty(a, b) {
  // The order of grid properties matter when combined into a single object
  // So here we move filter to the beginning to avoid being trumped
  // https://github.com/ben-rogerson/twin.macro/issues/363
  const A = /(^|:)filter/.test(a) ? -1 : 0
  const B = /(^|:)filter/.test(b) ? -1 : 0
  return A - B
}

function orderFilterProperty(className) {
  const classNames = className.match(/\S+/g) || []
  timSort.sort(classNames, compareFilterProperty)
  return classNames.join(' ')
}

function compareGridProperty(a, b) {
  // The order of grid properties matter when combined into a single object
  // So here we move col-span-x to the beginning to avoid being trumped
  // https://github.com/ben-rogerson/twin.macro/issues/363
  const A = /(^|:)col-span-/.test(a) ? -1 : 0
  const B = /(^|:)col-span-/.test(b) ? -1 : 0
  return A - B
}

function orderGridProperty(className) {
  const classNames = className.match(/\S+/g) || []
  timSort.sort(classNames, compareGridProperty)
  return classNames.join(' ')
}

function compareOrderRingProperty(a, b) {
  // The order of ring properties matter when combined into a single object
  // So here we move ring-opacity-xxx to the end to avoid being trumped
  // https://github.com/ben-rogerson/twin.macro/issues/374
  const A = /(^|:)ring-opacity-/.test(a) ? 0 : -1
  const B = /(^|:)ring-opacity-/.test(b) ? 0 : -1
  return A - B
}

function orderRingProperty(className) {
  const classNames = className.match(/\S+/g) || []
  timSort.sort(classNames, compareOrderRingProperty)
  return classNames.join(' ')
}

function compareTransformProperty(a, b) {
  // The order of transform properties matter when combined into a single object
  // So here we move transform to the beginning to avoid being trumped
  // https://github.com/ben-rogerson/twin.macro/issues/363
  const A = /(^|:)transform(!|$)/.test(a) ? -1 : 0
  const B = /(^|:)transform(!|$)/.test(b) ? -1 : 0
  return A - B
}

function orderTransformProperty(className) {
  const classNames = className.match(/\S+/g) || []
  timSort.sort(classNames, compareTransformProperty)
  return classNames.join(' ')
}

function compareTransition(a, b) {
  // The order of transition properties matter when combined into a single object
  // So here we move transition-x to the beginning to avoid being trumped
  // https://github.com/ben-rogerson/twin.macro/issues/363
  const A = /(^|:)transition(!|$)/.test(a) ? -1 : 0
  const B = /(^|:)transition(!|$)/.test(b) ? -1 : 0
  return A - B
}

function orderTransitionProperty(className) {
  const classNames = className.match(/\S+/g) || []
  timSort.sort(classNames, compareTransition)
  return classNames.join(' ')
}

function splitAtSpace(className) {
  return className.match(/\S+/g) || []
}

export {
  orderBackdropProperty,
  orderBgOpacityProperty,
  orderFilterProperty,
  orderGridProperty,
  orderRingProperty,
  orderTransformProperty,
  orderTransitionProperty,
  splitAtSpace,
}