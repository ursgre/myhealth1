import React, { useState } from 'react';
import anxiety from '@/assets/anxiety.jpg'
import './symptoms.css'




interface Symptom {
    id: number;
    name: string;
    caption: string;
  }
  
  const symptomsData: Symptom[] = [
    {
        id: 1,
        name: "Anxiety",
        caption: "Feeling anxious and restless."
      },
      {
        id: 2,
        name: "Depression",
        caption: "Feeling sad and unmotivated."
      },
      {
        id: 3,
        name: "Angry",
        caption: "Feeling sad and unmotivated."
      },
      {
        id: 4,
        name: "Tired",
        caption: "Feeling sad and unmotivated."
      },
      {
        id: 5,
        name: "Happy",
        caption: "Feeling sad and unmotivated."
      },
      {
        id: 6,
        name: "Bored",
        caption: "Feeling sad and unmotivated."
      },
  ];
  
  function Symptoms() {
    const [selectedSymptom, setSelectedSymptom] = useState<Symptom | null>(null);
    const [recordedSymptoms, setRecordedSymptoms] = useState<{ symptom: Symptom; date: string }[]>([]);
    const [searchDate, setSearchDate] = useState<string>('');
    const [searchedSymptoms, setSearchedSymptoms] = useState<{ symptom: Symptom; date: string }[]>([]);
  
    const handleSymptomSelect = (symptom: Symptom) => {
      setSelectedSymptom(symptom);
    };
  
    const isSymptomAlreadyRecorded = (selectedSymptom: Symptom | null) => {
      const currentDate = new Date().toISOString().split('T')[0];
      return recordedSymptoms.some(
        (record) =>
          record.date === currentDate && record.symptom.id === selectedSymptom?.id
      );
    };
  
    const handleRecordSymptom = () => {
      if (selectedSymptom && !isSymptomAlreadyRecorded(selectedSymptom)) {
        const currentDate = new Date().toISOString().split('T')[0];
        const newRecord = {
          symptom: selectedSymptom,
          date: currentDate,
        };
        setRecordedSymptoms([...recordedSymptoms, newRecord]);
        setSelectedSymptom(null);
      } else if (isSymptomAlreadyRecorded(selectedSymptom)) {
        alert('You have already recorded this symptom today.');
      }
    };
  
    const groupedSymptoms: Record<string, { symptom: Symptom; date: string }[]> = recordedSymptoms.reduce((acc, record) => {
      if (!acc[record.date]) {
        acc[record.date] = [];
      }
      acc[record.date].push(record);
      return acc;
    }, {});
  
    const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      const formattedSearchDate = new Date(searchDate).toISOString().split('T')[0];
      const filteredSymptoms = recordedSymptoms.filter(
        (record) => record.date === formattedSearchDate
      );
      setSearchedSymptoms(filteredSymptoms);
    };
  

  return (
    <div className="App">
      <h1>Mental Health Symptom Tracker</h1>

      <div className="symptom-list">
        {symptomsData.map((symptom) => (
          <div
            key={symptom.id}
            className={`symptom-item ${selectedSymptom === symptom ? 'selected' : ''}`}
            onClick={() => handleSymptomSelect(symptom)}
          >
          
            <div className="symptom-info">
              <strong>{symptom.name}</strong>
              <p>{symptom.caption}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="button-container">
        <button onClick={handleRecordSymptom}>Record Symptom</button>
      </div>

      <h2>Recorded Symptoms</h2>
      {Object.keys(groupedSymptoms).map((date) => (
        <div key={date}>
          <h3>{date}</h3>
          <ul className="recorded-symptoms">
            {groupedSymptoms[date].map((record, index) => (
              <li key={index}>
                <div>
                  <strong>{record.symptom.name}</strong>
                </div>
              </li>
            ))}
          </ul>
        </div>
      ))}

      <div className="search-container">
        <form onSubmit={handleSearch}>
          <input
            type="date"
            value={searchDate}
            onChange={(e) => setSearchDate(e.target.value)}
          />
          <button type="submit">Search Symptoms</button>
        </form>
      </div>

      {searchedSymptoms.length > 0 && (
        <div className="search-results">
          <h2>Search Results</h2>
          <ul className="recorded-symptoms">
            {searchedSymptoms.map((record, index) => (
              <li key={index}>
                <div>
                  <strong>{record.symptom.name}</strong>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default Symptoms;
