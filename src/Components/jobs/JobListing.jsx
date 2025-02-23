import React from 'react';

const JobListing = () => {
  return (
    <section>
      <div className="container mx-auto p-4 mt-4">
        <div className="text-center text-3xl mb-4 font-bold border border-gray-300 p-3">
          Recent Jobs
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          
          {/* Job Listing 1: Software Engineer */}
          <div className="rounded-lg shadow-md bg-white">
            <div className="p-4">
              <h2 className="text-xl font-semibold">Software Engineer</h2>
              <p className="text-gray-700 text-lg mt-2">
                We are seeking a skilled software engineer to develop high-quality software solutions.
              </p>
              <ul className="my-4 bg-gray-100 p-4 rounded">
                <li className="mb-2"><strong>Salary:</strong> $80,000</li>
                <li className="mb-2">
                  <strong>Location:</strong> New York
                  <span className="text-xs bg-blue-500 text-white rounded-full px-2 py-1 ml-2">
                    Local
                  </span>
                </li>
                <li className="mb-2">
                  <strong>Tags:</strong> <span>Development</span>, <span>Coding</span>
                </li>
              </ul>
              <a 
                href="details.html" 
                className="block w-full text-center px-5 py-2.5 shadow-sm rounded border text-base font-medium text-indigo-700 bg-indigo-100 hover:bg-indigo-200"
              >
                Details
              </a>
            </div>
          </div>

          {/* Job Listing 2: Marketing Specialist */}
          <div className="rounded-lg shadow-md bg-white">
            <div className="p-4">
              <h2 className="text-xl font-semibold">Marketing Specialist</h2>
              <p className="text-gray-700 text-lg mt-2">
                We are looking for a Marketing Specialist to create and manage marketing campaigns.
              </p>
              <ul className="my-4 bg-gray-100 p-4 rounded">
                <li className="mb-2"><strong>Salary:</strong> $70,000</li>
                <li className="mb-2">
                  <strong>Location:</strong> San Francisco
                  <span className="text-xs bg-blue-500 text-white rounded-full px-2 py-1 ml-2">
                    Remote
                  </span>
                </li>
                <li className="mb-2">
                  <strong>Tags:</strong> <span>Marketing</span>, <span>Advertising</span>
                </li>
              </ul>
              <a 
                href="details.html" 
                className="block w-full text-center px-5 py-2.5 shadow-sm rounded border text-base font-medium text-indigo-700 bg-indigo-100 hover:bg-indigo-200"
              >
                Details
              </a>
            </div>
          </div>

          {/* Job Listing 3: Web Developer */}
          <div className="rounded-lg shadow-md bg-white">
            <div className="p-4">
              <h2 className="text-xl font-semibold">Web Developer</h2>
              <p className="text-gray-700 text-lg mt-2">
                Join our team as a Web Developer and create amazing web applications.
              </p>
              <ul className="my-4 bg-gray-100 p-4 rounded">
                <li className="mb-2"><strong>Salary:</strong> $75,000</li>
                <li className="mb-2">
                  <strong>Location:</strong> Los Angeles
                  <span className="text-xs bg-blue-500 text-white rounded-full px-2 py-1 ml-2">
                    Local
                  </span>
                </li>
                <li className="mb-2">
                  <strong>Tags:</strong> <span>Web Development</span>, <span>Programming</span>
                </li>
              </ul>
              <a 
                href="details.html" 
                className="block w-full text-center px-5 py-2.5 shadow-sm rounded border text-base font-medium text-indigo-700 bg-indigo-100 hover:bg-indigo-200"
              >
                Details
              </a>
            </div>
          </div>

          {/* Job Listing 4: Data Analyst */}
          <div className="rounded-lg shadow-md bg-white">
            <div className="p-4">
              <h2 className="text-xl font-semibold">Data Analyst</h2>
              <p className="text-gray-700 text-lg mt-2">
                We are hiring a Data Analyst to analyze and interpret data for insights.
              </p>
              <ul className="my-4 bg-gray-100 p-4 rounded">
                <li className="mb-2"><strong>Salary:</strong> $65,000</li>
                <li className="mb-2">
                  <strong>Location:</strong> Chicago
                  <span className="text-xs bg-blue-500 text-white rounded-full px-2 py-1 ml-2">
                    Remote
                  </span>
                </li>
                <li className="mb-2">
                  <strong>Tags:</strong> <span>Data Analysis</span>, <span>Statistics</span>
                </li>
              </ul>
              <a 
                href="details.html" 
                className="block w-full text-center px-5 py-2.5 shadow-sm rounded border text-base font-medium text-indigo-700 bg-indigo-100 hover:bg-indigo-200"
              >
                Details
              </a>
            </div>
          </div>

          {/* Job Listing 5: Graphic Designer */}
          <div className="rounded-lg shadow-md bg-white">
            <div className="p-4">
              <h2 className="text-xl font-semibold">Graphic Designer</h2>
              <p className="text-gray-700 text-lg mt-2">
                Join our creative team as a Graphic Designer and bring ideas to life.
              </p>
              <ul className="my-4 bg-gray-100 p-4 rounded">
                <li className="mb-2"><strong>Salary:</strong> $60,000</li>
                <li className="mb-2">
                  <strong>Location:</strong> Miami
                  <span className="text-xs bg-blue-500 text-white rounded-full px-2 py-1 ml-2">
                    Local
                  </span>
                </li>
                <li className="mb-2">
                  <strong>Tags:</strong> <span>Graphic Design</span>, <span>Creative</span>
                </li>
              </ul>
              <a 
                href="details.html" 
                className="block w-full text-center px-5 py-2.5 shadow-sm rounded border text-base font-medium text-indigo-700 bg-indigo-100 hover:bg-indigo-200"
              >
                Details
              </a>
            </div>
          </div>

          {/* Job Listing 6: Data Scientist */}
          <div className="rounded-lg shadow-md bg-white">
            <div className="p-4">
              <h2 className="text-xl font-semibold">Data Scientist</h2>
              <p className="text-gray-700 text-lg mt-2">
                We're looking for a Data Scientist to analyze complex data and generate insights.
              </p>
              <ul className="my-4 bg-gray-100 p-4 rounded">
                <li className="mb-2"><strong>Salary:</strong> $90,000</li>
                <li className="mb-2">
                  <strong>Location:</strong> Seattle
                  <span className="text-xs bg-blue-500 text-white rounded-full px-2 py-1 ml-2">
                    Remote
                  </span>
                </li>
                <li className="mb-2">
                  <strong>Tags:</strong> <span>Data Science</span>, <span>Machine Learning</span>
                </li>
              </ul>
              <a 
                href="details.html" 
                className="block w-full text-center px-5 py-2.5 shadow-sm rounded border text-base font-medium text-indigo-700 bg-indigo-100 hover:bg-indigo-200"
              >
                Details
              </a>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default JobListing