// MedicineComponent.jsx

import React, { useState, useEffect } from 'react';

const MedicineComponent = () => {
  const [medicines, setMedicines] = useState([]);
  const [newMedicine, setNewMedicine] = useState({ name: '', dosage: '' });

  useEffect(() => {
    fetch('/api/medicines')
      .then(response => response.json())
      .then(data => setMedicines(data))
      .catch(error => console.error(error));
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewMedicine({ ...newMedicine, [name]: value });
  };

  const addMedicine = () => {
    fetch('/api/medicines', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newMedicine),
    })
      .then(response => response.json())
      .then(data => {
        setMedicines([...medicines, data]); // Update medicines state with the newly added medicine
        setNewMedicine({ name: '', dosage: '' });
      })
      .catch(error => console.error(error));
  };

  const deleteMedicine = (id) => {
    fetch(`/api/medicines/${id}`, {
      method: 'DELETE',
    })
      .then(() => {
        const updatedMedicines = medicines.filter(medicine => medicine._id !== id);
        setMedicines(updatedMedicines);
      })
      .catch(error => console.error(error));
  };

  return (
    <div>
      <h2>Medicines</h2>
      <div>
        <input
          type="text"
          placeholder="Medicine Name"
          name="name"
          value={newMedicine.name}
          onChange={handleInputChange}
        />
        <input
          type="text"
          placeholder="Dosage"
          name="dosage"
          value={newMedicine.dosage}
          onChange={handleInputChange}
        />
        <button onClick={addMedicine}>Add Medicine</button>
      </div>
      <ul>
        {medicines.map(medicine => (
          <li key={medicine._id}>
            <span>{medicine.name} - {medicine.dosage}</span>
            <button onClick={() => deleteMedicine(medicine._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MedicineComponent;
