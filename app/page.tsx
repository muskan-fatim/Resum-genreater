'use client';
import { useState } from 'react';
import html2pdf from 'html2pdf.js'; // Ensure this library is installed

type ResumeData = {
  name: string;
  email: string;
  education: string;
  experience: string;
  skills: string;
};

export default function ResumeBuilder() {
  const [isEditing, setIsEditing] = useState({
    name: false,
    email: false,
    education: false,
    experience: false,
    skills: false,
  });

  const [resumeData, setResumeData] = useState<ResumeData>({
    name: '',
    email: '',
    education: '',
    experience: '',
    skills: '',
  });

  const [isResumeGenerated, setIsResumeGenerated] = useState(false);
  const [uniqueUrl, setUniqueUrl] = useState<string | null>(null);

  // Handling form input change
  const handleInputChange = (field: keyof ResumeData, value: string) => {
    setResumeData((prev) => ({ ...prev, [field]: value }));
  };

  // Generate the resume from form input and create a unique URL
  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsResumeGenerated(true);
    const generatedUrl = `${window.location.origin}/${resumeData.name.toLowerCase().replace(/\s+/g, '-')}`;
    setUniqueUrl(generatedUrl);
  };

  // Allow editing of each section in the resume
  const handleEditClick = (field: keyof ResumeData) => {
    setIsEditing((prev) => ({ ...prev, [field]: !prev[field] }));
  };

  // Function to copy the unique URL to clipboard
  const handleCopyLink = () => {
    if (uniqueUrl) {
      navigator.clipboard.writeText(uniqueUrl);
      alert('Link copied to clipboard!');
    }
  };

  // Function to download the resume as a PDF
  const handleDownloadPDF = () => {
    const element = document.getElementById('resume');
    if (element) {
      html2pdf()
        .from(element)
        .set({
          margin: 1,
          filename: `${resumeData.name.replace(/\s+/g, '_')}_Resume.pdf`,
          html2canvas: { scale: 2 },
          jsPDF: { orientation: 'portrait' },
        })
        .save();
    }
  };

  return (
    <div className="resume-builder-container">
      <h1>Resume Builder</h1>

      {!isResumeGenerated ? (
        <form onSubmit={handleFormSubmit} className="resume-form">
          <div className="form-group">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              id="name"
              value={resumeData.name}
              onChange={(e) => handleInputChange('name', e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              value={resumeData.email}
              onChange={(e) => handleInputChange('email', e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="education">Education</label>
            <input
              type="text"
              id="education"
              value={resumeData.education}
              onChange={(e) => handleInputChange('education', e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="experience">Experience</label>
            <input
              type="text"
              id="experience"
              value={resumeData.experience}
              onChange={(e) => handleInputChange('experience', e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="skills">Skills</label>
            <input
              type="text"
              id="skills"
              value={resumeData.skills}
              onChange={(e) => handleInputChange('skills', e.target.value)}
              required
            />
          </div>

          <button type="submit" className="generate-btn">Generate Resume</button>
        </form>
      ) : (
        <>
          <div className="resume-container" id="resume">
            <h2>Your Resume</h2>
            <div className="resume-section">
              <h3>Name:</h3>
              {isEditing.name ? (
                <input
                  type="text"
                  value={resumeData.name}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                  onBlur={() => handleEditClick('name')}
                />
              ) : (
                <p onClick={() => handleEditClick('name')}>{resumeData.name}</p>
              )}
            </div>

            <div className="resume-section">
              <h3>Email:</h3>
              {isEditing.email ? (
                <input
                  type="email"
                  value={resumeData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  onBlur={() => handleEditClick('email')}
                />
              ) : (
                <p onClick={() => handleEditClick('email')}>{resumeData.email}</p>
              )}
            </div>

            <div className="resume-section">
              <h3>Education:</h3>
              {isEditing.education ? (
                <input
                  type="text"
                  value={resumeData.education}
                  onChange={(e) => handleInputChange('education', e.target.value)}
                  onBlur={() => handleEditClick('education')}
                />
              ) : (
                <p onClick={() => handleEditClick('education')}>{resumeData.education}</p>
              )}
            </div>

            <div className="resume-section">
              <h3>Experience:</h3>
              {isEditing.experience ? (
                <input
                  type="text"
                  value={resumeData.experience}
                  onChange={(e) => handleInputChange('experience', e.target.value)}
                  onBlur={() => handleEditClick('experience')}
                />
              ) : (
                <p onClick={() => handleEditClick('experience')}>{resumeData.experience}</p>
              )}
            </div>

            <div className="resume-section">
              <h3>Skills:</h3>
              {isEditing.skills ? (
                <input
                  type="text"
                  value={resumeData.skills}
                  onChange={(e) => handleInputChange('skills', e.target.value)}
                  onBlur={() => handleEditClick('skills')}
                />
              ) : (
                <p onClick={() => handleEditClick('skills')}>{resumeData.skills}</p>
              )}
            </div>
          </div>
      
          <div className="resume-actions">
            {uniqueUrl && (
              <>
                <p>Shareable Link: <a href={uniqueUrl} target="_blank" rel="noopener noreferrer">{uniqueUrl}</a></p>
                <button onClick={handleCopyLink} className="action-btn">Copy Link</button>
                <button onClick={handleDownloadPDF} className="action-btn">Download PDF</button>
              </>
            )}
          </div>
        </>
      )}

      <style jsx>{`
        .resume-builder-container {
          max-width: 600px;
          margin: 0 auto;
          padding: 20px;
          font-family: Arial, sans-serif;
        }

        .resume-form {
          display: flex;
          flex-direction: column;
        }

        .form-group {
          margin-bottom: 15px;
        }

        .form-group label {
          display: block;
          margin-bottom: 5px;
        }

        .form-group input {
          width: 100%;
          padding: 8px;
          border: 1px solid #ddd;
          border-radius: 4px;
        }

        .generate-btn {
          padding: 10px 20px;
          background-color: #0070f3;
          color: white;
          border: none;
          border-radius: 8px;
          cursor: pointer;
          font-size: 1rem;
        }

        .generate-btn:hover {
          background-color: #005bb5;
        }

        .resume-container {
          border: 1px solid #ddd;
          padding: 20px;
          border-radius: 8px;
          background-color: grey;
        }

        .resume-section {
          margin-bottom: 15px;
        }

        .resume-section h3 {
          margin: 0;
        }

        .resume-section p {
          cursor: pointer;
        }

        .resume-actions {
          margin-top: 20px;
          display: flex;
          gap: 15px;
        }

        .action-btn {
          padding: 10px 20px;
          background-color: #0070f3;
          color: white;
          border: none
      `}</style>
      </div>
      )}
