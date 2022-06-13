import React from 'react'
import '@testing-library/jest-dom'
import ArticleForm from '../common/form'
import {createEvent, fireEvent, getByText, getNodeText, render, screen, waitFor} from '@testing-library/react'

describe('Article Form', () => {
  beforeEach(() => render(<ArticleForm/>))

  describe('fields', () => {
    it.only('expects only 2 fields', () => {
      const fields = screen.getAllByRole('textbox')
      expect(fields).toHaveLength(2)
    })

    it('allows user to type in title input field', async () => {
      const input = screen.getByLabelText('Title')
      fireEvent.input(input, {target: {value: 'My article title'}})
      expect(input).toHaveValue('My article title')
    })

    it('allows user to type in content textarea field', async () => {
      const textarea = screen.getByRole('textbox', {name: 'aria-editor'})
      expect(textarea).toBeInTheDocument()

      fireEvent.input(textarea, {
        target: {
          innerHTML: 'My Article Content',
        }
      })

      expect(getNodeText(screen.getByRole('textbox', {name: 'aria-editor'}))).toBe('My Article Content')
    })
  })

  describe('validations', () => {
    it('nothing thrown when both title and content are present', async () => {
      const input = screen.getByLabelText('Title')
      fireEvent.input(input, {target: {value: 'My article title'}})

      const textarea = screen.getByRole('textbox', {name: 'aria-editor'})
      fireEvent(textarea, createEvent.paste(textarea, {
        clipboardData: {
          types: ['text/plain'],
          getData: () => 'textbox content'
        }
      }))

      const btnSubmit = screen.getByRole('button', {name: /submit/i})

      fireEvent.click(btnSubmit)

      const titleValidationMessage = await screen.queryByText('Title Required')
      const contentValidationMessage = await screen.queryByText('Content Required')

      expect(titleValidationMessage as HTMLElement).not.toBeInTheDocument()
      expect(contentValidationMessage as HTMLElement).not.toBeInTheDocument()
    })

    it('thrown when both title and content fields are absent', async () => {
      const editor = screen.getAllByLabelText('aria-editor')[0]
      const textarea = editor.querySelector('[data-text="true"]')! as HTMLElement
      const input = screen.getByLabelText('Title')
      const btnSubmit = screen.getByRole('button')

      expect(input).toHaveValue('')
      expect(getNodeText(textarea)).toBe('')

      expect(screen.queryByText('Title Required')).not.toBeInTheDocument()
      expect(screen.queryByText('Content Required')).not.toBeInTheDocument()

      fireEvent.click(btnSubmit)

      const titleValidationMessage = await screen.findByText('Title Required')
      const contentValidationMessage = await screen.findByText('Content Required')

      expect(titleValidationMessage).toBeInTheDocument()
      expect(contentValidationMessage).toBeInTheDocument()
    })

    it('thrown when title field present and content field is absent', async () => {
      const editor = screen.getAllByLabelText('aria-editor')[0]
      const textarea = editor.querySelector('[data-text="true"]')! as HTMLElement
      const input = screen.getByLabelText('Title')
      const btnSubmit = screen.getByRole('button')

      expect(getNodeText(textarea)).toBe('')
      expect(screen.queryByText('Title Required')).not.toBeInTheDocument()
      expect(screen.queryByText('Content Required')).not.toBeInTheDocument()

      fireEvent.change(input, {target: {value: 'My Title'}})
      fireEvent.click(btnSubmit)

      const titleValidationMessage = await screen.queryByText('Title Required')
      const contentValidationMessage = await screen.findByText('Content Required')

      expect(titleValidationMessage).not.toBeInTheDocument()
      expect(contentValidationMessage).toBeInTheDocument()
    })

    it('thrown when title field absent and content field is present', async () => {
      const input = screen.getByLabelText('Title')
      const btnSubmit = screen.getByRole('button')

      const textarea = screen.getByRole('textbox', {name: 'aria-editor'})

      expect(input).toHaveValue('')
      expect(screen.queryByText('Title Required')).not.toBeInTheDocument()
      expect(screen.queryByText('Content Required')).not.toBeInTheDocument()

      fireEvent(textarea, createEvent.paste(textarea, {
        clipboardData: {
          types: ['text/plain'],
          getData: () => 'textbox content'
        }
      }))

      getByText(screen.getByRole('textbox', {
        name: 'aria-editor'
      }), 'textbox content')

      fireEvent.click(btnSubmit)

      await waitFor(async () => {
        const titleValidationMessage = await screen.findByText('Title Required')
        const contentValidationMessage = await screen.queryByText('Content Required')
        expect(titleValidationMessage).toBeInTheDocument()
        expect(contentValidationMessage).not.toBeInTheDocument()
      })
    })
  })
})
