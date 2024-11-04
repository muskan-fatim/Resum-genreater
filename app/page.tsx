'use client'
import { useState, useRef } from 'react';
import styles from './page.module.css';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';


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
  const [bgColor, setBgColor] = useState('#ffffff'); // Background color state
  const resumeRef = useRef<HTMLDivElement>(null);

  const handleInputChange = (field: keyof ResumeData, value: string) => {
    setResumeData((prev) => ({ ...prev, [field]: value }));
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsResumeGenerated(true);
  };

  const handleEditClick = (field: keyof ResumeData) => {
    setIsEditing((prev) => ({ ...prev, [field]: !prev[field] }));
  };

  const handleDownloadPDF = async () => {
    const resumeElement = resumeRef.current;
    if (resumeElement) {
      const canvas = await html2canvas(resumeElement);
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF();
      pdf.addImage(imgData, 'PNG', 0, 0, 210, 297); // Adjust sizing as needed
      pdf.save('resume.pdf');
    }
  };

  const handleCopyLink = () => {
    const resumeLink = window.location.href; // Assuming the page is hosted on Vercel
    navigator.clipboard.writeText(resumeLink).then(() => {
      alert('Resume link copied to clipboard!');
    });
  };

  return (
    <div className={styles.resumeContainer}>
      {!isResumeGenerated ? (
        <form onSubmit={handleFormSubmit} className={styles.formContent}>
          <div className={styles.formGroup}>
            <label htmlFor="name">Name</label>
            <input
              className={styles.input}
              type="text"
              id="name"
              value={resumeData.name}
              onChange={(e) => handleInputChange('name', e.target.value)}
              required
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="email">Email</label>
            <input
              className={styles.input}
              type="email"
              id="email"
              value={resumeData.email}
              onChange={(e) => handleInputChange('email', e.target.value)}
              required
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="education">Education</label>
            <input
              className={styles.input}
              type="text"
              id="education"
              value={resumeData.education}
              onChange={(e) => handleInputChange('education', e.target.value)}
              required
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="experience">Experience</label>
            <input
              className={styles.input}
              type="text"
              id="experience"
              value={resumeData.experience}
              onChange={(e) => handleInputChange('experience', e.target.value)}
              required
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="skills">Skills</label>
            <input
              className={styles.input}
              type="text"
              id="skills"
              value={resumeData.skills}
              onChange={(e) => handleInputChange('skills', e.target.value)}
              required
            />
          </div>

          <div className={styles.colorPicker}>
            <label htmlFor="bgColor">Choose Background Color for Resume:</label>
            <input
              type="color"
              id="bgColor"
              value={bgColor}
              onChange={(e) => setBgColor(e.target.value)}
            />
          </div>

          <button type="submit" className={styles.generateBtn}>Generate Resume</button>
        </form>
      ) : (
        <>
          <div ref={resumeRef} className={styles.resumeContent} style={{ backgroundColor: bgColor }}>
            <div className={styles.sidebar}>
            </div>
            <div className={styles.mainContent}>
              <div className={styles.resumeSection}>
                <h3>Name:</h3>
                {isEditing.name ? (
                  <input
                    className={styles.input}
                    type="text"
                    value={resumeData.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                    onBlur={() => handleEditClick('name')}
                  />
                ) : (
                  <p onClick={() => handleEditClick('name')}>{resumeData.name}</p>
                )}
              </div>

              <div className={styles.resumeSection}>
                <h3>Email:</h3>
                {isEditing.email ? (
                  <input
                    className={styles.input}
                    type="email"
                    value={resumeData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    onBlur={() => handleEditClick('email')}
                  />
                ) : (
                  <p onClick={() => handleEditClick('email')}>{resumeData.email}</p>
                )}
              </div>

              <div className={styles.resumeSection}>
                <h3>Education:</h3>
                {isEditing.education ? (
                  <input
                    className={styles.input}
                    type="text"
                    value={resumeData.education}
                    onChange={(e) => handleInputChange('education', e.target.value)}
                    onBlur={() => handleEditClick('education')}
                  />
                ) : (
                  <p onClick={() => handleEditClick('education')}>{resumeData.education}</p>
                )}
              </div>

              <div className={styles.resumeSection}>
                <h3>Experience:</h3>
                {isEditing.experience ? (
                  <input
                    className={styles.input}
                    type="text"
                    value={resumeData.experience}
                    onChange={(e) => handleInputChange('experience', e.target.value)}
                    onBlur={() => handleEditClick('experience')}
                  />
                ) : (
                  <p onClick={() => handleEditClick('experience')}>{resumeData.experience}</p>
                )}
              </div>

              <div className={styles.resumeSection}>
                <h3>Skills:</h3>
                {isEditing.skills ? (
                  <input
                    className={styles.input}
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
          </div>

          <div className={styles.resumeActions}>
            <button onClick={handleDownloadPDF} className={styles.actionBtn}>
              Download PDF
            </button>
            <button onClick={handleCopyLink} className={styles.actionBtn}>
              Copy Resume Link
            </button>
            <button onClick={() => setIsResumeGenerated(false)} className={styles.actionBtn}>
              Edit Resume
            </button>
          </div>
        </>
      )}
    </div>
  );
}
