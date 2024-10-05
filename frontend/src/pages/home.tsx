import { Helmet } from 'react-helmet-async';

import { CONFIG } from 'src/config-global';

import { OverviewAnalyticsView } from 'src/sections/overview/view';
//import { LeftCard } from 'src/custom_components/LeftCard';
import LeftCard from "src/custom_components/LeftCard";
import Grid from '@mui/material/Unstable_Grid2';
import RightCard from "src/custom_components/RightCard";

// ----------------------------------------------------------------------

export default function Page() {
  return (
    <>
      <Helmet>
        <title> {`Dashboard - ${CONFIG.appName}`}</title>
        <meta
          name="description"
          content="The starting point for your next project with Minimal UI Kit, built on the newest version of Material-UI ©, ready to be customized to your style"
        />
        <meta name="keywords" content="react,material,kit,application,dashboard,admin,template" />
      </Helmet>

      {/* <OverviewAnalyticsView /> */}
      <Grid container spacing={3}>
            <Grid key={"left"} xs={12} sm={12} md={ 6}>
              <LeftCard />
            </Grid>
            <Grid key={"right"} xs={12} sm={12} md={ 6}>
              <RightCard />
            </Grid>
      </Grid>

    </>
  );
}
