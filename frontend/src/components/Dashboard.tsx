import React from 'react';
import CandidateFormComponent from './CandidateForm';
import './Dashboard.css';

interface DashboardState {
  currentView: 'dashboard' | 'add-candidate';
  notification: {
    message: string;
    type: 'success' | 'error' | null;
  };
}

export class Dashboard extends React.Component<{}, DashboardState> {
  constructor(props: {}) {
    super(props);
    this.state = {
      currentView: 'dashboard',
      notification: {
        message: '',
        type: null
      }
    };
  }

  private showNotification = (message: string, type: 'success' | 'error') => {
    this.setState({
      notification: { message, type }
    });

    // Auto-hide notification after 5 seconds
    setTimeout(() => {
      this.setState({
        notification: { message: '', type: null }
      });
    }, 5000);
  };

  private handleAddCandidateClick = () => {
    this.setState({ currentView: 'add-candidate' });
  };

  private handleBackToDashboard = () => {
    this.setState({ currentView: 'dashboard' });
  };

  private handleCandidateSuccess = (message: string) => {
    this.showNotification(message, 'success');
    // Stay on the form to allow adding more candidates
  };

  private handleCandidateError = (error: string) => {
    this.showNotification(error, 'error');
  };

  private renderDashboard = () => {
    return (
      <div className="dashboard-container">
        <header className="dashboard-header">
          <div className="header-content">
            <h1 className="dashboard-title">Talent Tracking System</h1>
            <p className="dashboard-subtitle">Recruiter Dashboard</p>
          </div>
        </header>

        <main className="dashboard-main">
          <div className="dashboard-content">
            <div className="welcome-section">
              <h2>Welcome to your ATS Dashboard</h2>
              <p>Manage your recruitment process efficiently with our comprehensive candidate tracking system.</p>
            </div>

            <div className="action-cards">
              <div className="action-card primary" onClick={this.handleAddCandidateClick}>
                <div className="card-icon">
                  <svg width="48" height="48" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 5V19M5 12H19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <h3>Add New Candidate</h3>
                <p>Add candidates to the ATS system with comprehensive information and document upload.</p>
                <button className="card-button">Get Started</button>
              </div>

              <div className="action-card">
                <div className="card-icon">
                  <svg width="48" height="48" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M17 21V19C17 17.9391 16.5786 16.9217 15.8284 16.1716C15.0783 15.4214 14.0609 15 13 15H5C3.93913 15 2.92172 15.4214 2.17157 16.1716C1.42143 16.9217 1 17.9391 1 19V21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <circle cx="9" cy="7" r="4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M23 21V19C23 18.1645 22.7155 17.3541 22.2094 16.7018C21.7033 16.0494 20.9983 15.5901 20.2 15.4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M16 3.13C16.8604 3.35031 17.623 3.85071 18.1676 4.55232C18.7122 5.25392 19.0078 6.11683 19.0078 7.005C19.0078 7.89317 18.7122 8.75608 18.1676 9.45768C17.623 10.1593 16.8604 10.6597 16 10.88" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <h3>View Candidates</h3>
                <p>Browse and manage all candidates in your recruitment pipeline.</p>
                <button className="card-button" disabled>Coming Soon</button>
              </div>

              <div className="action-card">
                <div className="card-icon">
                  <svg width="48" height="48" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M9 11H15M9 15H15M17 21H7C5.89543 21 5 20.1046 5 19V5C5 3.89543 5.89543 3 7 3H12.5858C12.851 3 13.1054 3.10536 13.2929 3.29289L19.7071 9.70711C19.8946 9.89464 20 10.149 20 10.4142V19C20 20.1046 19.1046 21 18 21H17Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <h3>Reports & Analytics</h3>
                <p>Generate insights and reports on your recruitment activities.</p>
                <button className="card-button" disabled>Coming Soon</button>
              </div>
            </div>

            <div className="stats-section">
              <h3>Quick Stats</h3>
              <div className="stats-grid">
                <div className="stat-card">
                  <div className="stat-number">0</div>
                  <div className="stat-label">Total Candidates</div>
                </div>
                <div className="stat-card">
                  <div className="stat-number">0</div>
                  <div className="stat-label">Active Applications</div>
                </div>
                <div className="stat-card">
                  <div className="stat-number">0</div>
                  <div className="stat-label">Interviews Scheduled</div>
                </div>
                <div className="stat-card">
                  <div className="stat-number">0</div>
                  <div className="stat-label">Positions Filled</div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    );
  };

  private renderAddCandidate = () => {
    return (
      <div className="add-candidate-view">
        <div className="back-navigation">
          <button className="back-button" onClick={this.handleBackToDashboard}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M19 12H5M12 19L5 12L12 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            Back to Dashboard
          </button>
        </div>
        <CandidateFormComponent 
          onSuccess={this.handleCandidateSuccess}
          onError={this.handleCandidateError}
        />
      </div>
    );
  };

  render() {
    const { currentView, notification } = this.state;

    return (
      <div className="app-container">
        {notification.type && (
          <div className={`notification ${notification.type}`}>
            <div className="notification-content">
              <span>{notification.message}</span>
              <button 
                className="notification-close"
                onClick={() => this.setState({ notification: { message: '', type: null } })}
              >
                ×
              </button>
            </div>
          </div>
        )}

        {currentView === 'dashboard' ? this.renderDashboard() : this.renderAddCandidate()}
      </div>
    );
  }
}

export default Dashboard; 