import React from 'react'
import Head from 'next/head'
import SVG from '../utils/SVG'
import error from '../public/404.svg'

function Custom404() {
    return (
       <>
        <Head>
            <title>404 ERROR | Janusz Wróbel</title>
            <meta httpEquiv="Content-Type" content="text/html; charset=utf-8" />
            <meta name="viewport" content="initial-scale=1.0, width=device-width" />
            <meta name="description" content="Przepraszamy ale ta strona jest niedostępna. Kod 400 wygląda na bląd z Twojej strony - przeładuj stronę lub sprawdź czy adres strony jest poprawny" />
        </Head>
        <SVG svg={error} size="screenSize" />  
       </>
    )
}

export default Custom404
