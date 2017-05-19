const app = {
  config: {
    imageUploadUrl: '/upload-images',
    imageModelName: 'imageModelName',
    productsEditorUrl: 'predl/groups',
    rubricatorUrl: '/tree',
    rubricatorUpdate: '/tree/update',
    dataUrl: '/table/data',
    urlSaveTiger: '/table/save',
    urlJob: '/table/save',

    help: {
      url: '/help',
      data: {}
    },

    scenarios: {
      current: {
        slug: ''
      }
    }
  }
};

window.app = app;
