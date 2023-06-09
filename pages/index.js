import * as React from 'react';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import ProTip from '../src/ProTip';
import Link from '../src/components/commonStyles/Link';
import Copyright from '../src/Copyright';
import withAuth from 'src/HOCs/withAuth';
import withPermission from 'src/HOCs/withPermission';

const Index = () => {
  return (
    <Container maxWidth='sm'>
      <Box sx={{ my: 4 }}>
        <Typography variant='h4' component='h1' gutterBottom>
          Material UI - Next.js example
        </Typography>
        <Link href='/about' color='secondary'>
          Go to the about page
        </Link>
        <ProTip />
        <Copyright />
      </Box>
    </Container>
  );
};

export default withAuth(withPermission(Index, ['ADMIN']));
