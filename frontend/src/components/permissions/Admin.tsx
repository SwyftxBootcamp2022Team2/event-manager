/* eslint-disable react/jsx-no-useless-fragment */
import React from 'react';
import useAuth from '../../useAuth';

export default function Admin(props: { children: React.ReactNode }) {
  const { user } = useAuth();
  const { children } = props;

  if (user && user.isAdmin) {
    return <>{children}</>;
  }

  // Don't return children if user is not admin
  return <></>;
}
