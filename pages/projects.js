import React from 'react';
import Application from '../components/application';

function ProjectsPage({projects, page, pages}) {
  return (
    <Application pageTitle="Projects">
      <h1>Projects</h1>

      <div>
        <label>
          Sort order:{' '}
          <select>
            <option value="featured">Featured</option>
            <option value="updated">Recently updated</option>
            <option value="newest">Newest first</option>
            <option value="oldest">Oldest first</option>
          </select>
        </label>
      </div>

      <div>
        {
          projects.map(() => {
            return <a href="#TODO">TODO: project link</a>;
          })
        }
      </div>

      <nav>
        {
          Array(pages).fill().map((unused, iteration) => iteration + 1).map((pageNumber) => {
            const isCurrent = pageNumber === page;
            return <a key={pageNumber} href={'?page=' + pageNumber} data-disabled={isCurrent || null}>{pageNumber}</a>;
          })
        }
      </nav>
    </Application>
  );
}

ProjectsPage.loadData = () => {
  return {
    projects: [],
    page: 1,
    pages: 1,
  };
};

export default ProjectsPage;
