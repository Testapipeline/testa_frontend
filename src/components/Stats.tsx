export const Stats = () => {
  const stats = [{
    name: "Active Students",
    value: "2,000+"
  }, {
    name: "Expert Instructors",
    value: "100+"
  }, {
    name: "Exam Papers",
    value: "5,000+"
  }, {
    name: "Success Rate",
    value: "95%"
  }];
  return <div className="bg-blue-600">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:py-16 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map(stat => <div key={stat.name} className="text-center">
              <div className="text-4xl font-extrabold text-white">
                {stat.value}
              </div>
              <div className="mt-2 text-base font-medium text-blue-100">
                {stat.name}
              </div>
            </div>)}
        </div>
      </div>
    </div>;
};