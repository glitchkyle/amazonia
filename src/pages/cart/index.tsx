import UserLayout from 'src/layouts/UserLayout'
import { ProtectPage, ProtectionReturn } from 'src/navigation/pages'

// ** Next Import
import Link from 'next/link'

// ** MUI Imports
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import { styled } from '@mui/material/styles'

import { DataGrid, GridColDef } from '@mui/x-data-grid'
import { useSelector } from 'react-redux'
import { useState } from 'react'

import { RootState } from 'src/store'
import { CartProduct } from 'src/store/apps/cart'

import { Typography } from '@mui/material'
import TableHeader from 'src/views/apps/cart/TableHeader'

// ** Styled Components

interface CellType {
    row: CartProduct
}

// ** Styled component for the link in the dataTable
const LinkStyled = styled(Link)(({ theme }) => ({
    textDecoration: 'none',
    color: theme.palette.primary.main
}))

const columns: GridColDef[] = [
    {
        flex: 0.1,
        field: 'id',
        minWidth: 400,
        headerName: 'ID',
        renderCell: ({ row }: CellType) => <LinkStyled href={`/catalog/${row.id}`}>{`#${row.id}`}</LinkStyled>
    },
    {
        flex: 0.25,
        field: 'name',
        minWidth: 200,
        headerName: 'Name',
        renderCell: ({ row }: CellType) => {
            return (
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                        <Typography
                            noWrap
                            variant='body2'
                            sx={{ color: 'text.primary', fontWeight: 500, lineHeight: '22px', letterSpacing: '.1px' }}
                        >
                            {row.name}
                        </Typography>
                    </Box>
                </Box>
            )
        }
    },
    {
        flex: 0.1,
        minWidth: 90,
        field: 'quantity',
        headerName: 'Quantity',
        renderCell: ({ row }: CellType) => <Typography variant='body2'>{row.quantity}</Typography>
    },
    {
        flex: 0.1,
        minWidth: 90,
        field: 'price',
        headerName: 'Price',
        renderCell: ({ row }: CellType) => (
            <Typography variant='body2'>
                {row.currency} {row.price}
            </Typography>
        )
    }
]

export const getServerSideProps = ProtectPage({
    returnPath: '/cart'
})

const CartPage = (props: ProtectionReturn) => {
    const { permissions } = props

    const [paginationModel, setPaginationModel] = useState({ page: 0, pageSize: 10 })

    const store = useSelector((state: RootState) => state.Cart)

    return (
        <UserLayout permissions={permissions}>
            <Grid container spacing={6}>
                <Grid item xs={12}>
                    <Card>
                        <TableHeader price={store.price} />
                        <DataGrid
                            autoHeight
                            pagination
                            rows={store.data}
                            columns={columns}
                            checkboxSelection
                            disableRowSelectionOnClick
                            pageSizeOptions={[10, 25, 50]}
                            paginationModel={paginationModel}
                            onPaginationModelChange={setPaginationModel}
                        />
                    </Card>
                </Grid>
            </Grid>
        </UserLayout>
    )
}

export default CartPage
