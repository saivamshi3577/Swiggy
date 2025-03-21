const Shimmer = ({ count = 6 }) => {
    return (
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
        {Array(count)
          .fill("")
          .map((_, index) => (
            <div key={index} className="bg-gray-200 animate-pulse rounded-lg w-full h-40"></div>
          ))}
      </div>
    );
  };
  
  export default Shimmer;
  