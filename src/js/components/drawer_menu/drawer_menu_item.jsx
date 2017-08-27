import React from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import CSSModules from 'react-css-modules';
import style from './drawer_menu_item.css';

const DrawerMenuItem = ({
    dispatch,
    icon_path,
    title,

    // Current path
    path,

    // Path this menu goes to
    route_name
}) => {
    const go_to = () => {
        dispatch(push(route_name));
    };

    return (
        <li
            className={ route_name === path ? style.active_tab : style.inactive_tab }
            onClick={ go_to }
        >
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
    'dispatch' : React.PropTypes.func,
    'icon_path' : React.PropTypes.string.isRequired,
    'title' : React.PropTypes.string.isRequired,
    'path' : React.PropTypes.string.isRequired,
    'route_name' : React.PropTypes.string.isRequired,
};

const map_state_to_props = ({ routing }) => {
    return {
        'path' : routing.locationBeforeTransitions.pathname
    };
};

const styled_drawer_menu_item = CSSModules(DrawerMenuItem, style);

export default connect(map_state_to_props)(styled_drawer_menu_item);
