import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome } from '@fortawesome/free-solid-svg-icons';
import Link from 'next/link';

export default function NotFoundPage() {
  return (
    <div className="d-flex flex-column min-vh-100 min-vw-100 justify-content-center align-items-center">
      <h1 className="display-1">404</h1>
      <h3>Page not found</h3>
      <Link className="btn btn-success mt-5" href="/">
        <FontAwesomeIcon icon={faHome} /> Back to home
      </Link>
    </div>
  );
}
