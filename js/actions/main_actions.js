
import {
    POSITION,
    WEATHEROBJ
} from './types'

import { query } from './../reducers/query';

async function _get(positionObj)
{
  global.LOG("main_actions._get positionObj = " + JSON.stringify(positionObj));
  const request = await query("http://api.openweathermap.org/data/2.5/weather?lat=" + positionObj.coords.latitude + "&lon=" + positionObj.coords.longitude + "&units=metric&appid=ba166499650f73ddff46bd94fefda778");
  return Promise.resolve(request)
}


export function posChanged(pos) {
    return (dispatch) => {
      let getCoords = _get(pos);
global.LOG("getCoords pos = " + JSON.stringify(pos));
      getCoords.then(function(response)
                        {
                          global.LOG("результат = " + JSON.stringify(response));
                          dispatch({
                              type:POSITION,
                              pos
                          });

                          dispatch({
                              type: WEATHEROBJ,
                              weatherObj: response
                          })

                        }, function(err){global.LOG("результат err = " + JSON.stringify(err));});

    }
}
