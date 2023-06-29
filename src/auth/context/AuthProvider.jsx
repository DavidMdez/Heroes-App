import { useReducer } from "react"
import { AuthContext, authReducer } from "./"
import { types } from "../types/types";

const init = () => {
  const user = JSON.parse( localStorage.getItem('user') );

  return {
    logged: !!user,
    user: user,
  }
}

export const AuthProvider = ({ children }) => {

  const [ authState, dispacht ] = useReducer( authReducer, {}, init  );

  const login = ( name = '' ) => {

    const user = { id: 'ABC', name }
    const action = { type: types.login, payload: user }

    localStorage.setItem('user', JSON.stringify( user ));
    
    dispacht( action );
  }

  const logout = () => {
    const action = { type: types.logout }

    localStorage.removeItem('user');
    dispacht( action );
  }

  return (
    <AuthContext.Provider value={{
      ...authState,
      login,
      logout
     }}>
      { children }
    </AuthContext.Provider>
  )
}
