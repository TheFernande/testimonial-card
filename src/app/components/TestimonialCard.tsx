"use client";

import Image from "next/image";
import autoAnimate from "@formkit/auto-animate";
import { useEffect, useRef, useState } from "react";
import { ChevronDownIcon, ChevronUpIcon } from "lucide-react";

interface TestimonialCardProps {
  name?: string;
  username?: string;
  testimonial?: string;
  imageUrl?: string;
  maxTestimonialLength?: number;
}

const TestimonialCard: React.FC<TestimonialCardProps> = ({
  name = "Sarah Dole",
  username = "@sarahdole",
  testimonial = "I've been searching for high-quality abstract images for my design projects, and I'm thrilled to have found this platform. The variety and depth of creativity are astounding! I've been searching for high-quality abstract images for my design projects, and I'm thrilled to have found this platform. The variety and depth of creativity are astounding!",
  imageUrl = "/images/profile-thumbnail.jpg",
  maxTestimonialLength = 150,
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const isTruncated = testimonial.length > maxTestimonialLength;
  const animationTrigger = useRef(null);

  useEffect(() => {
    if (animationTrigger.current) {
      autoAnimate(animationTrigger.current, {
        duration: 150,
        easing: "ease-in-out",
        disrespectUserMotionPreference: true,
      });
    }
  }, []);

  return (
    <article className="w-full max-w-[340px] p-4 sm:p-6 bg-white rounded-lg shadow-lg border border-gray-200">
      <div className="flex flex-col gap-4">
        <div className="flex items-center gap-3">
          <div className="relative aspect-square w-[48px] flex-shrink-0">
            <Image
              src={imageUrl}
              alt={`Profile picture of ${name}`}
              fill
              className="rounded-full object-cover bg-gray-100"
              sizes="(max-width: 48px) 100vw, 48px"
            />
          </div>

          <div className="min-w-0 flex-1">
            <h2 className="text-base sm:text-lg font-semibold text-gray-900 truncate">
              {name}
            </h2>
            <span className="text-sm text-gray-500 truncate">{username}</span>
          </div>
        </div>

        <div
          ref={animationTrigger}
          className="flex flex-col gap-2 overflow-hidden"
        >
          {isExpanded && (
            <p className="text-sm sm:text-base text-gray-700 leading-relaxed break-words origin-top">
              {testimonial}
            </p>
          )}
          {!isExpanded && (
            <p className="text-sm sm:text-base text-gray-700 leading-relaxed break-words origin-top">
              {testimonial.slice(0, maxTestimonialLength)}...
            </p>
          )}
          {isTruncated && (
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="mt-2 text-sm text-blue-600 hover:text-blue-800 font-medium"
            >
              {isExpanded && <ChevronUpIcon />}
              {!isExpanded && <ChevronDownIcon />}
            </button>
          )}
        </div>
      </div>
    </article>
  );
};

export default TestimonialCard;
