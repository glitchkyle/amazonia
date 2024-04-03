// ** Next Imports
import Head from 'next/head'
import type { NextPage } from 'next'
import type { AppProps } from 'next/app'

// ** Emotion Imports
import { CacheProvider } from '@emotion/react'
import type { EmotionCache } from '@emotion/cache'

// ** Config Imports

import themeConfig from 'src/configs/themeConfig'

// ** Third Party Import
import { Toaster } from 'react-hot-toast'

// ** Component Imports
import ThemeComponent from 'src/@core/theme/ThemeComponent'

// ** Contexts
import { SettingsConsumer, SettingsProvider } from 'src/@core/context/settingsContext'

// ** Styled Components
import ReactHotToast from 'src/@core/styles/libs/react-hot-toast'

// ** Utils Imports
import { createEmotionCache } from 'src/@core/utils/create-emotion-cache'

// ** Prismjs Styles
import 'prismjs'
import 'prismjs/themes/prism-tomorrow.css'
import 'prismjs/components/prism-jsx'
import 'prismjs/components/prism-tsx'

// ** React Perfect Scrollbar Style
import 'react-perfect-scrollbar/dist/css/styles.css'

import 'src/iconify-bundle/icons-bundle-react'

// ** Global css styles
import '../../styles/globals.css'

import { UserProvider } from '@auth0/nextjs-auth0/client'

import { Provider as ReduxProvider } from 'react-redux'
import { store } from 'src/store'

// ** Extend App Props with Emotion
type ExtendedAppProps = AppProps & {
    Component: NextPage
    emotionCache: EmotionCache
}

const clientSideEmotionCache = createEmotionCache()

// ** Configure JSS & ClassName
const App = (props: ExtendedAppProps) => {
    const { Component, emotionCache = clientSideEmotionCache, pageProps } = props

    const setConfig = Component.setConfig ?? undefined

    return (
        <ReduxProvider store={store}>
            <CacheProvider value={emotionCache}>
                <Head>
                    <title>{themeConfig.templateName}</title>
                    <meta name='description' content={themeConfig.templateName} />
                    <meta name='keywords' content='E-Commerce, Auth0' />
                    <meta name='viewport' content='initial-scale=1, width=device-width' />
                </Head>

                <UserProvider>
                    <SettingsProvider {...(setConfig ? { pageSettings: setConfig() } : {})}>
                        <SettingsConsumer>
                            {({ settings }) => {
                                return (
                                    <ThemeComponent settings={settings}>
                                        <Component {...pageProps} />
                                        <ReactHotToast>
                                            <Toaster
                                                position={settings.toastPosition}
                                                toastOptions={{ className: 'react-hot-toast' }}
                                            />
                                        </ReactHotToast>
                                    </ThemeComponent>
                                )
                            }}
                        </SettingsConsumer>
                    </SettingsProvider>
                </UserProvider>
            </CacheProvider>
        </ReduxProvider>
    )
}

export default App
