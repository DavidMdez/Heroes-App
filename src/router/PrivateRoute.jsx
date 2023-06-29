import { useContext, useMemo } from "react"
import { AuthContext } from "../auth"
import { Navigate, useLocation } from "react-router-dom";


export const PrivateRoute = ({ children }) => {

  const { logged } = useContext( AuthContext );
  const { pathname, search } = useLocation();

  const getLastPath = ( pathname, search) => {
    const lastPath = pathname + search;
    localStorage.setItem( 'lastPath', lastPath );
  }

  useMemo( () => getLastPath( pathname, search ), [ pathname, search ] )
  
  return (logged)
    ? children
    : <Navigate to="/login"/>
}
