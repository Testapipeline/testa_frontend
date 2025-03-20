import image1 from "../assets/2.jpg";
import image2 from "../assets/3.jpg";
import image3 from "../assets/4.jpg";

export const Testimonials = () => {
  const testimonials = [{
    content: "TESTA has been instrumental in my exam preparation. The quality of content is exceptional.",
    author: "Sarah Johnson",
    role: "Computer Science Student",
    image: image1
  }, {
    content: "As an instructor, I'm impressed by the platform's reach and the impact it has on students.",
    author: "Michael Chen",
    role: "Engineering Instructor",
    image: image2
  }, {
    content: "The variety of exam papers available helped me understand different question patterns.",
    author: "Emily Williams",
    role: "Business Studies Student",
    image: image3
  }];
  return <div className="bg-gray-50 py-16 sm:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
            Trusted by Students and Instructors
          </h2>
          <p className="mt-4 text-xl text-gray-600">
            Here's what our community has to say
          </p>
        </div>
        <div className="mt-12 grid gap-8 lg:grid-cols-3 lg:gap-x-8">
          {testimonials.map((testimonial, index) => <div key={index} className="bg-white rounded-lg shadow-lg overflow-hidden">
              <div className="px-6 py-8">
                <div className="relative text-lg font-medium text-gray-700">
                  <svg className="absolute top-0 left-0 transform -translate-x-3 -translate-y-2 h-8 w-8 text-gray-200" fill="currentColor" viewBox="0 0 32 32" aria-hidden="true">
                    <path d="M9.352 4C4.456 7.456 1 13.12 1 19.36c0 5.088 3.072 8.064 6.624 8.064 3.36 0 5.856-2.688 5.856-5.856 0-3.168-2.208-5.472-5.088-5.472-.576 0-1.344.096-1.536.192.48-3.264 3.552-7.104 6.624-9.024L9.352 4zm16.512 0c-4.8 3.456-8.256 9.12-8.256 15.36 0 5.088 3.072 8.064 6.624 8.064 3.264 0 5.856-2.688 5.856-5.856 0-3.168-2.304-5.472-5.184-5.472-.576 0-1.248.096-1.44.192.48-3.264 3.456-7.104 6.528-9.024L25.864 4z" />
                  </svg>
                  <p className="relative ml-4">{testimonial.content}</p>
                </div>
                <div className="mt-6 flex items-center">
                  <div className="flex-shrink-0">
                    <img className="h-12 w-12 rounded-full" src={testimonial.image} alt={testimonial.author} />
                  </div>
                  <div className="ml-4">
                    <div className="text-base font-medium text-gray-900">
                      {testimonial.author}
                    </div>
                    <div className="text-sm text-gray-500">
                      {testimonial.role}
                    </div>
                  </div>
                </div>
              </div>
            </div>)}
        </div>
      </div>
    </div>;
};