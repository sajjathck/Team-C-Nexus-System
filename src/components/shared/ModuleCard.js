import { Link, Outlet } from "react-router-dom";
function ModuleCard({ link, name }) {
  return (
    <div className="card-group">
      <Link to={link} className="card-title text-decoration-none">
        <div className="card rounded-4 shadow-3 border-1 mt-3">
          <div className="card-body">
            {name}
          </div>
        </div>
      </Link>
    </div>
  );
}
export default ModuleCard;
