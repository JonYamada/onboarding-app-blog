import React from 'react'
import Grid from '@mui/material/Grid'
import MainLayout from '../../layouts/MainLayout'
import {Button} from '@mui/material'
import {IArticles} from './interfaces'
import {buttonText} from '../../config/translations/en.json'
import {redirectTo} from '../../utils/nav'
import {IReactContext} from '../../components/interfaces'

const defaultProps = {
  className: null,
}

const Articles = ({className}: IArticles, railsContext: IReactContext) => {
  const newArticlePath = railsContext?.routes?.articles?.new

  return () => {
    return (
      <MainLayout>
        <Grid container spacing={2} className={className}>
          <Grid item xs={12} sx={{textAlign: 'right'}}>
            <Button
              variant='contained'
              onClick={() => {
                if (newArticlePath) redirectTo(newArticlePath)
              }}>
              {buttonText.newArticle}
            </Button>
          </Grid>
        </Grid>
      </MainLayout>
    )
  }
}

Articles.defaultProps = defaultProps

export default Articles
