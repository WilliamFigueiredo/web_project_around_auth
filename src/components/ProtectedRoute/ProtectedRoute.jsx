import { Navigate } from "react-router-dom";

function ProtectedRoute({ loggedIn, isCheckingAuth, children }) {
  if (isCheckingAuth) {
    return <div></div>;
  }

  if (!loggedIn) {
    return <Navigate to="/signin" />;
  }

  return children;
}

export default ProtectedRoute;
