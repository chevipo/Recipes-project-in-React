import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';
import { Context } from "./HomePage";
import Update from './Update';
import { Button, Typography } from '@mui/material';
import { StyleHeader } from './style';
import { useContext } from 'react';

function stringToColor(string: string) {
  let hash = 0;
  let i;
  for (i = 0; i < string.length; i += 1) {
    hash = string.charCodeAt(i) + ((hash << 5) - hash);
  }

  let color = '#';
  for (i = 0; i < 3; i += 1) {
    const value = (hash >> (i * 8)) & 0xff;
    color += `00${value.toString(16)}`.slice(-2);
  }
  return color;
}

function stringAvatar(name: string) {
  return {
    sx: {
      bgcolor: stringToColor(name),
    },
    children: `${name.split(' ')[0][0]}`,
  };
}
export default function connected() {
  const {user, Dispatch} = useContext(Context);
  const userID = user.id;
  const [isUpdateModalOpen, setUpdateModalOpen] = React.useState(false);
  const handleOpenUpdateModal = () => setUpdateModalOpen(true);
  const handleCloseUpdateModal = () => setUpdateModalOpen(false);
  return (
    <>
        <div style={StyleHeader}>
          {!user.firstName ? (
            <>hello, {userID}</>
          ) : (
            <Stack direction="row" spacing={2}>
              <Avatar {...stringAvatar(user.firstName || 'Unknown User')} />
              <Typography variant="h6">{user.firstName || 'Unknown User'}</Typography>
            </Stack>
          )}
          <Button color="primary" onClick={handleOpenUpdateModal}>Update</Button>
          </div>
        {isUpdateModalOpen && (
          <Update onClose={handleCloseUpdateModal} />
        )}
    </>
  );
}
