import React, { useState } from 'react'
import './ProjectCard.css'

function ProjectCard({ project }) {
  const [imgCurIndex, setImgCurIndex] = useState(0);
  const [vdoCurIndex, setVdoCurIndex] = useState(0);

  const rightMoveImg = () => {
    const curSlide = (imgCurIndex === (project.images).length - 1) ? 0 : imgCurIndex + 1;
    setImgCurIndex(curSlide);
  }
  const leftMoveImg = () => {
    const curSlide = (imgCurIndex === 0) ? (project.images).length - 1 : imgCurIndex - 1;
    setImgCurIndex(curSlide);
  }

  const rightMoveVdo = () => {
    const curSlide = (vdoCurIndex === (project.videos).length - 1) ? 0 : vdoCurIndex + 1;
    setVdoCurIndex(curSlide);
  }
  const leftMoveVdo = () => {
    const curSlide = (vdoCurIndex === 0) ? (project.videos).length - 1 : vdoCurIndex - 1;
    setVdoCurIndex(curSlide);
  }

  return (
    <div className='project_card_container'>
      <div className='project_card_header'>
        <h2 className='project_card_header_Title'>{project.title} </h2>
        <div className='project_card_header_base'>
          <h4>User : {project.user} </h4>
          <h4>USN : {project.usn}</h4>
          <h4>Branch : {project.branch}</h4>
          <h4>Sem : {project.sem}</h4>
          <h4>Domain : {project.domain}</h4>
        </div>
      </div>
      <div className='project_card_body'>
        <div className='img_video_container'>

          <div className='project_card_body_img_container' style={{ backgroundImage: `url(${project.images[imgCurIndex]})` }}>
            <b style={{ height: '350px', display: 'flex', alignItems: 'center' }}><i class="fa fa-angle-double-left" aria-hidden="true" id='image_nav_arrow' onClick={leftMoveImg} /></b>
            <b style={{ height: '350px', display: 'flex', alignItems: 'center' }}><i class="fa fa-angle-double-right" aria-hidden="true" id='image_nav_arrow' onClick={rightMoveImg} /></b>
          </div>

          <div className='project_card_body_img_container'>
            <i class="fa fa-angle-double-left" aria-hidden="true" id='image_nav_arrow' onClick={leftMoveVdo} />
            <video width="85%" height="350px" controls >
              <source src={project.videos[vdoCurIndex]} type="video/mp4" />
            </video>
            <i class="fa fa-angle-double-right" aria-hidden="true" id='image_nav_arrow' onClick={rightMoveVdo} />
          </div>
        </div>
        <div className='project_card_body_details_container'>
          <h4>Description : </h4>
          <p>{project.desc}</p>
        </div>
      </div>
      <div className='project_card_footer'>
        <div className='project_card_footer_item'>
          <h3>Report Files : </h3>
          {
            (project.report.length > 0) ?
            project.report.map((link, index) => (
              <button onClick={() => { window.open(link, "_blank") }} > {project.reportName[index]} </button>
            )) : <h4>Report files are not shared</h4>
          }
        </div>
        <div className='project_card_footer_item'>
          <h3>Code Files : </h3>
          {
            (project.code.length > 0) ?
            project.code.map((link, index) => (
              <button onClick={() => { window.open(link, "_blank") }} > {project.reportName[index]} </button>
            )) : <h4>Code files are not shared</h4>
          }
        </div>
      </div>
    </div>
  )
}

export default ProjectCard
