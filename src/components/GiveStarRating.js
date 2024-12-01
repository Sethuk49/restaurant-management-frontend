import React from 'react';

const GiveStarRating = ({ rating, onRatingChange }) => {
    const stars = [1, 2, 3, 4, 5];

    return (
        <div className="flex">
            {stars.map((star) => (
                <button
                    key={star}
                    type="button"
                    className={`text-2xl ${star <= rating ? 'text-yellow-500' : 'text-gray-400'}`}
                    onClick={() => onRatingChange(star)}
                >
                    ★
                </button>
            ))}
        </div>
    );
};

export default GiveStarRating;
