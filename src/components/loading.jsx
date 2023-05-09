function Loading({ loading, error, children }) {
  return (
    <>
      {loading ? (
        <p className="loading">please wait...</p>
      ) : error ? (
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
