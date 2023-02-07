import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome } from '@fortawesome/free-solid-svg-icons';
import { useRouter } from 'next/router';

export default function NotFoundPage() {
  const router = useRouter();
  return (
    <div className="d-flex flex-column min-vh-100 min-vw-100 justify-content-center align-items-center">
      <h1 className="display-1">404</h1>
      <h3>Page not found</h3>
      <button
        type="button"
        className="btn btn-success mt-5"
        onClick={() => {
          router.push('/');
        }}>
        <FontAwesomeIcon icon={faHome} /> Back to home
      </button>
    </div>
  );
}
