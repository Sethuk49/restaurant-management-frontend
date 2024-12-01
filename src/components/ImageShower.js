// src/ImageShower.js
import React, { useState } from 'react';

const ImageShower = (props) => {
    const images = [...props?.images];

    const [currentIndex, setCurrentIndex] = useState(0);

    return (
        <div>
                {/* Main Image Display */}
                <img
                    src={`${process.env.REACT_APP_END_URL}/${images[currentIndex]}`}
                    alt={`Slide ${currentIndex + 1}`}
                    className="w-full h-[70vh] object-cover border rounded shadow-lg"
                />
                
                {/* Thumbnails Suggestions */}
                <div className='flex justify-center space-x-2 p-2 overflow-x-auto'>
                    {images.map((src, index=0) => (
                        <img
                            key={index}
                            src={`${process.env.REACT_APP_END_URL}/${src}`}
                            alt={`Thumbnail ${index + 1}`}
                            className={`w-24 h-24 object-cover cursor-pointer rounded ${currentIndex === index ? 'border-2 border-blue-500' : 'border border-gray-300'}`}
                            onClick={() => setCurrentIndex(index)}
                        />
                    ))}
                </div>
            </div>
    );
};

export default ImageShower;
