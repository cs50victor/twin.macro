/* eslint-disable @typescript-eslint/restrict-plus-operands */
import { logGeneralError } from './logging'
import throwIf from './util/throwIf'
import { SPACE_ID } from './util/constants'

function findRightBracket(
  classes,
  start = 0,
  end = classes.length,
  brackets = ['(', ')']
) {
  let stack = 0
  for (let index = start; index < end; index++) {
    if (classes[index] === brackets[0]) {
      stack += 1
    } else if (classes[index] === brackets[1]) {
      if (stack === 0) return
      if (stack === 1) return index
      stack -= 1
    }
  }
}

function sliceToSpace(string) {
  const spaceIndex = string.indexOf(' ')
  if (spaceIndex === -1) return string
  return string.slice(0, spaceIndex)
}

// eslint-disable-next-line max-params
function spreadVariantGroups(
  classes,
  // eslint-disable-next-line @typescript-eslint/default-param-last
  context = '',
  // eslint-disable-next-line @typescript-eslint/default-param-last
  importantContext = false,
  // eslint-disable-next-line @typescript-eslint/default-param-last
  start = 0,
  end
) {
  if (classes === '') return []

  const results = []
  classes = classes.slice(start, end).trim()

  // variant / class / group
  const reg = /(\[.*?]:|[\w-<>]+:)|(!?[\w-./[\]]+!?)|\(|(\S+)/g

  let match
  const baseContext = context

  while ((match = reg.exec(classes))) {
    const [, variant, className, weird] = match

    if (variant) {
      // Replace arbitrary variant spaces with a placeholder to avoid incorrect splitting
      const spaceReplacedVariant = variant.replace(/\s+/g, SPACE_ID)
      context += spaceReplacedVariant

      // Skip empty classes
      if (/\s/.test(classes[reg.lastIndex])) {
        context = baseContext
        continue
      }

      if (classes[reg.lastIndex] === '(') {
        const closeBracket = findRightBracket(classes, reg.lastIndex)
        throwIf(typeof closeBracket !== 'number', () =>
          logGeneralError(
            `An ending bracket ')' wasn’t found for these classes:\n\n${classes}`
          )
        )

        const importantGroup = classes[closeBracket + 1] === '!'

        results.push(
          ...spreadVariantGroups(
            classes,
            context,
            importantContext || importantGroup,
            reg.lastIndex + 1,
            closeBracket
          )
        )
        reg.lastIndex = closeBracket + (importantGroup ? 2 : 1)
        context = baseContext
      }
      // eslint-disable-next-line @typescript-eslint/prefer-optional-chain
    } else if (className && className.includes('[')) {
      const closeBracket = findRightBracket(
        classes,
        match.index,
        classes.length,
        ['[', ']']
      )
      throwIf(typeof closeBracket !== 'number', () =>
        logGeneralError(
          `An ending bracket ']' wasn’t found for these classes:\n\n${classes}`
        )
      )
      const importantGroup = classes[closeBracket + 1] === '!'
      const cssClass = classes.slice(match.index, closeBracket + 1)

      const hasSlashOpacity =
        classes.slice(closeBracket + 1, closeBracket + 2) === '/'
      const opacityValue = hasSlashOpacity
        ? sliceToSpace(classes.slice(closeBracket + 1))
        : ''

      // Convert spaces in classes to a temporary string so the css won't be
      // split into multiple classes
      const spaceReplacedClass = cssClass
        // Normalise the spacing - single spaces only
        // Replace spaces with the space id stand-in
        // Remove newlines within the brackets to allow multiline values
        .replace(/\s+/g, SPACE_ID)

      results.push(
        context +
          spaceReplacedClass +
          opacityValue +
          (importantGroup || importantContext ? '!' : '')
      )

      reg.lastIndex =
        closeBracket + (importantGroup ? 2 : 1) + opacityValue.length
      context = baseContext
    } else if (className) {
      const tail = !className.endsWith('!') && importantContext ? '!' : ''
      results.push(context + className + tail)
      context = baseContext
    } else if (weird) {
      results.push(context + weird)
    } else {
      const closeBracket = findRightBracket(classes, match.index)
      throwIf(typeof closeBracket !== 'number', () =>
        logGeneralError(
          `An ending bracket ')' wasn’t found for these classes:\n\n${classes}`
        )
      )

      const importantGroup = classes[closeBracket + 1] === '!'
      results.push(
        ...spreadVariantGroups(
          classes,
          context,
          importantContext || importantGroup,
          match.index + 1,
          closeBracket
        )
      )
      reg.lastIndex = closeBracket + (importantGroup ? 2 : 1)
    }
  }

  return results
}

function expandVariantGroups(classes) {
  return spreadVariantGroups(classes).join(' ')
}

export default expandVariantGroups