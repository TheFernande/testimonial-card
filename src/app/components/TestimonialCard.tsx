"use client";

import Image from "next/image";
import autoAnimate from "@formkit/auto-animate";
import { useEffect, useRef, useState } from "react";
import { ChevronDownIcon, ChevronUpIcon } from "lucide-react";

interface TestimonialCardProps {
  name: string;
  username: string;
  testimonial: string;
  imageUrl: string;
  maxTestimonialLength?: number;
}

const MAX_TESTIMONIAL_LENGTH = 180;

const TestimonialCard: React.FC<TestimonialCardProps> = (props) => {
  const {
    name,
    username,
    testimonial,
    imageUrl,
    maxTestimonialLength = MAX_TESTIMONIAL_LENGTH,
  } = props;

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
    <article className="w-full max-w-[340px] p-4 sm:p-6 bg-white rounded-lg shadow">
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

          <div className="min-w-0 flex flex-col">
            <h2 className="text-lg font-semibold text-neutral-900 truncate">
              {name}
            </h2>
            <span className="text-sm text-neutral-600 truncate">
              {username}
            </span>
          </div>
        </div>

        <div
          ref={animationTrigger}
          className="flex flex-col gap-2 overflow-hidden"
        >
          {!isExpanded && !isTruncated && (
            <p className="text-base font-normal text-neutral-600 leading-6 break-words origin-top">
              {testimonial}
            </p>
          )}
          {!isExpanded && isTruncated && (
            <p className="text-base font-normal text-neutral-600 leading-6 break-words origin-top">
              {testimonial.slice(0, maxTestimonialLength)}...
            </p>
          )}
          {isExpanded && isTruncated && (
            <p className="text-base font-normal text-neutral-600 leading-6 break-words origin-top">
              {testimonial}
            </p>
          )}
          {isTruncated && (
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="p-0 m-0 text-sm text-neutral-500 hover:text-neutral-700 font-medium"
            >
              {isExpanded && (
                <span className="flex items-center justify-end gap-1">
                  Show less
                  <ChevronUpIcon size={16} />
                </span>
              )}
              {!isExpanded && (
                <span className="flex items-center justify-end gap-1">
                  Show more
                  <ChevronDownIcon size={16} />
                </span>
              )}
            </button>
          )}
        </div>
      </div>
    </article>
  );
};

export default TestimonialCard;
