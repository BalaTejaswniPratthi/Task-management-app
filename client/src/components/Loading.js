function Loading() {
  return (
    <div className="text-center mt-5">
      <div
        className="spinner-border text-primary"
        role="status"
      >
        <span className="visually-hidden">
          Loading...
        </span>
      </div>

      <h5 className="mt-3">
        Loading Tasks...
      </h5>
    </div>
  );
}

export default Loading;