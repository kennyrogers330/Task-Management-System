import { useEffect, useState } from "react";
import toast from "react-hot-toast";

function Form() {
  const [assignees, setAssignees] = useState([]);
  const [Projects, setProjects] = useState([]);

  const [taskName, setTaskName] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState("");
  const [selectedProject, setSelectedProject] = useState("");
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [base64Files, setbase64Files] = useState([]);

  // const [projectName, setprojectName] = useState("");

  const token = localStorage.getItem("webToken");

  // console.log(token);

  useEffect(() => {
    const fetchProjects = async () => {
      console.log(JSON.parse(token));
      try {
        const res = await fetch("http://localhost:8080/api/projects/", {
          headers: { Authorization: `Bearer ${JSON.parse(token)}` },
        });
        const data = await res.json();
        console.log(data);
        setProjects(data);
      } catch (error) {
        toast.error(error.message);
      }
    };
    fetchProjects();
  }, [token]);

  const handleAssigneeChange = (index, value) => {
    const newAssignees = [...assignees];
    newAssignees[index] = value;
    setAssignees(newAssignees);
  };

  const handleaddAssignee = () => {
    setAssignees([...assignees, ""]);
  };

  const handleCreateTask = async (e) => {
    e.preventDefault();
    console.log("creating task");
    const newTask = {
      name: taskName,
      start_date: startDate,
      end_date: endDate,
      priority: priority,
      description: description,
      selectedProject,
      assignees,
      base64Files,
    };
    try {
      const res = await fetch("http://localhost:8080/api/tasks/create", {
        method: "POST",
        // headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newTask),
        headers: {
          Authorization: `Bearer ${JSON.parse(token)}`,
          "Content-Type": "application/json",
        },
      });

      const data = await res.json();
      console.log(data);
      toast.success("Task Created Successfully");
    } catch (error) {
      console.log(error.message);
      toast.error(error.message);
    }
  };

  async function base64ConversionForFiles(e) {
    if (e.target.files) {
      const files = Array.from(e.target.files);

      if (files.length + selectedFiles.length > 10) {
        alert("The Maximum files limit which is 10 files was exceeded!");
        return;
      }
      for (let i = 0; i < files.length; i++) {
        getBase64(e.target.files[i]);
      }

      setSelectedFiles((prev) => [...prev, ...files]);
    }
  }

  function getBase64(file) {
    let reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = function () {
      setbase64Files((prev) => [...prev, reader.result]);
    };
    reader.onerror = function (error) {
      console.log("Error", error);
    };
  }

  return (
    <div className="flex flex-row">
      <div className="basis-1/5"></div>
      <div className="basis-3/5">
        <form
          className="max-w-sm mx-auto"
          method="POST"
          encType="multipart/form-data"
          onSubmit={handleCreateTask}
        >
          <span>Create Task</span>
          <div className="mb-5">
            <label
              htmlFor="base-input"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Name
            </label>
            <input
              onChange={(e) => {
                setTaskName(e.target.value);
              }}
              value={taskName}
              type="text"
              id="name"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            />
          </div>

          <div className="mb-5">
            <div className="flex flex-row space-x-4">
              <div className="basis-2/4">
                <label
                  htmlFor="base-input"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Start Date
                </label>
                <input
                  type="date"
                  id="start_date"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  value={startDate}
                  onChange={(e) => {
                    setStartDate(e.target.value);
                  }}
                />
              </div>
              <div className="basis-2/4">
                <label
                  htmlFor="base-input"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  End Date
                </label>
                <input
                  type="date"
                  id="end_date"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  value={endDate}
                  onChange={(e) => {
                    setEndDate(e.target.value);
                  }}
                />
              </div>
            </div>
          </div>
          <div className="mb-5">
            <span>Add Assignees</span> <br />
            {/* <button onClick={addAssignee}>+</button>
            {isAdd && (
              <>
                <label
                  htmlFor="base-input"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                />
              </>
            )} */}
            {assignees.map((assignee, index) => (
              <input
                key={index}
                type="text"
                id="name"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                onChange={(e) => handleAssigneeChange(index, e.target.value)}
                value={assignee}
              />
            ))}
            <button onClick={handleaddAssignee} type="button">
              +
            </button>
          </div>
          <div className="mb-5">
            {/* <span>Add Collaborators</span> */}
            <label
              htmlFor="countries"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Projects
            </label>
            <select
              id="projects"
              value={selectedProject}
              onChange={(e) => {
                setSelectedProject(e.target.value);
              }}
              htmlFor="countries"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            >
              {Projects.map((project, index) => (
                <option key={index} value={project.name}>
                  {project.name}
                </option>
              ))}
            </select>
          </div>
          <div className="mb-5">
            <label
              htmlFor="message"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Description
            </label>
            <textarea
              id="message"
              rows="4"
              className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Write the task description here"
              value={description}
              onChange={(e) => {
                setDescription(e.target.value);
              }}
            ></textarea>
          </div>

          <div className="mb-5">
            <h3 className="mb-4 font-semibold text-gray-900 dark:text-white">
              Priority
            </h3>
            <ul className="items-center w-full text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg sm:flex dark:bg-gray-700 dark:border-gray-600 dark:text-white">
              <li className="w-full border-b border-gray-200 sm:border-b-0 sm:border-r dark:border-gray-600">
                <div className="flex items-center ps-3">
                  <input
                    id="horizontal-list-radio-license"
                    type="radio"
                    value="Low"
                    name="list-radio"
                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                    checked={priority === "Low"}
                    onChange={(e) => {
                      setPriority(e.target.value);
                    }}
                  />
                  <label
                    htmlFor="horizontal-list-radio-license"
                    className="w-full py-3 ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                  >
                    Low
                  </label>
                </div>
              </li>
              <li className="w-full border-b border-gray-200 sm:border-b-0 sm:border-r dark:border-gray-600">
                <div className="flex items-center ps-3">
                  <input
                    id="horizontal-list-radio-id"
                    type="radio"
                    value="Normal"
                    name="list-radio"
                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                    checked={priority === "Normal"}
                    onChange={(e) => {
                      setPriority(e.target.value);
                    }}
                  />
                  <label
                    htmlFor="horizontal-list-radio-id"
                    className="w-full py-3 ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                  >
                    Normal
                  </label>
                </div>
              </li>
              <li className="w-full border-b border-gray-200 sm:border-b-0 sm:border-r dark:border-gray-600">
                <div className="flex items-center ps-3">
                  <input
                    id="horizontal-list-radio-military"
                    type="radio"
                    value="High"
                    name="list-radio"
                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                    checked={priority === "High"}
                    onChange={(e) => {
                      setPriority(e.target.value);
                    }}
                  />
                  <label
                    htmlFor="horizontal-list-radio-military"
                    className="w-full py-3 ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                  >
                    High
                  </label>
                </div>
              </li>
            </ul>
          </div>
          <div className="mb-5">
            <label
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              htmlFor="file_input"
            >
              Upload file
            </label>
            <input
              className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
              id="file_input"
              type="file"
              onChange={base64ConversionForFiles}
            />
          </div>

          <div className="mb-5">
            <div className="flex flex-row-reverse space-x-4 space-x-reverse">
              <div>
                <button
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 border border-blue-700 rounded"
                  type="submit"
                >
                  Submit
                </button>
              </div>
              <div>
                <button
                  className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded"
                  type="reset"
                  onClick={() => {
                    setSelectedFiles([]);
                    setbase64Files([]);
                    setAssignees([]);
                  }}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
      <div className="basis-1/5"></div>
    </div>
  );
}
export default Form;
