import React from 'react'

const SponsorDonation = () => {
     
    const [formData, setFormData] = React.useState ({
        fname: "",
        lname: "", 
        address: "", 
        date: "", 
        bill_add: ""
    }); 

    const handleInputChange = (field, value) => {
        setFormData((prevData) => ({
            ...prevData, 
            [field]: value,
        }));
    };

    return (
        <div className="donor-container" 
        style="font-family: Arial, sans-serif; 
                text-align: center; padding: 20px"
        >
            <h1>Sponsor Donation</h1>
            <InputForm formData={formData} onInputChange={handleInputChange} />
            <BoxContainer />
        </div>
    );
};

export default SponsorDonation; 