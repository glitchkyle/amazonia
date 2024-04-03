// ** React Imports
import { SyntheticEvent, useState } from 'react'

// ** MUI Imports
import Box from '@mui/material/Box'
import TabList from '@mui/lab/TabList'
import TabPanel from '@mui/lab/TabPanel'
import TabContext from '@mui/lab/TabContext'
import { styled } from '@mui/material/styles'
import Typography from '@mui/material/Typography'
import MuiTab, { TabProps } from '@mui/material/Tab'
import Card from '@mui/material/Card'
import Grid from '@mui/material/Grid'
import Table from '@mui/material/Table'
import TableRow from '@mui/material/TableRow'
import TableCell from '@mui/material/TableCell'
import TableBody from '@mui/material/TableBody'
import CardContent from '@mui/material/CardContent'
import TableContainer from '@mui/material/TableContainer'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

import { Product, User } from '@prisma/client'

interface Props {
    product: { seller: User } & Product
}

enum TabSelection {
    OVERVIEW = 'Overview',
    SELLER = 'Seller'
}

// ** Styled Tab component
const Tab = styled(MuiTab)<TabProps>(({ theme }) => ({
    minHeight: 48,
    flexDirection: 'row',
    '& svg': {
        marginBottom: '0 !important',
        marginRight: theme.spacing(1)
    }
}))

const UserViewRight = ({ product }: Props) => {
    // ** State
    const [activeTab, setActiveTab] = useState<TabSelection>(TabSelection.OVERVIEW)

    const handleChange = (event: SyntheticEvent, value: TabSelection) => {
        setActiveTab(value)
    }

    return (
        <TabContext value={activeTab}>
            <TabList
                variant='scrollable'
                scrollButtons='auto'
                onChange={handleChange}
                aria-label='forced scroll tabs example'
                sx={{ borderBottom: theme => `1px solid ${theme.palette.divider}` }}
            >
                <Tab value={TabSelection.OVERVIEW} label='Overview' icon={<Icon icon='mdi:invoice-list' />} />
                <Tab value={TabSelection.SELLER} label='Seller' icon={<Icon icon='mdi:account-tag' />} />
            </TabList>
            <Box sx={{ mt: 6 }}>
                <>
                    <TabPanel sx={{ p: 0 }} value={TabSelection.OVERVIEW}>
                        <Grid container spacing={6}>
                            <Grid item xs={12}>
                                <Card>
                                    <CardContent>
                                        <Grid container spacing={6}>
                                            <Grid item xs={12} lg={6}>
                                                <TableContainer>
                                                    <Table size='small' sx={{ width: '95%' }}>
                                                        <TableBody
                                                            sx={{
                                                                '& .MuiTableCell-root': {
                                                                    border: 0,
                                                                    pt: 2,
                                                                    pb: 2,
                                                                    pl: '0 !important',
                                                                    pr: '0 !important',
                                                                    '&:first-of-type': {
                                                                        width: 148
                                                                    }
                                                                }
                                                            }}
                                                        >
                                                            <TableRow>
                                                                <TableCell>
                                                                    <Typography
                                                                        sx={{
                                                                            fontWeight: 500,
                                                                            fontSize: '0.875rem',
                                                                            whiteSpace: 'nowrap',
                                                                            lineHeight: '22px',
                                                                            letterSpacing: '0.1px'
                                                                        }}
                                                                    >
                                                                        Name:
                                                                    </Typography>
                                                                </TableCell>
                                                                <TableCell>{product.name}</TableCell>
                                                            </TableRow>
                                                            <TableRow>
                                                                <TableCell>
                                                                    <Typography
                                                                        sx={{
                                                                            fontWeight: 500,
                                                                            fontSize: '0.875rem',
                                                                            whiteSpace: 'nowrap',
                                                                            lineHeight: '22px',
                                                                            letterSpacing: '0.1px'
                                                                        }}
                                                                    >
                                                                        Price:
                                                                    </Typography>
                                                                </TableCell>
                                                                <TableCell>
                                                                    {product.price} {product.currency}
                                                                </TableCell>
                                                            </TableRow>
                                                            <TableRow>
                                                                <TableCell>
                                                                    <Typography
                                                                        sx={{
                                                                            fontWeight: 500,
                                                                            fontSize: '0.875rem',
                                                                            whiteSpace: 'nowrap',
                                                                            lineHeight: '22px',
                                                                            letterSpacing: '0.1px'
                                                                        }}
                                                                    >
                                                                        Quantity:
                                                                    </Typography>
                                                                </TableCell>
                                                                <TableCell>{product.quantity}</TableCell>
                                                            </TableRow>
                                                        </TableBody>
                                                    </Table>
                                                </TableContainer>
                                            </Grid>

                                            <Grid item xs={12} lg={6}>
                                                <TableContainer>
                                                    <Table size='small'>
                                                        <TableBody
                                                            sx={{
                                                                '& .MuiTableCell-root': {
                                                                    border: 0,
                                                                    pt: 2,
                                                                    pb: 2,
                                                                    pl: '0 !important',
                                                                    pr: '0 !important',
                                                                    '&:first-of-type': {
                                                                        width: 148
                                                                    }
                                                                }
                                                            }}
                                                        >
                                                            <TableRow>
                                                                <TableCell>
                                                                    <Typography
                                                                        sx={{
                                                                            fontWeight: 500,
                                                                            fontSize: '0.875rem',
                                                                            whiteSpace: 'nowrap',
                                                                            lineHeight: '22px',
                                                                            letterSpacing: '0.1px'
                                                                        }}
                                                                    >
                                                                        Created At:
                                                                    </Typography>
                                                                </TableCell>
                                                                <TableCell>
                                                                    {product.createdAt as unknown as string}
                                                                </TableCell>
                                                            </TableRow>
                                                            <TableRow>
                                                                <TableCell>
                                                                    <Typography
                                                                        sx={{
                                                                            fontWeight: 500,
                                                                            fontSize: '0.875rem',
                                                                            whiteSpace: 'nowrap',
                                                                            lineHeight: '22px',
                                                                            letterSpacing: '0.1px'
                                                                        }}
                                                                    >
                                                                        Updated At:
                                                                    </Typography>
                                                                </TableCell>
                                                                <TableCell>
                                                                    {product.updatedAt as unknown as string}
                                                                </TableCell>
                                                            </TableRow>
                                                        </TableBody>
                                                    </Table>
                                                </TableContainer>
                                            </Grid>
                                        </Grid>
                                    </CardContent>
                                </Card>
                            </Grid>
                        </Grid>
                    </TabPanel>
                    <TabPanel sx={{ p: 0 }} value={TabSelection.SELLER}>
                        <Grid container spacing={6}>
                            <Grid item xs={12}>
                                <Card>
                                    <CardContent>
                                        <Grid container spacing={6}>
                                            <Grid item xs={12} lg={6}>
                                                <TableContainer>
                                                    <Table size='small' sx={{ width: '95%' }}>
                                                        <TableBody
                                                            sx={{
                                                                '& .MuiTableCell-root': {
                                                                    border: 0,
                                                                    pt: 2,
                                                                    pb: 2,
                                                                    pl: '0 !important',
                                                                    pr: '0 !important',
                                                                    '&:first-of-type': {
                                                                        width: 148
                                                                    }
                                                                }
                                                            }}
                                                        >
                                                            <TableRow>
                                                                <TableCell>
                                                                    <Typography
                                                                        sx={{
                                                                            fontWeight: 500,
                                                                            fontSize: '0.875rem',
                                                                            whiteSpace: 'nowrap',
                                                                            lineHeight: '22px',
                                                                            letterSpacing: '0.1px'
                                                                        }}
                                                                    >
                                                                        Name:
                                                                    </Typography>
                                                                </TableCell>
                                                                <TableCell>
                                                                    {product.seller.firstName} {product.seller.lastName}
                                                                </TableCell>
                                                            </TableRow>
                                                            <TableRow>
                                                                <TableCell>
                                                                    <Typography
                                                                        sx={{
                                                                            fontWeight: 500,
                                                                            fontSize: '0.875rem',
                                                                            whiteSpace: 'nowrap',
                                                                            lineHeight: '22px',
                                                                            letterSpacing: '0.1px'
                                                                        }}
                                                                    >
                                                                        Email:
                                                                    </Typography>
                                                                </TableCell>
                                                                <TableCell>{product.seller.email}</TableCell>
                                                            </TableRow>
                                                        </TableBody>
                                                    </Table>
                                                </TableContainer>
                                            </Grid>

                                            <Grid item xs={12} lg={6}>
                                                <TableContainer>
                                                    <Table size='small'>
                                                        <TableBody
                                                            sx={{
                                                                '& .MuiTableCell-root': {
                                                                    border: 0,
                                                                    pt: 2,
                                                                    pb: 2,
                                                                    pl: '0 !important',
                                                                    pr: '0 !important',
                                                                    '&:first-of-type': {
                                                                        width: 148
                                                                    }
                                                                }
                                                            }}
                                                        >
                                                            <TableRow>
                                                                <TableCell>
                                                                    <Typography
                                                                        sx={{
                                                                            fontWeight: 500,
                                                                            fontSize: '0.875rem',
                                                                            whiteSpace: 'nowrap',
                                                                            lineHeight: '22px',
                                                                            letterSpacing: '0.1px'
                                                                        }}
                                                                    >
                                                                        Created At:
                                                                    </Typography>
                                                                </TableCell>
                                                                <TableCell>
                                                                    {product.seller.createdAt as unknown as string}
                                                                </TableCell>
                                                            </TableRow>
                                                            <TableRow>
                                                                <TableCell>
                                                                    <Typography
                                                                        sx={{
                                                                            fontWeight: 500,
                                                                            fontSize: '0.875rem',
                                                                            whiteSpace: 'nowrap',
                                                                            lineHeight: '22px',
                                                                            letterSpacing: '0.1px'
                                                                        }}
                                                                    >
                                                                        Updated At:
                                                                    </Typography>
                                                                </TableCell>
                                                                <TableCell>
                                                                    {product.seller.updatedAt as unknown as string}
                                                                </TableCell>
                                                            </TableRow>
                                                        </TableBody>
                                                    </Table>
                                                </TableContainer>
                                            </Grid>
                                        </Grid>
                                    </CardContent>
                                </Card>
                            </Grid>
                        </Grid>
                    </TabPanel>
                </>
            </Box>
        </TabContext>
    )
}

export default UserViewRight
