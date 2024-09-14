'use client'
import { useState, useRef } from 'react';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import styles from './page.module.css'

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
    <div className={styles.resumecontainer}>
      <h1 className={styles.h1}>Resume Builder</h1>

      {!isResumeGenerated ? (
        <form onSubmit={handleFormSubmit} className={styles.resumeform}>
          <div className={styles.formgroup}>
            <label htmlFor="name">Name</label>
            <input className={styles.input}
              type="text"
              id="name"
              value={resumeData.name}
              onChange={(e) => handleInputChange('name', e.target.value)}
              required
            />
          </div>

          <div className={styles.formgroup}>
            <label htmlFor="email">Email</label>
            <input className={styles.input}
              type="email"
              id="email"
              value={resumeData.email}
              onChange={(e) => handleInputChange('email', e.target.value)}
              required
            />
          </div>

          <div className={styles.formgroup}>
            <label htmlFor="education">Education</label>
            <input className={styles.input}
              type="text"
              id="education"
              value={resumeData.education}
              onChange={(e) => handleInputChange('education', e.target.value)}
              required
            />
          </div>

          <div className={styles.formgroup}>
            <label htmlFor="experience">Experience</label>
            <input className={styles.input}
              type="text"
              id="experience"
              value={resumeData.experience}
              onChange={(e) => handleInputChange('experience', e.target.value)}
              required
            />
          </div>

          <div className={styles.formgroup}>
            <label htmlFor="skills">Skills</label>
            <input className={styles.input}
              type="text"
              id="skills"
              value={resumeData.skills}
              onChange={(e) => handleInputChange('skills', e.target.value)}
              required
            />
          </div>

          <button type="submit" className={styles.generatebtn}>Generate Resume</button>
        </form>
      ) : (
        <>
          <div ref={resumeRef} className={styles.resumecontainer2}>
            <h2 className={styles.h2}> Your Resume</h2>

            <div className={styles.resumesection}>
              <h3>Name:</h3>
              {isEditing.name ? (
                <input className={styles.input}
                  type="text"
                  value={resumeData.name}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                  onBlur={() => handleEditClick('name')}
                />
              ) : (
                <p onClick={() => handleEditClick('name')}>{resumeData.name}</p>
              )}
            </div>

            <div className={styles.resumesection}>
              <h3>Email:</h3>
              {isEditing.email ? (
                <input className={styles.input}
                  type="email"
                  value={resumeData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  onBlur={() => handleEditClick('email')}
                />
              ) : (
                <p onClick={() => handleEditClick('email')}>{resumeData.email}</p>
              )}
            </div>

            <div className={styles.resumesection}>
              <h3>Education:</h3>
              {isEditing.education ? (
                <input className={styles.input}
                  type="text"
                  value={resumeData.education}
                  onChange={(e) => handleInputChange('education', e.target.value)}
                  onBlur={() => handleEditClick('education')}
                />
              ) : (
                <p onClick={() => handleEditClick('education')}>{resumeData.education}</p>
              )}
            </div>

            <div className={styles.resumesection}>
              <h3>Experience:</h3>
              {isEditing.experience ? (
                <input className={styles.input}
                  type="text"
                  value={resumeData.experience}
                  onChange={(e) => handleInputChange('experience', e.target.value)}
                  onBlur={() => handleEditClick('experience')}
                />
              ) : (
                <p onClick={() => handleEditClick('experience')}>{resumeData.experience}</p>
              )}
            </div>

            <div className={styles.resumesection}>
              <h3>Skills:</h3>
              {isEditing.skills ? (
                <input className={styles.input}
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

          <div className={styles.resumeactions}>
            <button onClick={handleDownloadPDF} className={styles.actionbtn}>
              Download PDF
            </button>
            <button onClick={handleCopyLink} className={styles.actionbtn}>
              Copy Resume Link
            </button>
            <button onClick={() => setIsResumeGenerated(false)} className={styles.actionbtn}>
              Edit Resume
            </button>
          </div>
        </>
      )}
    </div>
  );
}
