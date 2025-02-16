// src/components/AdminDashboard.js
import React, { useState, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";

import { add_donee } from '../services/add_donee';
import { fetch_donees } from '../services/fetch_donees';
import { fetch_donos } from '../services/fetch_donos';
import { remove_donee } from '../services/remove_donee';

import '../styles/Admin.css';

// const AdminDashboard = () => {
// 	const [firstname, setFirst] = useState('');
// 	const [lastname, setLast] = useState('');
// 	const [donations, setDonations] = useState([]);
// 	const [donees, setDonees] = useState([]);
// 	const [startDate, setStartDate] = useState(new Date(new Date().setMonth(new Date().getMonth() - 1)));
// 	const [endDate, setEndDate] = useState(new Date());
// 	const [loading, setLoading] = useState(true);
// 	const [doneesError, setDoneesError] = useState(null);
// 	const [donationsError, setDonationsError] = useState(null);

// 	useEffect(() => {
// 		const fetchData = async () => {
// 		  setDoneesError(null);
// 		  setDonationsError(null);
// 		  setLoading(true);
	
// 		  // Fetch donees
// 		  try {
// 			const doneesData = await fetch_donees();
// 			if (doneesData?.success) {
// 			  setDonees(doneesData);
// 			} else {
// 			  setDoneesError(doneesData?.message || 'Failed to fetch donees');
// 			}
// 		  } catch (error) {
// 			console.error('Error fetching donees:', error);
// 			setDoneesError('Unable to load donee information');
// 		  }
	
// 		  // Fetch donations
// 		  try {
// 			const donoData = await fetch_donos(startDate, endDate);
// 			if (donoData?.success) {
// 			  setDonations(donoData);
// 			} else {
// 			  setDonationsError(donoData?.message || 'Failed to fetch donations');
// 			}
// 		  } catch (error) {
// 			console.error('Error fetching donations:', error);
// 			setDonationsError('Unable to load donation information');
// 		  }
	
// 		  setLoading(false);
// 		};
	
// 		fetchData();
// 	  }, [startDate, endDate]);

// const handleAddDonee = async (event) => {
// 	event.preventDefault();

// 	try {
// 		setError(null);
// 		const fullName = `${firstname} ${lastname}`.trim();
// 		if (!fullName) {
// 			setError('Name is required');
// 			return;
// 		}

// 		const result = await add_donee(fullName);

// 		if (result?.success) {
// 			setFirst('');
// 			setLast('');
// 			const updatedDonees = await fetch_donees();
// 			if (updatedDonees?.success) {
// 				setDonees(updatedDonees);
// 			}
// 		} else {
// 			setError(result?.message || 'Failed to add donee');
// 		}
// 	} catch (err) {
// 		console.error('Error adding donee:', err);
// 		setError('Failed to add donee');
// 	}
// };

// const handleRemoveDonee = async (doneeId) => {
// 	if (!window.confirm('Are you sure you want to remove this donee?')) {
// 		return;
// 	}

// 	try {
// 		setError(null);
// 		const result = await remove_donee(doneeId);

// 		if (result?.success) {
// 			const updatedDonees = await fetch_donees();
// 			if (updatedDonees?.success) {
// 				setDonees(updatedDonees);
// 			}
// 		} else {
// 			setError(result?.message || 'Failed to remove donee');
// 		}
// 	} catch (err) {
// 		console.error('Error removing donee:', err);
// 		setError('Failed to remove donee');
// 	}
// };

// 	if (loading) {
// 		return (
// 			<div className="admin-dashboard">
// 				<div className="loading-state">
// 					<p>Loading dashboard data...</p>
// 				</div>
// 			</div>
// 		);
// 	}

// 	if (error) {
// 		return (
// 			<div className="admin-dashboard">
// 				<div className="error-state">
// 					<h2>Something went wrong</h2>
// 					<p>{error}</p>
// 					<button onClick={() => window.location.reload()}>
// 						Retry
// 					</button>
// 				</div>
// 			</div>
// 		);
// 	}

// 	return (
// 		<div className="admin-dashboard">
// 			<h1>Admin Dashboard</h1>

// 			{/* Donations Table */}
// 			<div className="donations-section">
// 				{/* Date Range Selection */}
// 				<div className="date-range-section">
// 					<h2>Select Date Range</h2>
// 					<div className="date-pickers">
// 						<div className="date-picker-container">
// 							<label>Start Date</label>
// 							<DatePicker
// 								selected={startDate}
// 								onChange={date => setStartDate(date)}
// 								selectsStart
// 								startDate={startDate}
// 								endDate={endDate}
// 							/>
// 						</div>
// 						<div className="date-picker-container">
// 							<label>End Date</label>
// 							<DatePicker
// 								selected={endDate}
// 								onChange={date => setEndDate(date)}
// 								selectsEnd
// 								startDate={startDate}
// 								endDate={endDate}
// 								minDate={startDate}
// 							/>
// 						</div>
// 					</div>
// 				</div>
// 				<h2>Donations</h2>
// 				<table>
// 				</table>
// 			</div>

// 			{/* Donee Management */}
// 			<div className="donee-management">
// 				<h2>Manage Donees</h2>

// 				{/* Add Donee Form */}
// 				<div className="donee-management">
// 					<h2>Manage Donees</h2>
// 					<form onSubmit={handleAddDonee} className="add-donee-form">
// 						<div className="input-container">
// 							<label>First Name</label>
// 							<input
// 								type='text'
// 								value={firstname}
// 								onChange={(e) => setFirst(e.target.value)}
// 								required
// 							/>
// 						</div>
// 						<div className="input-container">
// 							<label>Last Name</label>
// 							<input
// 								type='text'
// 								value={lastname}
// 								onChange={(e) => setLast(e.target.value)}
// 								required
// 							/>
// 						</div>
// 						<button type="submit">Add Donee</button>
// 					</form>
// 				</div>

// 				{/* Donees List */}
// 				<div className="donees-list">
// 					<h3>Current Donees</h3>
// 					{doneesError ? (
// 						<div className="error-message">
// 						<p>{doneesError}</p>
// 						<button onClick={() => {
// 							setDoneesError(null);
// 						}}>
// 							Retry Loading Donees
// 						</button>
// 						</div>
// 					) : (
// 					<table>
// 					<thead>
// 						<tr>
// 						<th>Name</th>
// 						<th>Total Donations</th>
// 						<th>Program Start Date</th>
// 						<th>Link</th>
// 						<th>Actions</th>
// 						</tr>
// 					</thead>
// 					<tbody>
// 						{donees?.data?.donees ? (
// 						donees.data.donees.map(donee => (
// 							<tr key={donee.child_id}>
// 							<td>{donee.child_name}</td>
// 							<td>${parseFloat(donee.total_donations).toFixed(2)}</td>
// 							<td>{new Date(donee.began_program_at).toLocaleDateString()}</td>
// 							<td>{donee.link}</td>
// 							<td>
// 								<button 
// 								onClick={() => handleRemoveDonee(donee.child_name)} 
// 								className="remove-btn"
// 								>
// 								Remove
// 								</button>
// 							</td>
// 							</tr>
// 						))
// 						) : (
// 						<tr>
// 							<td colSpan="5">No donees available</td>
// 						</tr>
// 						)}
// 					</tbody>
// 					</table>
// 				)}
// 				</div>
// 			</div>
// 		</div>
// 	);
// };


const AdminDashboard = () => {
	const [firstname, setFirst] = useState('');
	const [lastname, setLast] = useState('');
	const [donations, setDonations] = useState([]);
	const [donees, setDonees] = useState([]);
	const [startDate, setStartDate] = useState(new Date(new Date().setMonth(new Date().getMonth() - 1)));
	const [endDate, setEndDate] = useState(new Date());
	const [loading, setLoading] = useState(true);
	const [doneesError, setDoneesError] = useState(null);
	const [donationsError, setDonationsError] = useState(null);
	const [error, setError] = useState(null);

	useEffect(() => {
		const fetchData = async () => {
			setDoneesError(null);
			setDonationsError(null);
			setLoading(true);

			try {
				const doneesData = await fetch_donees();
				if (doneesData?.success) {
					setDonees(doneesData);
				} else {
					setDoneesError(doneesData?.message || 'Failed to fetch donees');
				}
			} catch (error) {
				console.error('Error fetching donees:', error);
				setDoneesError('Unable to load donee information');
			}

			try {
				const donoData = await fetch_donos(startDate, endDate);
				if (donoData?.success) {
					setDonations(donoData);
				} else {
					setDonationsError(donoData?.message || 'Failed to fetch donations');
				}
			} catch (error) {
				console.error('Error fetching donations:', error);
				setDonationsError('Unable to load donation information');
			}

			setLoading(false);
		};

		fetchData();
	}, [startDate, endDate]);

	const handleAddDonee = async (event) => {
		event.preventDefault();
	
		try {
			setError(null);
			const fullName = `${firstname} ${lastname}`.trim();
			if (!fullName) {
				setError('Name is required');
				return;
			}
	
			const result = await add_donee(fullName);
	
			if (result?.success) {
				setFirst('');
				setLast('');
				const updatedDonees = await fetch_donees();
				if (updatedDonees?.success) {
					setDonees(updatedDonees);
				}
			} else {
				setError(result?.message || 'Failed to add donee');
			}
		} catch (err) {
			console.error('Error adding donee:', err);
			setError('Failed to add donee');
		}
	};
	
	const handleRemoveDonee = async (doneeId) => {
		if (!window.confirm('Are you sure you want to remove this donee?')) {
			return;
		}
	
		try {
			setError(null);
			const result = await remove_donee(doneeId);
	
			if (result?.success) {
				const updatedDonees = await fetch_donees();
				if (updatedDonees?.success) {
					setDonees(updatedDonees);
				}
			} else {
				setError(result?.message || 'Failed to remove donee');
			}
		} catch (err) {
			console.error('Error removing donee:', err);
			setError('Failed to remove donee');
		}
	};

	return (
		<div className="admin-dashboard">
			<h1>Admin Dashboard</h1>

			{/* Donations Section */}
			<div className="donations-section">
			{/* Date Range Selection */}
			<div className="date-range-section">
				<h2>Select Date Range</h2>
				<div className="date-pickers">
					<div className="date-picker-container">
						<label>Start Date</label>
						<DatePicker
							selected={startDate}
							onChange={date => setStartDate(date)}
							selectsStart
							startDate={startDate}
							endDate={endDate}
						/>
					</div>
					<div className="date-picker-container">
						<label>End Date</label>
						<DatePicker
							selected={endDate}
							onChange={date => setEndDate(date)}
							selectsEnd
							startDate={startDate}
							endDate={endDate}
							minDate={startDate}
						/>
					</div>
				</div>
			</div>
			
			<h2>Donations</h2>
			{donationsError ? (
				<div className="error-message">
				<p>{donationsError}</p>
				<button onClick={() => {
					setDonationsError(null);
				}}>
					Retry Loading Donations
				</button>
				</div>
			) : (
				<table>
					<thead>
					<tr>
						<th>Name</th>
						<th>Donation</th>
						<th>Date of</th>
					</tr>
					</thead>
					<tbody>
					{donations?.data?.donations ? (
						donations.data.donations.map(dono => (
							<tr key={dono.dono_id}>
								<td>{dono.dono_id}</td>
							</tr>
						))
					) : (
						<tr>
						<td colSpan="5">No donoations available</td>
						</tr>
					)}
					</tbody>
				</table>
			)}
			</div>

			{/* Donee Management Section */}
			<div className="donee-management">
			<h2>Manage Donees</h2>
			{/* Add Donee Form */}
			<div className="donee-management">
				<h2>Manage Donees</h2>
				<form onSubmit={handleAddDonee} className="add-donee-form">
					<div className="input-container">
						<label>First Name</label>
						<input
							type='text'
							value={firstname}
							onChange={(e) => setFirst(e.target.value)}
							required
						/>
					</div>
					<div className="input-container">
						<label>Last Name</label>
						<input
							type='text'
							value={lastname}
							onChange={(e) => setLast(e.target.value)}
							required
						/>
					</div>
					<button type="submit">Add Donee</button>
				</form>
			</div>
			
			{/* Donees List */}
			<div className="donees-list">
				<h3>Current Donees</h3>
				{doneesError ? (
				<div className="error-message">
					<p>{doneesError}</p>
					<button onClick={() => {
					setDoneesError(null);
					}}>
					Retry Loading Donees
					</button>
				</div>
				) : (
					<table>
						<thead>
						<tr>
							<th>Name</th>
							<th>Total Donations</th>
							<th>Program Start Date</th>
							<th>Link</th>
							<th>Actions</th>
						</tr>
						</thead>
						<tbody>
						{donees?.data?.donees ? (
							donees.data.donees.map(donee => (
							<tr key={donee.child_id}>
								<td>{donee.child_name}</td>
								<td>${parseFloat(donee.total_donations).toFixed(2)}</td>
								<td>{new Date(donee.began_program_at).toLocaleDateString()}</td>
								<td>{donee.link}</td>
								<td>
								<button 
									onClick={() => handleRemoveDonee(donee.child_name)} 
									className="remove-btn"
								>
									Remove
								</button>
								</td>
							</tr>
							))
						) : (
							<tr>
							<td colSpan="5">No donees available</td>
							</tr>
						)}
						</tbody>
					</table>
				)}
			</div>
			</div>
		</div>
	);
};

export default AdminDashboard;