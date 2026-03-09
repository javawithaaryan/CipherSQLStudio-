import React, { useEffect, useState } from 'react';
import AssignmentCard from '../components/AssignmentCard/AssignmentCard';
import { getAssignments } from '../services/api';
import './HomePage.scss';

const HomePage = () => {
  const [assignments, setAssignments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchAssignments = async () => {
      try {
        const res = await getAssignments();
        setAssignments(res.data);
      } catch (err) {
        setError('Failed to fetch assignments. Please check server connection.');
      } finally {
        setLoading(false);
      }
    };

    fetchAssignments();
  }, []);

  if (loading) return <div className="loading">Loading assignments...</div>;
  if (error) return <div className="error-msg">{error}</div>;

  return (
    <main className="home-page">
      <header className="home-page__hero mb-4">
        <h1>SQL Mastery Challenges</h1>
        <p>Enhance your database skills with interactive, AI-assisted hands-on scenarios.</p>
      </header>
      
      {assignments.length === 0 ? (
        <p className="no-data">No assignments available currently.</p>
      ) : (
        <div className="assignment-grid">
          {assignments.map(a => (
            <AssignmentCard key={a._id} data={a} />
          ))}
        </div>
      )}
    </main>
  );
};

export default HomePage;
