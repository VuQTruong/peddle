import React from 'react';
import { useSelector } from 'react-redux';
import { Redirect, Route } from 'react-router';
import { State } from '../store';

type Props = {
  component?: React.FC<any>;
} & Partial<any>;

export default function PrivateRoute(props: Props) {
  const { component: Component, children, ...rest } = props;
  const { userInfo } = useSelector((state: State) => state.user);

  return (
    <Route
      {...rest}
      render={(props) => {
        const childrenWithProps = React.Children.map(children, (child) => {
          if (React.isValidElement(child)) {
            return React.cloneElement(child, { ...props });
          }
        });

        return userInfo ? (
          Component ? (
            <Component {...props} />
          ) : (
            <React.Fragment>{childrenWithProps}</React.Fragment>
          )
        ) : (
          <Redirect to='/signin' />
        );
      }}
    />
  );
}
