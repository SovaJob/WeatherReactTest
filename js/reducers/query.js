'use strict';

import React from 'react';
import {Alert} from 'react-native'
import {NetInfo} from 'react-native';

async function checkNetwork():Promise
{
  var check = await NetInfo.isConnected.fetch();

  return Promise.resolve(check);
}

async function query(path, method, args, headers): Promise
{

  var isConnected = false;
  await checkNetwork().then(result => {
    isConnected = result;
  });

  //if(isConnected){
  try {
    let response = await fetch(path, {
      method: method,
      headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      ...headers
      },
      body: args ? JSON.stringify(args) : undefined
    });
    let responseJson = await response.json();
    return responseJson;
  }
  catch(error)
  {
    console.warn('SERVER_ERROR: ',error);
    return {
    type:'SERVER_ERROR',
    error
    }
  }

  //}
  //else{
  // return {
  // type:'NETWORK_FAILURE'
  // }
  //}
}

module.exports = {query};
