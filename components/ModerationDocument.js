'use client'
import { React, useState, useRef } from 'react';
import {pdfjs, Document, Page} from 'react-pdf';
pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/legacy/build/pdf.worker.min.js`;
import {IDForm,FSForm,MLForm,PORForm} from '../components/IDForm';
import ItemSelectionModal from '../components/Moderationfailreasons';
import ConfirmationModal from '../components/ConfirmationModal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlassPlus, faMagnifyingGlassMinus, faChevronLeft, faChevronRight, faRotateRight,faRotateLeft,faGraduationCap } from '@fortawesome/free-solid-svg-icons';



function ModerationDocument(props) {



const [currentDoc, setCurrentDoc] = useState(null);
const [notes, setNotes] = useState('');

//NEw
const [rotation, setRotation] = useState(0);
const [numPages, setNumPages] = useState(null);
const [pageNumber, setPageNumber] = useState(1); // For navigation
const [scale, setScale] = useState(1.0); // For zoom
const [loadingper, setLoadingper] = useState(0);
const [zoomPer, setZoomPer] = useState(100);
//panning
const viewerRef = useRef(null);
const [isPanning, setIsPanning] = useState(false);
const [startX, setStartX] = useState(0);
const [startY, setStartY] = useState(0);

const onMouseDown = (e) => {
  const { offsetLeft, offsetTop, scrollLeft, scrollTop } = viewerRef.current;
  setIsPanning(true);
  setStartX(e.pageX - offsetLeft + scrollLeft);
  setStartY(e.pageY - offsetTop + scrollTop);
  viewerRef.current.style.cursor = 'grabbing';
};

const onMouseMove = (e) => {
  if (isPanning) {
    const { offsetLeft, offsetTop } = viewerRef.current;
    const xDiff = e.pageX - offsetLeft - startX;
    const yDiff = e.pageY - offsetTop - startY;
    viewerRef.current.scrollLeft -= xDiff;
    viewerRef.current.scrollTop -= yDiff;
  }
};

const onMouseUp = () => {
  setIsPanning(false);
  viewerRef.current.style.cursor = 'pointer';
};

const documentUrl = props.documentUrl;

function onDocumentLoadSuccess({ numPages }) {
  setNumPages(numPages);

}

const rotateClockwise = () => {
  setRotation((prevRotation) => (prevRotation + 90) % 360);
};

const rotateAntiClockwise = () => {
    setRotation((prevRotation) => (prevRotation - 90) % 360);
  };

const loadingdoc = ({ loaded, total }) => setLoadingper('Loading a document: ' + (loaded / total) * 100 + '%')



  const openDocument = (doc) => {
    setCurrentDoc(doc);
    // Load notes from your storage or set empty string
  };

  const handleNoteChange = (e) => {
    setNotes(e.target.value);
  };


  let FormComponent;
  let items = ['ID Blury', 'Not Certified', 'Does not match the profile', 'Wrong document'];
    switch (props.type) {
        case 'ID':
            FormComponent = IDForm;
            items = ["Uncertified",
            "Outdated",
            "Undated (certified but no certification date)",
            "Subpar",
            "One side of ID (this can be certified or uncertified so we only say one sided)",
            "Does not match details on profile",
            "Picture/screenshot",
            "Cut off",
            "Not uploaded",
            "Certification unclear",
            "Password-protected",
            "Unable to open file/cannot be viewed",
            "Over the age limit"];
            break;
        case 'FS':
            FormComponent = FSForm;
            items = ["Outdated",
            "Not uploaded",
            "Unofficial",
            "Incorrect fee statement (quotation, a screenshot of student portal, proof of registration)",
            "Picture",
            "Subpar",
            "Incomplete",
            "Handed over",
            "No fees due",
            "Password-protected",
            "Unable to open file/cannot be viewed",
            "Cropped/cut off"];
            break;
        case 'ML':
            FormComponent = MLForm;
            items = ["Outdated (depending on the longevity of the disability)",
            "Does not state disability",
            "Unofficial",
            "Incorrect medical note (NSFAS disability questionnaire or from university disability unit)",
            "Not uploaded",
            "Subpar"];
            break;
        default:
            FormComponent = PORForm;
            items = ["Unofficial",
            "Picture/screenshot",
            "Password-protected.",
            "Does not match the profile",
            "Not uploaded",
            "Subpar",
            "Cropped/cut off",
            "Outdated (not their latest POR)"];
            break;
    }

  return (
    <div className={`documentsingle`}>
      <div className="flex">
              <div
                className="docviewer w-3/5 p-4"
                ref={viewerRef}
                onMouseDown={onMouseDown}
                onMouseMove={onMouseMove}
                onMouseUp={onMouseUp}
                onMouseLeave={onMouseUp}
              >
                <Document
                  file={documentUrl} 
                  onLoadSuccess={onDocumentLoadSuccess}
                  onLoadError={console.error}
                  renderMode="canvas"
                  width={600}
                  style={{ transform: `rotate(${rotation}deg)`, transformOrigin: 'center' }}
                  rotate={rotation}
                  error={documentUrl}
                  loading="We are fetching your document, please wait"
                  onLoadProgress={loadingdoc}
                >
                  <Page pageIndex={pageNumber - 1} scale={scale} />
                  
                </Document>
                
              </div>
              <div className=" w-2/5 p-4">
                
                <span className={`pill orange ${props.status}`}>Status: {props.status}</span>
                <div className="flex flex-wrap -mx-2">
                  <div className="w-1/2 px-2 mb-5">
                    <div className="student-info-pill"><b>{props.name}</b> for {props.studentname} {props.email}</div>
                  </div>
                  <div className="w-1/2 px-2 mb-5">
                    <div className="student-info-pill">
                      <FontAwesomeIcon icon={faGraduationCap} color="grey"/>
                    <span>Student Type<br /><b>Recruitment</b></span>
                    </div>
                  </div>
                </div>


                <FormComponent email={props.email} />
                
                <div className="rejectaccept">
            
                <ItemSelectionModal items = {items}  documentId={props.id}/>
                <ConfirmationModal documentId={props.id}/>
                    
                </div>
                <div className='controller'>
                    <span className="pagenumber">
                    Page {pageNumber || (numPages ? 1 : '--')} of {numPages || '--'}
                    </span>
                    <button onClick={() => setPageNumber(pageNumber - 1)} disabled={pageNumber <= 1}><FontAwesomeIcon icon={faChevronLeft} /> Previous Page </button>
                    <button onClick={() => setPageNumber(pageNumber + 1)} disabled={pageNumber >= (numPages)}>Next Page <FontAwesomeIcon icon={faChevronRight} /></button>
                    <button onClick={() => {
                        setScale(scale * 0.9);
                        setZoomPer(zoomPer * 0.9);
                        }}><FontAwesomeIcon icon={faMagnifyingGlassMinus} color="grey" /> </button>
                    <button>{Math.round(zoomPer)}%</button>
                    <button onClick={() => {
                        setScale(scale * 1.1);
                        setZoomPer(zoomPer * 1.1);
                        }}><FontAwesomeIcon icon={faMagnifyingGlassPlus} color="grey" /> </button>
                    <button onClick={rotateClockwise}><FontAwesomeIcon icon={faRotateRight}  color="grey" /></button>
                    <button onClick={rotateAntiClockwise}><FontAwesomeIcon icon={faRotateLeft} color="grey" /></button>
                </div>
              </div>
            </div>
    </div>
  );
}

export default ModerationDocument;
