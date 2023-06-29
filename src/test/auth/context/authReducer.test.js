import { authReducer } from "../../../auth/context";
import { types } from "../../../auth/types/types";

describe('Pruebas en authReducer', () => { 

  const user = {
    name: 'David',
    id: '123'
  }

  test('debe de retornar el estado por defecto', () => {
    const initialState = {
      logged: false,
    }

    const newState = authReducer( initialState, {} );

    expect( newState ).toEqual( initialState );
  });


  test('debe de (login) llamar el login autenticar y establecer el user', () => { 
    const initialState = {
      logged: false
    }

    const action = { type: types.login, payload: user }
    const newState = authReducer( initialState, action );

    expect( newState ).toEqual( {
      logged: true,
      user
    } );
  });

  test('debe de (logout) borrar el name del usuario y logged en false', () => { 
    const initialState = {
      logged: false,
      user
    }

    const action = { type: types.logout }
    const newState = authReducer( initialState, action );

    expect( newState ).toEqual( {
      logged: false
    } );
  });

});