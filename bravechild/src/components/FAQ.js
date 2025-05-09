import React, { useState } from 'react';

const FAQ = ({question, answer, answer2 }) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="faq-item">
            <div className="faq-question" onClick={() => setIsOpen(!isOpen)}>
                <h3>{question}</h3>
                <span className={`arrow ${isOpen ? 'open' : ''}`}>▼</span>
            </div>
            {isOpen && (
                <div className="faq-answer">
                    <div className="faq-answer1">
                        <p>{answer}</p>
                    </div>
                    <div className="faq-answer2">
                        <p>{answer2}</p>
                    </div>
                </div>
            )}
        </div>
    );
};

export default FAQ;