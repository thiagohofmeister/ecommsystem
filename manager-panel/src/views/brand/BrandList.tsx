import Button from 'components/Button'
import List from 'components/List'
import PageContainer from 'components/PageContainer'
import PageContainerTopRight from 'components/PageContainerTopRight'
import { useBrandGetList } from 'hooks/brand/useBrandGetList'
import { BrandTableProvider } from 'providers/brand/BrandTableProvider'
import { useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import brandRoute from 'routes/brandRoute'

export const BrandList = () => {
  const navigate = useNavigate()

  const handleBtnCreate = useCallback(() => {
    navigate(brandRoute.items.create.path)
  }, [navigate])

  return (
    <PageContainer pageTitle="Listagem de marcas">
      <PageContainerTopRight>
        <Button label="Criar marca" type="success" onClick={handleBtnCreate} />
      </PageContainerTopRight>

      <List query={useBrandGetList} tableProvider={BrandTableProvider} />
    </PageContainer>
  )
}

export default BrandList
