function StatsCards({ tasks }) {
  const total = tasks.length;

  const pending = tasks.filter(
    (task) => task.status === "Pending"
  ).length;

  const progress = tasks.filter(
    (task) => task.status === "In Progress"
  ).length;

  const completed = tasks.filter(
    (task) => task.status === "Completed"
  ).length;

  return (
    <div className="row mt-4">

      <div className="col-md-3">
        <div className="card text-white bg-primary shadow">
          <div className="card-body">
            <h5>Total Tasks</h5>
            <h2>{total}</h2>
          </div>
        </div>
      </div>

      <div className="col-md-3">
        <div className="card text-dark bg-warning shadow">
          <div className="card-body">
            <h5>Pending</h5>
            <h2>{pending}</h2>
          </div>
        </div>
      </div>

      <div className="col-md-3">
        <div className="card text-white bg-info shadow">
          <div className="card-body">
            <h5>In Progress</h5>
            <h2>{progress}</h2>
          </div>
        </div>
      </div>

      <div className="col-md-3">
        <div className="card text-white bg-success shadow">
          <div className="card-body">
            <h5>Completed</h5>
            <h2>{completed}</h2>
          </div>
        </div>
      </div>

    </div>
  );
}

export default StatsCards;