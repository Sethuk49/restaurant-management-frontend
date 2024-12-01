import React from 'react';

const StarRating = ({ rating }) => {
  return (
    <div className="flex items-center">
      {[...Array(5)].map((_, index) => (
        <svg
          key={index}
          className={`w-6 h-6 ${index < rating ? 'text-yellow-500' : 'text-gray-300'}`}
          fill="currentColor"
          viewBox="0 0 24 24"
        >
          <path d="M12 .587l3.668 7.431 8.213 1.189-5.941 5.779 1.404 8.189L12 18.896l-7.344 3.863 1.404-8.189-5.941-5.779 8.213-1.189z" />
        </svg>
      ))}
    </div>
  );
};

export default StarRating;
