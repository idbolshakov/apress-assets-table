import Table from './Table';

export default class App extends React.Component {
  render() {
    const configCell = {
      check: {
        type: 'check'
      },
      description: {
        type: 'text'
      },
      'detailed-description': {
        type: 'text'
      },
      h1: {
        type: 'text'
      },
      name: {
        type: 'text'
      },
      'page-description': {
        type: 'text'
      },
      photo: {
        type: 'img'
      },
      'product-group': {
        type: 'path'
      },
      'tag-title': {
        type: 'text'
      },
      url: {
        type: 'text'
      }
    };

    const placeholder = {
      description: 'Заполнить описание',
      detailed_description: 'Укажите подробное описание',
      h1: 'Заполнить H1',
      name: 'Название товара',
      page_description: 'Description',
      tag_title: 'Заполнить title',
      url: 'Указать URL'
    };

    return (
      <div>
        <Table tableData={this.props.tableData} configCell={configCell} placeholder={placeholder} />
      </div>
    );
  }
}
