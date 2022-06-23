import React from 'react'
import '@testing-library/jest-dom'
import ArticleForm from '../form'
import {fireEvent, getNodeText, render, screen} from '@testing-library/react'

describe('Article Form Component', () => {
  let titleInput: HTMLElement
  let contentTextarea: HTMLElement
  let btnSubmit: HTMLElement

  const populateTitleField = (value: string = 'sample title text') => fireEvent.input(titleInput, {target: {value}})
  const populateContentField = (value: string = 'sample content text') => fireEvent.input(contentTextarea, {target: {innerHTML: value}})
  const clickSubmit = () => fireEvent.click(btnSubmit)

  beforeEach(() => {
    render(<ArticleForm/>)
    contentTextarea = screen.getByRole('textbox', {name: 'aria-editor'})
    titleInput = screen.getByLabelText('Title')
    btnSubmit = screen.getByRole('button', {name: /save/i})
  })

  describe('fields', () => {
    it('expects only 2 textbox fields', () => {
      const fields = screen.getAllByRole('textbox')
      expect(fields).toHaveLength(2)
      fields.forEach(field => expect(field).toBeInTheDocument())
    })

    it('allows user to type in title input field', () => {
      const sampleText = 'My article title'
      populateTitleField(sampleText)
      expect(titleInput).toHaveValue(sampleText)
    })

    it('allows user to type in content textarea field', () => {
      const sampleText = 'My article content'
      populateContentField(sampleText)
      expect(getNodeText(contentTextarea)).toBe(sampleText)
    })
  })

  describe('validations', () => {
    const titleValidationMessage = 'Title Required'
    const contentValidationMessage = 'Content Required'

    const queryTitleValidationMessage = () => screen.queryByText(titleValidationMessage)
    const queryContentValidationMessage = () => screen.queryByText(contentValidationMessage)

    const findTitleValidationMessage = () => screen.findByText(titleValidationMessage)
    const findContentValidationMessage = () => screen.findByText(contentValidationMessage)

    const expectTitleValueToBe = (value: string = '') => expect(titleInput).toHaveValue(value)
    const expectContentValueToBe = (value: string = '') => expect(getNodeText(contentTextarea)).toBe(value)

    it('throws nothing when both title and content are present', async () => {
      expect(await queryTitleValidationMessage()).not.toBeInTheDocument()
      expect(await queryContentValidationMessage()).not.toBeInTheDocument()

      populateTitleField()
      populateContentField()
      clickSubmit()

      expect(await queryTitleValidationMessage()).not.toBeInTheDocument()
      expect(await queryContentValidationMessage()).not.toBeInTheDocument()
    })

    it('is thrown when both title and content fields are absent', async () => {
      populateTitleField('')
      populateContentField('')

      expectTitleValueToBe('')
      expectContentValueToBe('')

      expect(await queryTitleValidationMessage()).not.toBeInTheDocument()
      expect(await queryContentValidationMessage()).not.toBeInTheDocument()

      clickSubmit()
      expect(await findTitleValidationMessage()).toBeInTheDocument()
      expect(await findContentValidationMessage()).toBeInTheDocument()
    })

    it('is thrown when title field present and content field is absent', async () => {
      populateTitleField()
      populateContentField('')

      expectContentValueToBe('')
      expect(await queryTitleValidationMessage()).not.toBeInTheDocument()
      expect(await queryContentValidationMessage()).not.toBeInTheDocument()

      clickSubmit()

      expect(await queryTitleValidationMessage()).not.toBeInTheDocument()
      expect(await findContentValidationMessage()).toBeInTheDocument()
    })

    it('is thrown when title field absent and content field is present', async () => {
      populateTitleField('')
      expectTitleValueToBe('')

      populateContentField('My Content')
      expectContentValueToBe('My Content')

      expect(await queryTitleValidationMessage()).not.toBeInTheDocument()
      expect(await queryContentValidationMessage()).not.toBeInTheDocument()

      clickSubmit()

      expect(await queryContentValidationMessage()).not.toBeInTheDocument()
      expect(await findTitleValidationMessage()).toBeInTheDocument()
    })
  })
})
