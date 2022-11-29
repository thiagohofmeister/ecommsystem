import { LayoutContentBottom } from 'components/ContentBottom'
import { FormControllerDefault } from 'components/FormController/FormController'
import PageContainer from 'components/PageContainer'
import { Panel } from 'components/Panel'
import { BrandEditProvider } from 'providers/brand/BrandEditProvider'
import { useParams } from 'react-router-dom'
import brandRoute from 'routes/brandRoute'

import BrandSaveForm from './components/BrandSaveForm'

export const BrandSave = () => {
  const { id } = useParams()

  return (
    <BrandEditProvider>
      <PageContainer
        pageTitle={id ? 'Editar marca' : 'Cadastro de marcas'}
        backRoute={brandRoute.items.list.path}>
        <Panel>
          <BrandSaveForm id={id} />

          <LayoutContentBottom>
            <FormControllerDefault />
          </LayoutContentBottom>
        </Panel>
      </PageContainer>
    </BrandEditProvider>
  )
}

export default BrandSave
