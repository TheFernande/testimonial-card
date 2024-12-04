import TestimonialCard from "./components/TestimonialCard";

const testimonialData = {
  name: "Sarah Dole",
  username: "@sarahdole",
  testimonial:
    "I've been searching for high-quality abstract images for my design projects, and I'm thrilled to have found this platform. The variety and depth of creativity are astounding!",
  imageUrl: "/images/profile-thumbnail.jpg",
};

export default function Home() {
  return (
    <main className="min-h-screen p-8 flex justify-center bg-gradient-to-b from-gray-50 to-gray-300">
      <div className="mt-[200px]">
        <TestimonialCard
          name={testimonialData.name}
          username={testimonialData.username}
          testimonial={testimonialData.testimonial}
          imageUrl={testimonialData.imageUrl}
        />
      </div>
    </main>
  );
}
