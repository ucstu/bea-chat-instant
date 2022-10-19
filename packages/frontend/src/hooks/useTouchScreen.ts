import { useNavigate } from "react-router-dom";

export default function useTouchScreen() {
  const navigate = useNavigate();
  navigate("/chart");
}
