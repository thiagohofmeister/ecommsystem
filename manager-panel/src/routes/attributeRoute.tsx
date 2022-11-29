import AttributeList from 'views/attribute/AttributeList'

const attributeRoute = {
  path: '/attribute',
  label: 'Atributos',
  items: {
    create: {
      label: 'Cadastro de atributo',
      path: '/attribute/create',
      component: <AttributeList />
    },
    edit: {
      label: 'Edição de atributo',
      path: '/attribute/edit/:id',
      component: <AttributeList />
    },
    list: { label: 'Listagem de atributo', path: '/attribute/list', component: <AttributeList /> }
  }
}

export default attributeRoute
