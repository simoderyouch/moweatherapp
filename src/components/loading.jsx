function Loading({ loading, error, children,err }) {
  return (
    <>
      {loading ? (
        err &&
        <p className="loading">please wait...</p>
      ) : error ? ( err &&
        <div className="error">
          <h3>Result Not Found</h3>
          <p>Whoops...this information is not availble for a moment</p>
        </div>
      ) : (
        children
      )}
    </>
  );
}
export default Loading;
