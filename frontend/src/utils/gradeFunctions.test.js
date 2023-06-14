
import '@testing-library/jest-dom/extend-expect'
import gradeFunctions from './gradeFunctions'
import testHelper from '../utils/testHelper'
import { expect } from 'vitest'

test('fillGaps fills gaps', () => {
  const gapsFilled = gradeFunctions.fillGaps(testHelper.userWithGradesMissingInBetween.climbedRoutes)
  const result = gapsFilled.find(grade => grade.grade === '6A')
  expect(result.grade).toBe('6A')
})

test('sortList', () => {
  const sorted = gradeFunctions.sortByGrade(testHelper.unsortedGradesList)
  console.log('sorted', sorted)
  expect(sorted[0].grade).toBe('6A')
  expect(sorted[3].grade).toBe('6B+')
  expect(sorted[6].grade).toBe('7A')
})