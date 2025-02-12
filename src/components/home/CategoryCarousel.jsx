import React from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../ui/carousel";

const category = [
  { title: "Human Resource", jobs: "23 Jobs Available", icon: "👤" },
  { title: "Accounting", jobs: "23 Jobs Available", icon: "✒️" },
  { title: "Marketing", jobs: "18 Jobs Available", icon: "📢" },
  { title: "Design", jobs: "15 Jobs Available", icon: "🎨" },
];

const CategoryCarousel = () => {
  return (
    <div>
      <Carousel className="w-full max-w-[1084px] mx-auto my-20">
        <CarouselContent className="gap-6">
          {category.map((cat, index) => (
            <CarouselItem
              key={index}
              className="md:basis-1/2 lg:basis-1/3 w-full h-[230px]"
            >
              <div className="h-[192px] w-[256px] bg-white rounded-2xl shadow-lg shadow-black/10 flex flex-col items-center justify-center text-center p-6">
                <div className="text-4xl">{cat.icon}</div>
                <h3 className="text-lg font-semibold mt-2">{cat.title}</h3>
                <p className="text-gray-400 text-sm">{cat.jobs}</p>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  );
};

export default CategoryCarousel;
