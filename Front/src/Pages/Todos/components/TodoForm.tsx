import { toast } from "react-toastify";
import { useFetchWithToken } from "../../../hooks/useFetchWithToken";

const TodoForm = ({ form, todos, index, todo, item, mode }) => {
  const { handleSubmit, getValues, formState, register } = form;
  const { fetchWithToken } = useFetchWithToken();
  return (
    <form
      onSubmit={handleSubmit(async () => {
        if (todo.id) {
          try {
            const response = await fetchWithToken({
              url: `todos/${todo.id}`,
              configFetch: {
                method: "PUT",
              },
              body: {
                title: getValues("title"),
                description: getValues("description"),
              },
            });
            const data = await response.json();
            todos.todos.splice(index, 1, {
              id: data.todo.id,
              title: data.todo.title,
              description: data.todo.description,
            });
          } catch (e) {
            toast(
              `L'update de votre todo nomme: ${todo.title} n'a pas eu lieu`,
              {
                type: "error",
              }
            );
          }
        } else {
          try {
            const response = await fetchWithToken({
              url: `todos`,
              configFetch: {
                method: "POST",
              },
              body: {
                title: getValues("title"),
                description: getValues("description"),
              },
            });

            const data = await response.json();
            todos.todos.splice(index, 1, {
              id: data.todo.id,
              title: data.todo.title,
              description: data.todo.description,
            });
          } catch (e) {
            todos.todos.splice(index, 1);
            toast(`La création de votre todo n'a pas eu lieu`, {
              type: "error",
            });
          }
        }
        todos.setTodos([...todos.todos]);
        mode.setMode("read");
      })}
    >
      <input
        type="text"
        className={`text-md w-full bg-transparent  leading-none focus:outline-none mb-2 border-b-2 ${
          item !== index ? "hover:cursor-pointer" : "text-gray-300"
        } ${formState.errors["title"]?.message && "border-red-400"}`}
        placeholder="New todo..."
        {...register("title", {
          required: true || "Le titre est obligatoire",
          maxLength: 70 || "Le titre ne peut pas faire plus de 70 caractères",
        })}
        disabled={index !== item}
        defaultValue={todo.title}
      />
      <p className="text-red-500">{formState.errors["title"]?.message}</p>
      <div className="w-full">
        <textarea
          {...register("description", {
            required: true,
          })}
          className={`text-md w-full bg-transparent text-gray-300 leading-tight border-b-2    ${
            formState.errors["description"]?.message && "border-red-400"
          }`}
          rows={10}
          placeholder="Notes"
          defaultValue={todo.description}
        ></textarea>
        <p className="text-red-500">
          {formState.errors["description"]?.message}
        </p>
      </div>
      <div className="w-full flex justify-end gap-2">
        <button
          className="p-1 -mr-1 focus:outline-none  hover:text-blue-900 bg-gray-200"
          type="submit"
        >
          Save
        </button>
        <button
          className="p-1 -mr-1 focus:outline-none hover:bg-red-300 hover:text-blue-900 bg-gray-200"
          type="button"
          onClick={async () => {
            if (todo.id) {
              try {
                const response = await fetchWithToken({
                  url: `todos/${todo.id}`,
                  configFetch: {
                    method: "DELETE",
                  },
                });
                if (response.ok) {
                  todos.todos.splice(index, 1);
                }
                mode.setMode("read");
              } catch (e) {
                toast(
                  `La suppressin de votre todo ${todo.title} n'a pas eu lieu`,
                  {
                    type: "error",
                  }
                );
              }
            } else {
              todos.todos.splice(index, 1);
            }
            todos.setTodos([...todos.todos]);
          }}
        >
          Delete X
        </button>
      </div>
    </form>
  );
};

export { TodoForm };
