import Canvas from "./Canvas";
import { useState } from "react";
import Fab from "@mui/material/Fab"
// import type { BoxProps } from '@mui/material/Box';

// import Box from '@mui/material/Box';
// import Badge from '@mui/material/Badge';

// import { RouterLink } from 'src/routes/components';

import { Iconify } from 'src/components/iconify';
// import { CartIcon } from "src/sections/product/product-cart-widget";


// type Props = BoxProps & {
//   totalItems: number;
//   flipIsPen: () => void;
// };

// export function ChangeIcon({ totalItems, flipIsPen, sx, ...other }: Props) {
//   return (
//     <Box
//       component={RouterLink}
//       href="#"
//       sx={{
//         right: 0,
//         top: 112,
//         zIndex: 999,
//         display: 'flex',
//         cursor: 'pointer',
//         position: 'fixed',
//         color: 'text.primary',
//         borderTopLeftRadius: 16,
//         borderBottomLeftRadius: 16,
//         bgcolor: 'background.paper',
//         padding: (theme) => theme.spacing(1, 3, 1, 2),
//         boxShadow: (theme) => theme.customShadows.dropdown,
//         transition: (theme) => theme.transitions.create(['opacity']),
//         '&:hover': { opacity: 0.72 },
//         ...sx,
//       }}
//       on_click={() => {flipIsPen()}}
//       {...other}
//     >
//       <Badge showZero badgeContent={totalItems} color="error" max={99}>
//         <Iconify icon="solar:cart-3-bold" width={24} />
//       </Badge>
//     </Box>
//   );
// }
export function Drawing({ setUserDrawingB64 }: { setUserDrawingB64: React.Dispatch<React.SetStateAction<string>> }) {
  const [brushColor, setBrushColor] = useState<string>("#000000");
  const [brushSize, setBrushSize] = useState<number>(5);
  const [isPen, setIsPen] = useState<boolean>(true);

  function flipIsPen() {
    setIsPen((prevIsPen) => {
      const newIsPen = !prevIsPen;
      if (newIsPen) {
        // Switch to pen
        setBrushColor("#000000");
        setBrushSize(5);
      } else {
        // Switch to eraser
        setBrushColor("#ffffff");
        setBrushSize(20);
      }
      return newIsPen;
    });
  }

  const penEraserButton = (
    <Fab
      size="medium"
      aria-label={isPen ? "Switch to Eraser" : "Switch to Pen"}
      sx={{
        zIndex: 9,
        right: 20,
        bottom: 20,
        width: 44,
        height: 44,
        position: 'absolute', // Position the button relative to the canvas container
        bgcolor: isPen ? 'grey.800' : 'grey.300',
        color: 'common.white',
      }}
      onClick={flipIsPen}
    >
      <Iconify width={24} icon={isPen ? "mdi:pen" : "mdi:eraser"} />
    </Fab>
  );

  return (
    <div className="flex flex-col items-center justify-center" style={{ position: 'relative' }}>
      <Canvas brushColor={brushColor} brushSize={brushSize} setUserDrawingB64={setUserDrawingB64} />
      {penEraserButton}
      <p>line</p>
    </div>
  );
}
// export function Drawing({setUserDrawingB64} : {setUserDrawingB64: React.Dispatch<React.SetStateAction<string>>}) {
//   const [brushColor, setBrushColor] = useState<string>("#000000");
//   const [brushSize, setBrushSize] = useState<number>(5);
//   const [isPen, setIsPen] = useState<boolean>(true);
//   function flipIsPen() {
//     setIsPen(!isPen);
//     if (isPen) {
//       setBrushColor("#000000");
//       setBrushSize(5);
//     } else {
//       setBrushColor("#ffffff");
//       setBrushSize(20);
//     }
//   }
//   const githubButton = (
//     <Fab
//       size="medium"
//       aria-label="Github"
//       href="https://github.com/minimal-ui-kit/material-kit-react"
//       sx={{
//         zIndex: 9,
//         right: 20,
//         bottom: 20,
//         width: 44,
//         height: 44,
//         position: 'fixed',
//         bgcolor: 'grey.800',
//         color: 'common.white',
//       }}
//       onClick={flipIsPen}
//     >
//       <Iconify width={24} icon="eva:github-fill" />
//     </Fab>
//   );

//   return (
//     <div className="flex flex-col items-center justify-center">
//       <Canvas brushColor={brushColor} brushSize={brushSize} setUserDrawingB64={setUserDrawingB64}/>
//       {githubButton}
//       <p>line</p>
//     </div>
//   )
// }
