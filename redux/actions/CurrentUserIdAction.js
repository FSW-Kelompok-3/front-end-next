/* eslint-disable import/prefer-default-export */
/* eslint-disable camelcase */
import jwt_decode from 'jwt-decode';

export const getCurrentUserId = (token) => ({
  type: 'Get_Current_User_Id',
  payload: jwt_decode(token),
});
