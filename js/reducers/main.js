

import {POSITION, WEATHEROBJ} from '../actions/types'


const initialState = {
    pos:{},
    weatherObj:{}
};

function main(state: State = initialState, action: Action) {
    switch (action.type) {

        case POSITION :
            return Object.assign({}, state, {
                pos: action.pos
            });
        case WEATHEROBJ :
            return Object.assign({}, state, {
                weatherObj: action.weatherObj
            });


        default:
            return state
    }
}

module.exports = main;
