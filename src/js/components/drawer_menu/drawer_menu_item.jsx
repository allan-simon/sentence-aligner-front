import React from 'react';
import CSSModules from 'react-css-modules';
import style from './drawer_menu_item.css';

const DrawerMenuItem = ({ icon_path, title }) => {
    return (
        <li className={ style.root_element }>
            <span className={ style.title }>
                { title }
            </span>
            <span className={ style.icon_box }>
                <img src={ icon_path }/>
            </span>
        </li>
    );
};

DrawerMenuItem.propTypes = {
    'icon_path' : React.PropTypes.string.isRequired,
    'title' : React.PropTypes.string.isRequired
};

export default CSSModules(DrawerMenuItem, style);
