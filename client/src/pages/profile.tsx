import React, { useEffect, useState } from 'react';
import { useAuth } from 'react-oidc-context';
import { CodeSnippet } from '../components/code-snippet';
import { PageLayout } from '../components/page-layout';
import { getPublicResource } from '../services/api';

export const Profile: React.FC = () => {
  const auth = useAuth();
  const [message, setMessage] = useState<string>('');

  useEffect(() => {
    let isMounted = true;

    const getMessage = async () => {
      const { data, error } = await getPublicResource();

      if (!isMounted) {
        return;
      }

      if (data) {
        setMessage(JSON.stringify(data, null, 2));
      }

      if (error) {
        setMessage(JSON.stringify(error, null, 2));
      }
    };

    getMessage();

    return () => {
      isMounted = false;
    };
  }, []);
  return (
    <PageLayout>
      <div className='content-layout'>
        <h1 id='page-title' className='content__title'>
          Profile Page
        </h1>
        <div className='content__body'>
          <p id='page-description'>
            <span>
              You can use the <strong>ID Token</strong> to get the profile information of an
              authenticated user.
            </span>
            <span>
              <strong>Only authenticated users can access this page.</strong>
            </span>
          </p>
          <div className='profile-grid'>
            <div className='profile__header'>Hello {auth.user?.profile.sub}</div>
            <div className='profile__details'>
              <CodeSnippet title='Decoded ID Token' code={message} />
            </div>
          </div>
        </div>
      </div>
    </PageLayout>
  );
};
