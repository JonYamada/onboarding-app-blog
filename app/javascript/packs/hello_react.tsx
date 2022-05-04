// Run this example by adding <%= javascript_pack_tag 'hello_react' %> to the head of your layout file,
// like app/views/layouts/application.html.erb. All it does is render <div>Hello React</div> at the bottom
// of the page.

import React from 'react'
import ReactDOM from 'react-dom'
import {string} from 'prop-types'

interface helloWorldProps {
  name: string;
}

const defaultProps = {
  name: 'David'
}

const propTypes = {
  name: string
}

const Hello = (props: helloWorldProps) => (
  <div>Hello {props?.name}!</div>
)

Hello.defaultProps = defaultProps
Hello.propTypes = propTypes

document.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render(
    <Hello name='React'/>,
    document.body.appendChild(document.createElement('div')),
  )
})
