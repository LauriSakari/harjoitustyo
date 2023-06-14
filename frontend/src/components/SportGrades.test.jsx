import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import SportGrades from './SportGrades'
import testHelper from '../utils/testHelper'
import { expect, vi } from 'vitest'

test('returns sport grades when style set to sport', () => {
  render(<SportGrades userInfo={testHelper.userWithClimbs}/>)
  screen.findByText('Different sport grades climbed')
})

test('change sport flash grade button works and delivers new grade', async () => {
  const user = userEvent.setup()
  const mockHandler = vi.fn()
  render(<SportGrades editSportFlash={mockHandler} userInfo={testHelper.userWithClimbs}/>)
  const button = screen.getByText('Save new sport flash grade')
  user.selectOptions(
    screen.getByRole('combobox'),
    screen.getByRole('option', { name: '6B' } ),
  )
  await user.click(button)
  expect(mockHandler.mock.calls).toHaveLength(1)
  expect(mockHandler.mock.calls[0][0]).toBe('6B')

})

test('does not render plus grades after clicking "ignore plus" button', async () => {
  const user = userEvent.setup()
  render(<SportGrades userInfo={testHelper.userWithClimbs}/>)
  const gradesBeforeClick = screen.queryAllByTestId(/[+]/)
  expect(gradesBeforeClick).toHaveLength(3)
  const button = screen.getByText('Ignore "plus" grades')
  await user.click(button)
  const gradesWithPlus = screen.queryAllByTestId(/[+]/)
  expect(gradesWithPlus).toHaveLength(0)
})