// ** Demo Imports
import ApexChartWrapper from 'src/@core/styles/libs/react-apexcharts'
import KeenSliderWrapper from 'src/@core/styles/libs/keen-slider'
import ItemCatalog from 'src/views/pages/catalog/ItemCatalog'
import UserLayout from 'src/layouts/UserLayout'
import { ProtectPage, ProtectionReturn } from 'src/navigation/pages'

export const getServerSideProps = ProtectPage({})

const CatalogPage = (props: ProtectionReturn) => {
  const { permissions } = props

  return (
    <UserLayout permissions={permissions}>
      <ApexChartWrapper>
        <KeenSliderWrapper>
          <ItemCatalog />
        </KeenSliderWrapper>
      </ApexChartWrapper>
    </UserLayout>
  )
}

export default CatalogPage
