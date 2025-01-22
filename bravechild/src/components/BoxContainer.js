import React from 'react'
import "./BoxContainer.css"

const BoxContainer = () => {
    const boxes = [1, 2, 3]

    return (
        <div className='box-container'>
            {boxes.map((box, index) => (
                <div key={index} className='box'>
                    <p>Box {box}</p>
                    <div className='placeholder'>
                        <p>Image/Payment Button</p>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default BoxContainer; 