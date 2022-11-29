import Button from 'components/Button'
import List from 'components/List'
import PageContainer from 'components/PageContainer'
import PageContainerTopRight from 'components/PageContainerTopRight'
import { useAttributeGetList } from 'hooks/attribute/useAttributeGetList'
import { AttributeTableProvider } from 'providers/attribute/AttributeTableProvider'
import { useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import attributeRoute from 'routes/attributeRoute'

export const AttributeList = () => {
  const navigate = useNavigate()

  const handleBtnCreate = useCallback(() => {
    navigate(attributeRoute.items.create.path)
  }, [navigate])

  return (
    <PageContainer pageTitle="Listagem de atributos">
      <PageContainerTopRight>
        <Button label="Criar atributo" type="success" onClick={handleBtnCreate} />
      </PageContainerTopRight>

      <List query={useAttributeGetList} tableProvider={AttributeTableProvider} />
    </PageContainer>
  )
}

export default AttributeList
