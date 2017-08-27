import Actions from './actions';

const menu_reducer = (state, action) => {
    if ( typeof state === 'undefined' ) {
        return true;
    }

    switch ( action.type ) {
        case Actions.TOGGLE_MENU_ACTION :
            return !state;
        default:
            return state;
    }
};

export default menu_reducer;
