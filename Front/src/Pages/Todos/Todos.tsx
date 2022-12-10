import { useState, useRef, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useFetchWithToken } from "../../hooks/useFetchWithToken";
import { toast } from "react-toastify";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";
import { TodoForm } from "./components/TodoForm";
import { useAuth } from "../../context/AuthProvider";

type Todo = {
  id?: number;
  title: string;
  description: string;
};

const schema = yup
  .object({
    title: yup
      .string()
      .required("Le titre est obligatoire")
      .max(70, "Le titre ne peut faire que 70 caractères max"),
    description: yup.string().required("La description est obligatoire"),
  })
  .required();

const Todos = () => {
  const [mode, setMode] = useState<"read" | "edit">("read");
  const [selectedItem, setSelectedItem] = useState<number | null>(null);
  const [todos, setTodos] = useState<Todo[]>([]);
  const { fetchWithToken } = useFetchWithToken();
  const { onLogout } = useAuth();
  const form = useForm({
    mode: "all",
    resolver: yupResolver(schema),
  });
  const { reset } = form;
  const navigate = useNavigate();

  useEffect(() => {
    fetchWithToken({
      url: "todos",
    })
      .then((response) => {
        if (response.status == 401) {
          navigate("/login");
        }
        return response.json();
      })
      .then((data) => setTodos(data.todos))
      .catch((e) => {
        toast("La récupération de votre liste de todo n'a pas eu lieu", {
          type: "error",
        });
      });
  }, []);

  return (
    <div className="w-full mx-auto rounded-lg p-8 lg:py-12 lg:px-14 dark:text-gray-300 shadow-xl">
      <div className="flex justify-end">
        <button
          type="button"
          onClick={() => {
            onLogout();
          }}
        >
          Logout
        </button>
      </div>
      <div className="mb-10">
        <h1 className="text-2xl font-bold">Todos</h1>
      </div>
      <div className="mb-10">
        <div>
          <ul className="-mx-1">
            <div>
              {todos?.map((todo, index) => (
                <li
                  onClick={(e) => {
                    if (selectedItem !== index) {
                      setMode("read");
                    }
                  }}
                  key={`${todo.title}-${index}`}
                  className={`px-2 py-2 rounded transition-all flex text-md ${
                    mode === "read" || selectedItem !== index
                      ? "hover:bg-indigo-700 hover:text-white hover:cursor-pointer"
                      : "bg-gray-600 shadow-lg px-4 py-4 my-10 -mx-2"
                  }`}
                  onDoubleClick={() => {
                    setMode("edit");
                    setSelectedItem(index);
                    reset();
                  }}
                >
                  <div className="flex-none w-10 leading-none">
                    <input type="checkbox" />
                  </div>
                  <div className="flex-grow max-w-full">
                    <div>
                      <div className="w-full leading-none">
                        <h3 className="text-md leading-none truncate w-full pr-10"></h3>
                      </div>
                      {(mode === "read" || selectedItem !== index) && (
                        <p>{todo.title}</p>
                      )}
                      {mode === "edit" && selectedItem === index && (
                        <TodoForm
                          form={form}
                          todos={{
                            setTodos,
                            todos,
                          }}
                          item={selectedItem}
                          mode={{
                            setMode,
                          }}
                          todo={todo}
                          index={index}
                        />
                      )}
                    </div>
                  </div>
                </li>
              ))}
            </div>
          </ul>
        </div>
        {todos?.length === 0 && <p className="text-gray-500">No todos</p>}
      </div>
      <div className="flex justify-center">
        <button
          className="py-1 px-10 border border-gray-800 hover:border-gray-700 rounded leading-none focus:outline-none text-xl"
          onClick={() => {
            setMode("edit");
            reset();
            setTodos([...todos, { title: "", description: "" }]);
            setSelectedItem(todos.length);
          }}
        >
          Add +
        </button>
      </div>
    </div>
  );
};

export { Todos };
