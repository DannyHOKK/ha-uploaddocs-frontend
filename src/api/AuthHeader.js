const AuthHeader = () => {
  const jwt = localStorage.getItem("token");
  const token = "Bearer " + jwt;
  return token;
};

export default AuthHeader();
