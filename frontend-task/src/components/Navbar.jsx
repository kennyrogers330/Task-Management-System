import { Link } from "react-router-dom";

function Navbar() {
  return (
    <div className="flex justify-between mt-5 mx-10">
      <div className="text-xl text-wide">QT Software</div>
      <div className="">
        <ul className="flex space-x-7 text-zinc-400">
          <Link to="/" className="hover:text-white hover:bg-blue-700">
            Create Task
          </Link>
          <Link to="/all-tasks" className="hover:text-white hover:bg-blue-700">
            View All Tasks
          </Link>
          <Link to="/profiles" className="hover:text-white hover:bg-blue-700">
            Manage Profile
          </Link>
        </ul>
      </div>
    </div>
  );
}

export default Navbar;
