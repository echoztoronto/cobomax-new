const UserProfile = (function() {
  
  const getName = () => {
    const name = localStorage.getItem("username");
    if(name === null) return '';
    else return name;
  }

  const setName = (name) => {    
    localStorage.setItem("username", name);
  }

  const getPassword = () => {
    const password = localStorage.getItem("password");
    if(password === null) return '';
    else return password;
  }

  const setPassword = (password) => {
    localStorage.setItem("password", password);
  }

  const logOut = () => {
    localStorage.removeItem("username");
    localStorage.removeItem("password");
    localStorage.removeItem("logged");
  }

  const setLogged = (flag) => {
    localStorage.setItem("logged", flag);
  }

  const getLogged = () => {
    const logged = localStorage.getItem("logged");
    if(logged === null) return false;
    else return logged;
  }

  return {
    getName: getName,
    setName: setName,
    getPassword: getPassword,
    setPassword: setPassword,
    logOut: logOut,
    setLogged: setLogged,
    getLogged: getLogged
  }
  
})();
  
export default UserProfile;