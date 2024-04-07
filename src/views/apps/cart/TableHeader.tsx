// ** MUI Imports
import Box from '@mui/material/Box'
import { Typography } from '@mui/material'

interface TableHeaderProps {
    price: number
}

const TableHeader = (props: TableHeaderProps) => {
    // ** Props
    const { price } = props

    return (
        <Box
            sx={{
                p: 5,
                pb: 3,
                width: '100%',
                display: 'flex',
                flexWrap: 'wrap',
                alignItems: 'center',
                justifyContent: 'space-between'
            }}
        >
            <Box sx={{ marginLeft: 'auto' }}>
                <Typography>Total: ${price}</Typography>
            </Box>
        </Box>
    )
}

export default TableHeader
