const Job = (props) => {
    const { title, description, salary, city, state, tags } = props;
    return (
      <div className="rounded-lg shadow-md bg-white">
        <div className="p-4">
          <h2 className="text-xl font-semibold">{title}</h2>
          <p className="text-gray-700 text-lg mt-2">{description}</p>
          <ul className="my-4 bg-gray-100 p-4 rounded">
            <li className="mb-2">
              <strong>Salary:</strong> ${salary}
            </li>
            <li className="mb-2">
              <strong>Location:</strong> {`${city} ${state}`}
              <span className="text-xs bg-blue-500 text-white rounded-full px-2 py-1 ml-2">
                Local
              </span>
            </li>
            <li className="mb-2 capitalize">
              <strong>Tags:</strong> <span>{tags.join(" , ")}</span>
            </li>
          </ul>
          
        </div>
      </div>
    );
  };
  
  export default Job;
  