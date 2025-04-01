import React from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../ui/carousel";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setSearchedQuery } from "@/redux/jobSlice";

const category = [
  { title: "Human Resource", icon: "👤" },
  { title: "Accounting", icon: "✒️" },
  { title: "Marketing", icon: "📢" },
  { title: "Design", icon: "🎨" },
];

const CategoryCarousel = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const searchJobHandler = (query) => {
    dispatch(setSearchedQuery(query));
    navigate("/browse");
  };

  return (
    <div>
      <Carousel className="w-full max-w-[1084px] mx-auto my-20">
        <CarouselContent className="gap-6">
          {category.map((cat, index) => (
            <CarouselItem
              key={index}
              className="md:basis-1/2 lg:basis-1/3 w-full h-[230px]"
            >
              <button
                onClick={() => searchJobHandler(cat)}
                className="h-[192px] w-[256px] bg-white rounded-2xl shadow-lg shadow-black/10 flex flex-col items-center justify-center text-center p-6 cursor-pointer"
              >
                <div className="text-4xl">{cat.icon}</div>
                <h3 className="text-lg font-semibold mt-2">{cat.title}</h3>
                <p className="text-gray-400 text-sm">{cat.jobs}</p>
              </button>
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
