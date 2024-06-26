// ** React Imports
import { useState, SyntheticEvent, Fragment } from 'react'

// ** Next Import
import { useRouter } from 'next/router'

// ** MUI Imports
import Box from '@mui/material/Box'
import Menu from '@mui/material/Menu'
import Badge from '@mui/material/Badge'
import Avatar from '@mui/material/Avatar'
import Divider from '@mui/material/Divider'
import MenuItem from '@mui/material/MenuItem'
import { styled } from '@mui/material/styles'
import Typography from '@mui/material/Typography'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

// ** Axios
import axios from 'axios'

// ** Type Imports
import { Settings } from 'src/@core/context/settingsContext'
import options from 'src/configs'
import { useUser } from '@auth0/nextjs-auth0/client'
import { UserPermission } from 'src/types/auth'

interface Props {
    settings: Settings
    permissions?: UserPermission[]
}

// ** Styled Components
const BadgeContentSpan = styled('span')(({ theme }) => ({
    width: 8,
    height: 8,
    borderRadius: '50%',
    backgroundColor: theme.palette.success.main,
    boxShadow: `0 0 0 2px ${theme.palette.background.paper}`
}))

const UserDropdown = (props: Props) => {
    // ** Props
    const { settings, permissions } = props

    // ** States
    const [anchorEl, setAnchorEl] = useState<Element | null>(null)

    // ** Hooks

    const { user, checkSession } = useUser()
    const router = useRouter()

    // ** Vars
    const { direction } = settings

    const handleDropdownOpen = (event: SyntheticEvent) => {
        setAnchorEl(event.currentTarget)
    }

    const handleDropdownClose = (url?: string) => {
        if (url) router.push(url)
        setAnchorEl(null)
    }
    const handleUpgradeToSeller = async () => {
        try {
            await axios.post('/api/auth/upgrade')
            await checkSession()
            router.reload()
        } catch (e) {
            alert(e)
        }
    }

    const styles = {
        py: 2,
        px: 4,
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        color: 'text.primary',
        textDecoration: 'none',
        '& svg': {
            mr: 2,
            fontSize: '1.375rem',
            color: 'text.primary'
        }
    }

    return (
        <Fragment>
            <Badge
                overlap='circular'
                onClick={handleDropdownOpen}
                sx={{ ml: 2, cursor: 'pointer' }}
                badgeContent={<BadgeContentSpan />}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'right'
                }}
            >
                <Avatar
                    alt='John Doe'
                    onClick={handleDropdownOpen}
                    sx={{ width: 40, height: 40 }}
                    src='/images/avatars/1.png'
                />
            </Badge>
            <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={() => handleDropdownClose()}
                sx={{ '& .MuiMenu-paper': { width: 230, mt: 4 } }}
                anchorOrigin={{ vertical: 'bottom', horizontal: direction === 'ltr' ? 'right' : 'left' }}
                transformOrigin={{ vertical: 'top', horizontal: direction === 'ltr' ? 'right' : 'left' }}
            >
                <Box sx={{ pt: 2, pb: 3, px: 4 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <Badge
                            overlap='circular'
                            badgeContent={<BadgeContentSpan />}
                            anchorOrigin={{
                                vertical: 'bottom',
                                horizontal: 'right'
                            }}
                        >
                            <Avatar
                                alt='John Doe'
                                src='/images/avatars/1.png'
                                sx={{ width: '2.5rem', height: '2.5rem' }}
                            />
                        </Badge>
                        <Box sx={{ display: 'flex', ml: 3, alignItems: 'flex-start', flexDirection: 'column' }}>
                            <Typography sx={{ fontWeight: 600 }}>{user?.name || 'John Doe'}</Typography>
                        </Box>
                    </Box>
                </Box>
                <Divider sx={{ mt: '0 !important' }} />
                <MenuItem sx={{ p: 0 }} onClick={() => handleDropdownClose('/profile')}>
                    <Box sx={styles}>
                        <Icon icon='mdi:account-outline' />
                        Profile
                    </Box>
                </MenuItem>

                {/**
                 * TODO: Change this when user roles can be stored inside app database
                 * Show become a seller button if user is not able to read their product details
                 */}
                {!permissions?.includes(UserPermission.READ_PRODUCTS) && (
                    <MenuItem sx={{ p: 0 }} onClick={() => handleUpgradeToSeller()}>
                        <Box sx={styles}>
                            <Icon icon='mdi:dollar' />
                            Become a Seller
                        </Box>
                    </MenuItem>
                )}

                <MenuItem
                    onClick={() => handleDropdownClose(`/api/auth/logout?returnTo=${options.rootUrl}`)}
                    sx={{ py: 2, '& svg': { mr: 2, fontSize: '1.375rem', color: 'text.primary' } }}
                >
                    <Icon icon='mdi:logout-variant' />
                    Logout
                </MenuItem>
            </Menu>
        </Fragment>
    )
}

export default UserDropdown
