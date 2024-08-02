import React, { useState } from 'react'
import { Tab } from "semantic-ui-react"
import { iconLogo } from "../../../assets"
import "./Auth.scss"

export function Auth() {
  const [activeIndex, setActiveIndex] = useState(1)
  const openLogin = () => setActiveIndex(0)
  const panes = [
    {
      menuItem: "Entrar",
      render: () => (
        <Tab.Pane>
          <h2>Login Form</h2>
        </Tab.Pane>
      )
    },
    {
      menuItem: "Nueva Usuario",
      render: () => (
        <Tab.Pane>
          <RegisterForm openLogin={openLogin} />
        </Tab.Pane>
      )
    }
  ]
  return (
    <div className='auth'>
      <img src={iconLogo} className='logo' />
      <tab panes={panes} className="auth__forms" activeIndex={activeIndex} onTabChange={(_, data) => setActiveIndex(data.activeIndex)} />
    </div>
  )
}
