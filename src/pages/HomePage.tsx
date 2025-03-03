import { Features } from "../components/Features";
import { Stats } from "../components/Stats";
import { Testimonials } from "../components/Testimonials";
import { DepartmentGrid } from "../components/DepartmentGrid";
import { Hero } from "../components/Hero";

export const HomePage = () => {
    return (
        <main className="overflow-x-hidden">
            <Hero />
            <Features />
            <Stats />
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <h2 className="text-3xl font-extrabold text-gray-900 text-center mb-12">
                    Browse Examinations by Department
                </h2>
                <DepartmentGrid />
            </div>
            <Testimonials />
        </main>
    );
};