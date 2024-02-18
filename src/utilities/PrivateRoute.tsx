import { ReactNode } from 'react'
import { Navigate } from 'react-router-dom'

interface Props{
  // isAuthenticated:boolean | undefined;
  children:ReactNode
}
function PrivateRoute({ children }:Props) {
  const storedToken = localStorage.getItem("authToken");

  if (!storedToken) {
    return <Navigate to="/login"/>
  }
  return children
}
export default PrivateRoute;

