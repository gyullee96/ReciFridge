import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import {
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  Stack,
  Typography,
} from '@mui/material';
import React from 'react';

const RecipePage = () => {
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        width: '100%',
        height: '100%',
      }}
    >
      <Box
        sx={{
          p: 2,
          backgroundColor: '#F9F2E2',
          width: '100%',
          maxWidth: '500px',
        }}
      >
        <Button startIcon={<ArrowBackIcon />} sx={{ mb: 2 }}>
          뒤로가기
        </Button>
        <Stack direction="row" sx={{ width: '100%' }} mb={6}>
          {[...Array(5)].map((_, i) => (
            <Box
              key={i}
              component="img"
              src="https://cdn.imweb.me/thumbnail/20230107/6f41120888517.png"
              alt="재료"
              sx={{
                width: '20%',
                height: '20%',
                flexGrow: 1,
                objectFit: 'contain',
              }}
            />
          ))}
        </Stack>
        <Stack spacing={2}>
          {[...Array(4)].map((_, i) => (
            <Card
              key={i}
              sx={{
                display: 'flex',
                alignItems: 'center',
                padding: '1.5rem',
                borderRadius: '30px',
                gap: {
                  xs: '1rem',
                  sm: '3rem',
                  md: '2rem',
                },
              }}
            >
              <CardMedia
                component="img"
                image="https://img.daily.co.kr/@files/www.daily.co.kr/content/food/2017/20170919/85a12c2c27b3f05fb7fb0a8af3645f13.jpg"
                alt="요리"
                sx={{
                  width: {
                    xs: '6rem',
                    sm: '8rem',
                    md: '9rem',
                  },
                  height: {
                    xs: '6rem',
                    sm: '8rem',
                    md: '9rem',
                  },
                  borderRadius: { xs: '10rem', sm: '10rem', md: '10rem' },
                }}
              />
              <CardContent>
                <Stack sx={{ gap: { xs: '1rem', sm: '1rem', md: '1rem' } }}>
                  <Typography
                    sx={{
                      fontSize: { xs: '1.5rem', sm: '1.8rem', md: '2rem' },
                    }}
                  >
                    김치찌개
                  </Typography>
                  <Typography
                    sx={{
                      fontSize: { xs: '1.2rem', sm: '1.5rem', md: '1.8rem' },
                    }}
                    color="text.secondary"
                  >
                    성분
                  </Typography>
                </Stack>
              </CardContent>
            </Card>
          ))}
        </Stack>
      </Box>
    </div>
  );
};

export default RecipePage;
