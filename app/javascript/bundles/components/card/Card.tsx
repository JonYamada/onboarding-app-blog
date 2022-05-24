import React from 'react'
import CardContent from '@mui/material/CardContent'
import {Card as MUICard} from '@mui/material'

const defaultProps = {
  children: null,
  className: null,
}

interface ICard {
  children: any
  className?: string
}

const Card = ({className, children}: ICard) => {
  return (
    <MUICard className={className}>
      <CardContent>
        {children}
      </CardContent>
    </MUICard>
  )
}

Card.defaultProps = defaultProps

export default Card
