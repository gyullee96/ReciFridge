import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Stack,
  Typography,
} from '@mui/material';
import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import useRecipesByIngredientsQuery from '../../hooks/useRecipesByIngredients';

const RecipePage = () => {
  const navigate = useNavigate();

  const { selectedIngredients: ingredients } = useLocation().state || {};
  console.log('selectedIngredients', ingredients);
  const { data, isLoading, isError, error } =
    useRecipesByIngredientsQuery(ingredients);

  console.log('data:', data);
  if (isLoading) {
    return <>isLoading</>;
  }
  if (isError) {
    return <>{error.message}</>;
  }
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
          backgroundColor: '#fffaef',
          paddingTop: '10px',
          width: '100%',
        }}
      >
        <div
          style={{
            border: 'none',
            borderTop: '0.6rem solid #A1C8C4',
            marginBottom: '1rem',
          }}
        />
        <Stack
          direction="row"
          sx={{
            width: '100%',
            alignItems: 'center',
          }}
        >
          {ingredients?.map((ingredient, i) => (
            <Box
              key={i}
              sx={{
                backgroundColor: '#EFEACE',
                aspectRatio: '1 / 1',
                borderRadius: '1.5rem',
                margin: '0.1rem',
                width: '20%',
                height: 'auto%',
                alignContent: 'center',
                justifyContent: 'center',
                flexGrow: 1,
                transition: 'transform 0.3s ease-in-out',
              }}
            >
              <img
                src={ingredient.icon}
                style={{
                  width: '100%',
                  height: 'auto',
                }}
                alt="재료"
              />
            </Box>
          ))}
        </Stack>
        <div
          style={{
            border: 'none',
            borderTop: '0.6rem solid #A1C8C4',
            marginTop: '1rem',
            marginBottom: '1rem',
          }}
        />
        <Stack spacing={2}>
          {data?.map((menu, i) => (
            <Card
              onClick={() => {
                navigate(`/recipe/detail`, {
                  state: { menu },
                });
              }}
              key={i}
              sx={{
                display: 'flex',
                alignItems: 'center',
                padding: {
                  xs: '0.5rem',
                  sm: '1.5rem',
                  md: '1.5rem',
                },
                background: '#fffaef',
                border: {
                  xs: '0.2rem solid #F68528',
                  sm: '0.4rem solid #F68528',
                  md: '0.3rem solid #F68528',
                },
                borderRadius: '30px',
                gap: {
                  xs: '1rem',
                  sm: '3rem',
                  md: '2rem',
                },
                overflow: 'hidden',
                clipPath: 'ellipse(75% 100% at center)',
                transition: 'transform 0.3s ease-in-out',
                '&:hover': {
                  transform: 'scale(1.02)',
                },
              }}
            >
              {menu?.MANUAL_IMG01 && (
                <CardMedia
                  component="img"
                  image={menu?.MANUAL_IMG01}
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
              )}
              <CardContent>
                <Stack sx={{ gap: { xs: '0rem', sm: '1rem', md: '1rem' } }}>
                  <Typography
                    sx={{
                      fontSize: 'clamp(0.8rem, 5vw, 1.8rem)',
                      fontWeight: { xs: '500', sm: '500', md: '500' },
                    }}
                  >
                    {menu.RCP_NM}
                  </Typography>
                  <div
                    style={{
                      fontSize: { xs: '1.2rem', sm: '1.5rem', md: '1.8rem' },
                      fontWeight: { xs: '500', sm: '500', md: '500' },
                    }}
                  >
                    <Typography
                      sx={{
                        display: '-webkit-box',
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: 'vertical',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                      }}
                    >
                      {menu?.RCP_PARTS_DTLS}
                    </Typography>
                  </div>
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
