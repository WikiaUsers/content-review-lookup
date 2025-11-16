// [[w:c:dev:InPageEdit NEXT]]
document.body.append(
  Object.assign(document.createElement('script'), {
    src: 'https://cdn.jsdelivr.net/npm/@inpageedit/core@0.14.0/dist/index.js',
    type: 'module',
    crossorigin: 'anonymous',
    integrity: 'sha256-ESW02zg93BXJH9beUHCRRLTRiBxnIkiH9yo6iiPwWSs='
  })
);