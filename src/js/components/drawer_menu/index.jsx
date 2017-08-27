import React from 'react';
import { connect } from 'react-redux';
import CSSModules from 'react-css-modules';
import style from './style.css';
import menu_actions from './actions';
import DrawerMenuItem from './drawer_menu_item';

const DrawerMenu = ({ collapsed_menu, dispatch }) => {
    const toggle_menu = () => {
        const action = {
            'type' : menu_actions.TOGGLE_MENU_ACTION
        };

        dispatch(action);
    };

    return (
        <nav className={ collapsed_menu ? style.collapsed : style.expanded }>
            <button
                onClick={ toggle_menu }
            >
                &#9776;
            </button>
            <div className={ style.smart_hide }>
                version __VERSION__
            </div>
            <ul className={ style.submenu }>
                <DrawerMenuItem
                    icon_path='/img/home.svg'
                    title='Home'
                />
                <DrawerMenuItem
                    icon_path='/img/list.svg'
                    title='Sentences list'
                />
            </ul>
        </nav>
    );
};

DrawerMenu.propTypes = {
    'collapsed_menu' : React.PropTypes.bool.isRequired,
    'dispatch' : React.PropTypes.func.isRequired
};

const map_state_to_props = ({ collapsed_menu }) => {
    return {
        collapsed_menu
    };
};

const styled_drawer_menu = CSSModules(DrawerMenu, style);

export default connect(map_state_to_props)(styled_drawer_menu);
