import React from 'react';
import "./InputForm.css"

const ImportForm = ({ formData, onInputChange }) => {
    return (
        <div className="input-form">
            <h2> Sponsor Donation </h2>
            <form>
                <label>
                    First Name:
                    <input type='text' value={formData.fname}/>
                </label>
                <label>
                    Last Name:
                    <input type='text' value={formData.lname}/>
                </label>
                <label>
                    Address:
                    <input type='text' value={formData.address}/>
                </label>
                <label>
                    Date:
                    <input type='text' value={formData.date}/>
                </label>
                <label>
                    Billing Address:
                    <input type='text' value={formData.bill_add}/>
                </label>

            </form>
        </div>
    );
};

export default InputForm;