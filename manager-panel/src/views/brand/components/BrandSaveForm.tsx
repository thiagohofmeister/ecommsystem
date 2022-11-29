import FormGroup from 'components/FormGroup'
import FormInputsContainer from 'components/FormInputsContainer'
import InputContainer from 'components/InputContainer'
import TextAreaContainer from 'components/TextAreaContainer'

import { useBrandData } from './useBrandData'

const BrandSaveForm: React.FC<BrandSaveFormProps> = () => {
  const { controllers } = useBrandData()

  return (
    <FormInputsContainer>
      <FormGroup>
        <InputContainer label="Label" controller={controllers.label} isRequired />

        <InputContainer label="Urn" controller={controllers.urn} />
      </FormGroup>

      <TextAreaContainer label="Descrição" controller={controllers.description} />
    </FormInputsContainer>
  )
}

interface BrandSaveFormProps {
  id?: string
}

export default BrandSaveForm
