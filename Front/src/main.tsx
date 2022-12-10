import ReactDOM from "react-dom/client";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import { Todos } from "./Pages/Todos/Todos";
import { Login } from "./Pages/Login";
import { AuthProvider } from "./context/AuthProvider";
import { ToastContainer } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";
import "./index.css";
import { Register } from "./Pages/Register";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <div className="min-w-screen min-h-screen dark:bg-gray-800 flex items-center justify-center px-5 py-5">
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route index element={<Todos />} />
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
        </Routes>
        <ToastContainer />
      </AuthProvider>
    </BrowserRouter>
  </div>
);
