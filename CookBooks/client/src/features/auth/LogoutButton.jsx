import { useLogoutMutation } from "./authSlice";
import { useNavigate } from 'react-router-dom';

function LogoutButton() {
  const [logout] = useLogoutMutation();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate('/login')
  }
  return <button onClick={logout}>Logout</button>;
}

export default LogoutButton;
