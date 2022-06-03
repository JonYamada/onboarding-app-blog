import React from 'react'
import Grid from '@mui/material/Grid'
import ListItemPreview from '../../components/list/ListItemPreview'
import MainLayout from '../../layouts/MainLayout'
import {Button} from '@mui/material'
import {IArticles, IListItemPreview} from './interfaces'
import {buttonText} from '../../config/translations/en.json'
import {redirectTo} from '../../utils/nav'
import {v4} from 'uuid'
import parse from 'html-react-parser'

const defaultProps = {
  articles: [],
  className: null
}

const Articles = ({articles, className, newArticlePath}: IArticles) => {
  return (
    <MainLayout>
      <Grid container spacing={2} className={className}>
        <Grid item xs={12} sx={{textAlign: 'right'}}>
          <Button variant='contained' onClick={() => redirectTo(newArticlePath)}>
            {/*TODO add localisation*/}
            {buttonText.newArticle}
          </Button>
        </Grid>
        {/*TODO complete this on task ATH-2561*/}
        <Grid item>
          {
            articles?.map(({title, content}: IListItemPreview) => (
              <ListItemPreview
                content={typeof content === 'string' ? parse(content) : content}
                title={title}
                key={v4()}/>
            ))
          }
        </Grid>
      </Grid>
    </MainLayout>
  )
}

Articles.defaultProps = defaultProps

export default Articles
