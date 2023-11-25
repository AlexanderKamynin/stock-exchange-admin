import {Link} from 'react-router-dom';
import { Component } from 'react';
import React from 'react';

export default class Navigation extends Component {

  render() {
    return (
    <nav>
      <ul>
        <li>
          <Link to="/brokers">Брокеры</Link>
        </li>
        <li>
          <Link to="/stocks">Акции</Link>
        </li>
        <li>
          <Link to="settings">Настройки торгов</Link>
        </li>
      </ul>
    </nav>
    )
  }
}