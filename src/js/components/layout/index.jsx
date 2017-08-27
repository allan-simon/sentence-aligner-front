import React from 'react';
import CSSModules from 'react-css-modules';
import style from './style.css';
import TopBar from '../topbar';
import DrawerMenu from '../drawer_menu';

const Layout = ({ children }) => {
    return (
        <div className={ style.element_root }>
            <DrawerMenu/>
            <div className={ style.main_container_root }>
                <TopBar/>
                <div>
                    { children }
                </div>
            </div>
        </div>
    );
};

Layout.propTypes = {
    'children' : React.PropTypes.string.isRequired
};

export default CSSModules(Layout, style);
