import LeftCard from "src/custom_components/LeftCard";
import Grid from '@mui/material/Unstable_Grid2';
import RightCard from "src/custom_components/RightCard";

export default function MainPage() {
  // const [leftCardState, updateLeftCardState];

  return (
  <Grid container spacing={3}>
  <Grid key={"left"} xs={12} sm={12} md={ 6}>
    <LeftCard />
  </Grid>
  <Grid key={"right"} xs={12} sm={12} md={ 6}>
    <RightCard />
  </Grid>
  </Grid>
  )
};