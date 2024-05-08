'use client'
import { useState, useRef } from 'react';
import PdfViewerModal from '@/components/PdfViewerModal';
import ModerationDocument from '@/components/ModerationDocument';
import DocumentCard from '@/components/DocumentCard';
import Link from 'next/link';
import 'react-pdf/dist/esm/Page/AnnotationLayer.css';
import 'react-pdf/dist/esm/Page/TextLayer.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleXmark, faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';

import students  from '@/data/students.json';



const getStudentById = (studentId) => {
  if (!students) {
    return null;
  }
  // Find the student with the matching ID
  const student = students.find(student => student.id === studentId);
  // Return the student if found, otherwise return null
  return student || null;
};


export default function Home({params}) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeSlideIndex, setActiveSlideIndex] = useState(0);

  const student = getStudentById(params.key);

  if (!student) {
    return <div>Student not found</div>;
  }
  
  
    const moderationDocuments = student.documents.map(document => (
      <ModerationDocument
        key={document.id}
        id={document.id}
        type={document.type}
        status={document.status}
        name={document.name}
        documentUrl={document.documentUrl}
        studentname={student.name}
        email={student.email}
      />
    ));
    
  

// POP UP

  

  const openModal = (index) => {
    setIsModalOpen(true);
    setActiveSlideIndex(index);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  // const moderationDocuments = [
  //   <ModerationDocument key={1} type="ML" status="rejected" name="Medical letter" documentUrl="https://fen-live-af-south-1-s3.s3.af-south-1.amazonaws.com/user-resources/annual-reports/Feenix-annual-report-2021.pdf" />,
  //   <ModerationDocument key={2} type="FS" status="moderate" name="Fee Statement" documentUrl="https://fen-live-af-south-1-s3.s3.af-south-1.amazonaws.com/user-resources/annual-reports/Feenix-annual-report-2018.pdf"/>,
  //   <ModerationDocument key={3} type="ID" status="moderate" name="Certified ID" documentUrl="https://fen-live-af-south-1-s3.s3.af-south-1.amazonaws.com/user-resources/afs/Feenix-Trust-AFS(year-end-31-December-2022).pdf" />,
  //   <ModerationDocument key={4} type="POR" status="rejected" name="Proof Of Registration" documentUrl="https://fen-live-af-south-1-s3.s3.af-south-1.amazonaws.com/user-resources/annual-reports/Feenix-annual-report-2022.pdf"/>,
   
  // ];



  const goToPreviousSlide = () => {
    if (activeSlideIndex > 0) {
      setActiveSlideIndex(activeSlideIndex - 1);
    }
  };

  const goToNextSlide = () => {
    if (activeSlideIndex < moderationDocuments.length - 1) {
      setActiveSlideIndex(activeSlideIndex + 1);
    }
  };


  return (
    <div>
      <div className="pageheader flex">

      <div className='flex'>
       <div className='w-1/2 p-4'>
        <div className='headeitem' >
          <FontAwesomeIcon icon={faCircleXmark} color="grey" />
          <span>Moderation summary : <b>{student.name} ({student.email} ) </b></span>
        </div>

        <div className='headeitem' >
          <FontAwesomeIcon icon={faCircleXmark} color="grey" />
          <span>Moderation Status: <b>Incomplete</b></span>
        </div>
        
        <div className='headeitem' >
          <FontAwesomeIcon icon={faCircleXmark} color="grey" />
          <span>Entry Date: <b>23/05/2023</b> ( 6 days ago )</span>
        </div>

        <div className='headeitem' >
          <FontAwesomeIcon icon={faCircleXmark} color="grey" />
          <span>Assignee: <b>Ziba</b></span>
        </div>
        </div>
        <div className='w-1/2 p-4'>
        <div className='headeitem' >
          <FontAwesomeIcon icon={faCircleXmark} color="grey" />
          <span>Student Type: <b>Recruitment</b></span>
        </div>
        <div className='headeitem' >
          <FontAwesomeIcon icon={faCircleXmark} color="grey" />
          <Link href={`/moderate`}>
            <span className="text-blue-500 cursor-pointer hover:underline">Back</span>
          </Link>
        </div>
        
        </div>
      </div>

      </div>
      <div className='flex pagecontent'>
        <div className='w-3/4 p-4'>
            <div className="documentsblock">
            <h1 className="title">Moderation Items</h1>
            <p>Moderation Items : {student.name} {student.email}</p>
            {moderationDocuments.map((document, index) => (
              <DocumentCard
                key={document.key}
                onClick={() => openModal(index)}
                name ={document.props.name}
                status = {document.props.status}
                type = {document.props.type}
                index={index}
              />
            ))}
          </div>
        </div>
        <div className='w-1/4 p-4'>
          <div className="moderationfailreasons">
              <h1 className="title">Fail reasons summary</h1>
              <p>Moderation fail reasons</p>
              <ul>
                <li><FontAwesomeIcon icon={faCircleXmark} color="#b91c1c" /> Blury ID</li>
                <li><FontAwesomeIcon icon={faCircleXmark} color="#b91c1c" /> Picture too blur</li>
                <li><FontAwesomeIcon icon={faCircleXmark} color="#b91c1c" /> Id don’t match the student profile</li>
                <li><FontAwesomeIcon icon={faCircleXmark} color="#b91c1c" /> Fee statement outdated</li>
                <li><FontAwesomeIcon icon={faCircleXmark} color="#b91c1c" /> ID not certified</li>
                <li><FontAwesomeIcon icon={faCircleXmark} color="#b91c1c" /> Blury ID</li>
              </ul>
          </div>
        </div>
      </div>
      
      

      <PdfViewerModal isOpen={isModalOpen}>
        
        <div>
          <div>
          {moderationDocuments[activeSlideIndex]}
          <span className="modalclose" onClick={closeModal}><FontAwesomeIcon icon={faCircleXmark} size="2x" color="#b91c1c" /></span>
           
          {/* Add navigation buttons */}
            <div className="itemNavigation" >
              <button className='bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded itemNavigation-pre' onClick={goToPreviousSlide} disabled={activeSlideIndex === 0}>
              <FontAwesomeIcon icon={faChevronLeft} size="2x" color="#b91c1c" />
                </button>
                <button className='bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded itemNavigation-next' 
                  onClick={goToNextSlide}
                  disabled={activeSlideIndex === moderationDocuments.length - 1}
                >
                 <FontAwesomeIcon icon={faChevronRight} size="2x" color="#b91c1c" />
                </button>
            </div>

          </div>
        </div>
      </PdfViewerModal>

    </div>
  );
}
