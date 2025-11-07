import { Login } from "./components/Login";
import Register from "./components/Register";

function App() {
  return (
    <div className="flex flex-col items-center justify-center">
      <Login></Login>
      <Register></Register>
    </div>
  );
}

export default App;
