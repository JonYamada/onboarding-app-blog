// Run this example by adding <%= javascript_pack_tag 'hello_react' %> to the head of your layout file,
// like app/views/layouts/application.html.erb. All it does is render <div>Hello React</div> at the bottom
// of the page.

import React from 'react'
import ReactDOM from 'react-dom'

interface helloWorldProps {
  name: string;
}

const defaultProps = {
  name: 'David'
}

const Hello = (props: helloWorldProps) => (
  <div>Hello {props?.name}! hello_react.tsx</div>
)

Hello.defaultProps = defaultProps

document.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render(
    <Hello name='React'/>,
    document.body.appendChild(document.createElement('div')),
  )
})
