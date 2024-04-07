// ** React Imports
import { useState } from 'react'

// ** MUI Imports
import Card from '@mui/material/Card'
import Typography from '@mui/material/Typography'
import { DataGrid, GridColDef, GridRenderCellParams } from '@mui/x-data-grid'

// ** Custom Components
import CustomChip from 'src/@core/components/mui/chip'

// ** Utils Import
import { Order } from '@prisma/client'

const statusObj = {
    PENDING: 'primary',
    AWAITING_PAYMENT: 'success',
    AWAITING_FULFILLMENT: 'error',
    SHIPPED: 'warning',
    COMPLETED: 'info'
}

const TableSort = ({ orders }: { orders: Order[] }) => {
    // ** States
    const [paginationModel, setPaginationModel] = useState({ page: 0, pageSize: 10 })

    const columns: GridColDef[] = [
        {
            flex: 0.275,
            minWidth: 290,
            field: 'id',
            headerName: 'Order ID',
            renderCell: (params: GridRenderCellParams) => (
                <Typography variant='body2' sx={{ color: 'text.primary' }}>
                    {params.row.id}
                </Typography>
            )
        },
        {
            flex: 0.2,
            type: 'date',
            minWidth: 120,
            headerName: 'Purchase Date',
            field: 'createdAt',
            valueGetter: params => new Date(params.value),
            renderCell: (params: GridRenderCellParams) => (
                <Typography variant='body2' sx={{ color: 'text.primary' }}>
                    {params.row.createdAt}
                </Typography>
            )
        },
        {
            flex: 0.2,
            type: 'date',
            minWidth: 120,
            headerName: 'Last Update',
            field: 'updatedAt',
            valueGetter: params => new Date(params.value),
            renderCell: (params: GridRenderCellParams) => (
                <Typography variant='body2' sx={{ color: 'text.primary' }}>
                    {params.row.updatedAt}
                </Typography>
            )
        },
        {
            flex: 0.2,
            minWidth: 140,
            field: 'status',
            headerName: 'Status',
            renderCell: (params: GridRenderCellParams) => {
                // @ts-ignore
                const color = statusObj[params.row.status]

                return (
                    <CustomChip
                        size='small'
                        skin='light'
                        color={color}
                        label={params.row.status}
                        sx={{ '& .MuiChip-label': { textTransform: 'capitalize' } }}
                    />
                )
            }
        }
    ]

    return (
        <Card>
            <DataGrid
                autoHeight
                rows={orders}
                columns={columns}
                pageSizeOptions={[10, 25, 50]}
                paginationModel={paginationModel}
                onPaginationModelChange={setPaginationModel}
            />
        </Card>
    )
}

export default TableSort
