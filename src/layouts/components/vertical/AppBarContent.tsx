// ** MUI Imports
import Box from '@mui/material/Box'
import IconButton from '@mui/material/IconButton'
import Button from '@mui/material/Button'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

// ** Type Import
import { Settings } from 'src/@core/context/settingsContext'
import { UserPermission } from 'src/types/auth'

// ** Components
import ModeToggler from 'src/@core/layouts/components/shared-components/ModeToggler'
import UserDropdown from 'src/@core/layouts/components/shared-components/UserDropdown'

import { useUser } from '@auth0/nextjs-auth0/client'

interface Props {
    hidden: boolean
    settings: Settings
    toggleNavVisibility: () => void
    saveSettings: (values: Settings) => void
    permissions?: UserPermission[]
}

const AppBarContent = (props: Props) => {
    // ** Props
    const { hidden, settings, saveSettings, toggleNavVisibility, permissions } = props

    const { user } = useUser()

    return (
        <Box sx={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <Box className='actions-left' sx={{ mr: 2, display: 'flex', alignItems: 'center' }}>
                {hidden ? (
                    <IconButton color='inherit' sx={{ ml: -2.75 }} onClick={toggleNavVisibility}>
                        <Icon icon='mdi:menu' />
                    </IconButton>
                ) : null}

                <ModeToggler settings={settings} saveSettings={saveSettings} />
            </Box>
            {user ? (
                <Box className='actions-right' sx={{ display: 'flex', alignItems: 'center' }}>
                    <UserDropdown settings={settings} permissions={permissions} />
                </Box>
            ) : (
                <Button variant={'contained'} href={`/api/auth/login`}>
                    Login
                </Button>
            )}
        </Box>
    )
}

export default AppBarContent
