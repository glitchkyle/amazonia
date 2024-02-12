// ** Demo Imports
import ApexChartWrapper from 'src/@core/styles/libs/react-apexcharts'
import KeenSliderWrapper from 'src/@core/styles/libs/keen-slider'
import ItemCatalog from 'src/views/apps/catalog/ItemCatalog'

const CatalogPage = () => {
  return (
    <ApexChartWrapper>
      <KeenSliderWrapper>
        <ItemCatalog />
      </KeenSliderWrapper>
    </ApexChartWrapper>
  )
}

CatalogPage.guestGuard = true

export default CatalogPage
