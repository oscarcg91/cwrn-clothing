import { Navigate } from "react-router-dom";

const SignInSignOutRouter = ({ children, currentUser }) => {
  return currentUser ? <Navigate to="/" replace /> : children;
};

export default SignInSignOutRouter;
