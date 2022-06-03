import * as React from 'react'
import Avatar from '@mui/material/Avatar'
import Divider from '@mui/material/Divider'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemAvatar from '@mui/material/ListItemAvatar'
import ListItemText from '@mui/material/ListItemText'
import Typography from '@mui/material/Typography'
import {IListItemPreview} from '../../views/articles/interfaces'

const defaultProps = {
  content: 'content',
  profileImg: 'https://picsum.photos/200?random=1',
  title: 'title',
}


const ListItemPreview = ({content, profileImg, title}: IListItemPreview) => (
  <List>
    <ListItem alignItems='flex-start'>
      <ListItemAvatar>
        <Avatar alt='user avatar' src={profileImg}/>
      </ListItemAvatar>
      <ListItemText
        primary={title}
        secondary={
          <>
            <Typography
              sx={{display: 'inline'}}
              component='span'
              variant='body2'
              color='text.primary'>
            </Typography>
            {!!content && content}
          </>
        }
      />
    </ListItem>
    <Divider variant='inset' component='li'/>
  </List>
)

ListItemPreview.defaultProps = defaultProps

export default ListItemPreview
