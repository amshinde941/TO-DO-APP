import React, { useEffect, useState } from "react";
import "./App.css";

const App = () => {
  const [tasks, setTasks] = useState([]);
  const [addtask, setAddtask] = useState("");

  const addtaskToLocalStorage = (tasktoadd) => {
    tasks.push(tasktoadd);
    localStorage.setItem("tasks", JSON.stringify(tasks));
  };

  const getStateFromLocalStorage = () => {
    let data = localStorage.getItem("tasks");
    if (data) {
      setTasks(JSON.parse(data));
    } else {
      localStorage.setItem("tasks", JSON.stringify([]));
    }
  };

  useEffect(() => {
    getStateFromLocalStorage();
  }, []);

  const handleInput = (event) => {
    setAddtask(event.target.value);
  };

  const handleSubmit = (event) => {
    if (addtask) {
      addtaskToLocalStorage(addtask);
    } else {
      alert("add task");
    }
    setAddtask("");
    event.preventDefault();
  };

  const handleDelete = (key) => {
    const updatetasks = [];
    for (var i = 0; i < tasks.length; i++) {
      if (i !== key) {
        updatetasks.push(tasks[i]);
      }
    }
    setTasks(updatetasks);
    localStorage.setItem("tasks", JSON.stringify(updatetasks));
  };

  const handleEdit = (key) => {
    const updatetasks = [];
    for (var i = 0; i < tasks.length; i++) {
      if (i !== key) {
        updatetasks.push(tasks[i]);
      } else {
        setAddtask(tasks[i]);
      }
    }
    setTasks(updatetasks);
    localStorage.setItem("tasks", JSON.stringify(tasks));
  };

  return (
    <div className="App">
      <header className="App-header">
        <p className="text-2xl font-bold text-white py-6">To Do App</p>
        <div className="pb-6">
          <form
            onSubmit={handleSubmit}
            className="flex flex-row justify-between gap-3 md:gap-8 mx-auto text-black items-start"
          >
            <textarea
              className="hidden md:block"
              value={addtask}
              onChange={handleInput}
              rows="1"
              cols="60"
            />
            <textarea
              className="  md:hidden"
              value={addtask}
              onChange={handleInput}
              rows="3"
              cols="30"
            />
            <div>
              <button
                className="bg-white text-base font-bold px-2 py-1 rounded-md hover:scale-110"
                type="submit"
                value="Submit"
              >
                Add Task
              </button>
            </div>
          </form>
        </div>
        <div className="border border-white w-11/12 md:w-7/12 rounded-md">
          {tasks
            ? tasks?.map((val, key) => {
                return (
                  <div className="flex flex-row justify-between items-start px-2 border-b border-white">
                    <div className="flex justify-start w-10/12 border-r border-white">
                      <p className="pr-2 border-r">{key + 1}</p>
                      <p className="pl-2 text-left">{val}</p>
                    </div>

                    <div className="flex flex-row justify-center w-2/12 mt-2">
                      <button
                        className="text-black font-bold bg-white rounded-md px-1 text-sm mr-4"
                        onClick={() => handleEdit(key)}
                      >
                        E
                      </button>
                      <button
                        className="text-black font-bold bg-white rounded-md px-1 text-sm"
                        onClick={() => handleDelete(key)}
                      >
                        D
                      </button>
                    </div>
                  </div>
                );
              })
            : "Loading Tasks"}
        </div>
      </header>
    </div>
  );
};

export default App;
