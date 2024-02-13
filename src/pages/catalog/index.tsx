// ** Demo Imports
import ApexChartWrapper from 'src/@core/styles/libs/react-apexcharts'
import KeenSliderWrapper from 'src/@core/styles/libs/keen-slider'
import ItemCatalog from 'src/views/pages/catalog/ItemCatalog'

const CatalogPage = () => {
  return (
    <ApexChartWrapper>
      <KeenSliderWrapper>
        <ItemCatalog />
      </KeenSliderWrapper>
    </ApexChartWrapper>
  )
}

CatalogPage.authGuard = false

export default CatalogPage
