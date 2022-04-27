import React, { Component } from 'react';
import propTypes from 'prop-types';
import { Link } from 'react-router-dom';

export default class Menu extends Component {
  render() {
    const { active } = this.props;
    return (
      <section className="section-nav-menu">
        <nav className="nav-menu">
          <ul className="nav nav-tabs">
            <li className="nav-item">
              <Link
                className={ `nav-link ${active === 'search' && 'active'}` }
                aria-current="page"
                data-testid="link-to-search"
                to="/search"
              >
                Pesquisar
              </Link>
            </li>
            <li className="nav-item">
              <Link
                className={ `nav-link ${active === 'favorites' && 'active'}` }
                data-testid="link-to-favorites"
                to="/favorites"
              >
                Favoritos
              </Link>
            </li>
            <li className="nav-item">
              <Link
                className={ `nav-link ${active === 'profile' && 'active'}` }
                data-testid="link-to-profile"
                to="/profile"
              >
                Perfil
              </Link>
            </li>
          </ul>
        </nav>
      </section>
    );
  }
}

Menu.propTypes = {
  active: propTypes.string,
};

Menu.defaultProps = {
  active: 'active',
};
