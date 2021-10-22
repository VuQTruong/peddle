import React from 'react';
import { useSelector } from 'react-redux';
import { Redirect, Route } from 'react-router';
import { State } from '../store';

export default function PrivateRoute({
  component: Component,
  ...rest
}: {
  component: React.FC<any>;
} & Partial<any>) {
  const { user } = useSelector((state: State) => state.user);
  return (
    <Route
      {...rest}
      render={(props) =>
        user ? <Component {...props} /> : <Redirect to='/signin' />
      }
    />
  );
}
