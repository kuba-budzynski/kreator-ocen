import '../styles/globals.scss'
import "tailwindcss/tailwind.css";
import { ThemeProvider } from "@chakra-ui/core";
import {ChakraProvider} from "@chakra-ui/react";
import 'react-vertical-timeline-component/style.min.css';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import '@brainhubeu/react-carousel/lib/style.css';
import 'react-notifications-component/dist/theme.css'
import '../styles/Fullscreen.scss'
import ReactNotification from 'react-notifications-component'

function MyApp({ Component, pageProps, router }) {
  return (
    <ChakraProvider>
      <ThemeProvider>
        <ReactNotification />
        <Component {...pageProps} key={router.route}/>
      </ThemeProvider>
    </ChakraProvider>
  )
}

export default MyApp
