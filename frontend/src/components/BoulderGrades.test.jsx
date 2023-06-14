import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import BoulderGrades from './BoulderGrades'
import testHelper from '../utils/testHelper'
import { expect, vi } from 'vitest'

test('renders page', () => {
  render(<BoulderGrades userInfo={testHelper.simpleUser}/>)

  screen.getByText('Boulder Grades')

})

test('renders page', () => {
  render(<BoulderGrades userInfo={testHelper.simpleUser}/>)

  screen.getByText('Your boulder flash grade is 6A')
})

test('renders table with plus grades', () => {
  render(<BoulderGrades userInfo={testHelper.userWithClimbs}/>)
  screen.getByTestId('6B+')
})

test('does not render plus grades after clicking "ignore plus" button', async () => {
  const user = userEvent.setup()
  render(<BoulderGrades userInfo={testHelper.userWithClimbs}/>)
  const gradesBeforeClick = screen.queryAllByTestId(/[+]/)
  expect(gradesBeforeClick).toHaveLength(3)
  const button = screen.getByText('Ignore "plus" grades')
  await user.click(button)
  const gradesWithPlus = screen.queryAllByTestId(/[+]/)
  expect(gradesWithPlus).toHaveLength(0)
})

test('change boulder flash grade button works and delivers new grade', async () => {
  const user = userEvent.setup()
  const mockHandler = vi.fn()
  render(<BoulderGrades editBoulderFlash={mockHandler} userInfo={testHelper.userWithClimbs}/>)
  const button = screen.getByText('Save new boulder flash grade')
  user.selectOptions(
    screen.getByRole('combobox'),
    screen.getByRole('option', { name: '6B' } ),
  )
  await user.click(button)
  expect(mockHandler.mock.calls).toHaveLength(1)
  expect(mockHandler.mock.calls[0][0]).toBe('6B')

})

test('returns "no sends yet" if there is no clibs added', () => {
  render(<BoulderGrades userInfo={testHelper.userWithoutClimbs}/>)
  screen.getByText('No sends yet')
})
