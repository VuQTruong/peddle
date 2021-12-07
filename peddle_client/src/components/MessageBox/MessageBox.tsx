import React from 'react';

/*
 * Usage:
 *  <MessageBox>Info</MessageBox>
 *  <MessageBox variant='success'>Success</MessageBox>
 *  <MessageBox variant='danger'>Error</MessageBox>
 *  <MessageBox variant='warning'>Warning</MessageBox>
 */

type Props = {
  fullWidth?: boolean;
  className?: string;
  variant?: 'success' | 'danger' | 'warning';
  children: React.ReactNode;
};

export default function MessageBox(props: Props) {
  return (
    <div
      className={`alert alert-${props.variant || 'info'} ${
        props.className ? props.className : ''
      }`}
    >
      {props.children}
    </div>
  );
}
