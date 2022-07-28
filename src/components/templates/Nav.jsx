import './Nav.css'
import Menu from './Menu'
import React from 'react'

export default props =>
    <aside className="menu-area">
        <nav className="menu">
            <Menu href='/' icon='house' titulo='Início'></Menu>
            <Menu href='/users' icon='people-fill' titulo='Usuários'></Menu>
        </nav>
    </aside>