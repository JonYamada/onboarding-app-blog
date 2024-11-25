import React from 'react'
import Grid from '@mui/material/Grid'
import MainLayout from '../../layouts/MainLayout'
import {Button} from '@mui/material'
import {IArticles} from './interfaces'
import {buttonText} from '../../config/translations/en.json'
import {redirectTo} from '../../utils/nav'
import {IRailsContext} from '../../components/interfaces'
import {isLoggedIn} from '../../utils/AuthConnector'

const defaultProps = {
  className: null,
}

const Articles = ({className}: IArticles, railsContext: IRailsContext) => {
  const {new: newArticlePath} = railsContext?.routes?.articles

  return () => {
    return (
      <MainLayout>
        <Grid container spacing={2} className={className}>
          {
            isLoggedIn() &&
            <Grid item xs={12} sx={{textAlign: 'right'}}>
              <Button
                variant='contained'
                onClick={() => {
                  if (newArticlePath) redirectTo(newArticlePath)
                }}>
                {buttonText.newArticle}
              </Button>
            </Grid>
          }
        </Grid>
      </MainLayout>
    )
  }
}

Articles.defaultProps = defaultProps

export default Articles
