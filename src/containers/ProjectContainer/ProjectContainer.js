import React from 'react';
import ProjectCard from '../ProjectCard/ProjectCard';
import Masonry from 'react-masonry-css';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

export const ProjectContainer = ({ error, searching, projects, palettes }) => {
  const breakpointColumnsObj = {
    default: 3,
    1100: 3,
    700: 2,
    500: 1
  };

  const sortItems = (items) => {
    let itemsCopy = items.slice();
    itemsCopy.sort((a, b) => {
      if (a.updated_at > b.updated_at) return -1;
      if (b.updated_at < a.updated_at) return 1;
      return 0;
    });
    return itemsCopy
  }

  const getProjectPalettes = (id) => {
    let projectPalettes = palettes.filter(palette => palette.project_id === id);
    return projectPalettes.length ? sortItems(projectPalettes) : []
  }

  const setProjectCards = () => {
    let projectsCopy = projects.slice();
    projectsCopy.forEach((project, i) => {
      const projectPalettes = getProjectPalettes(project.id);
      if (projectPalettes.length && projectPalettes[0].updated_at > project.updated_at) {
        projectsCopy[i].updated_at = projectPalettes[0].updated_at
      }
    });
    
    const sortedProjects = sortItems(projects);
    return sortedProjects.map(project => {
      const projectPalettes = getProjectPalettes(project.id);
      return <ProjectCard projectTitle={project.name} palettes={projectPalettes} id={project.id} key={project.id} />
    });
  }

  return (
    <Masonry
      breakpointCols={breakpointColumnsObj}
      className='my-masonry-grid'
      columnClassName='my-masonry-grid_column'>
      { searching && error ? <div>No projects or palettes match that name</div> : setProjectCards() }
    </Masonry>
  );
};

export const mapStateToProps = (state) => ({
  projects: state.projects,
  palettes: state.palettes,
  searching: state.searching,
  error: state.error,
});

ProjectContainer.propTypes = {
  projects: PropTypes.array,
  palettes: PropTypes.array,
  searching: PropTypes.bool,
  error: PropTypes.string,
}

ProjectContainer.defaultProps = {
  error: '',
  projects: [],
  palettes: [],
  searching: false,
}

export default connect(mapStateToProps)(ProjectContainer);