export const isURL = (url: string) => {
  var pattern = new RegExp(
    '^(https?:\\/\\/)?' + // protocol
      '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' + // domain name
      '((\\d{1,3}\\.){3}\\d{1,3}))' + // OR ip (v4) address
      '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // port and path
      '(\\?[;&a-z\\d%_.~+=-]*)?' + // query string
      '(\\#[-a-z\\d_]*)?$',
    'i'
  ); // fragment locator
  return !!pattern.test(url);
};

export const isValidPostalCode = (postalCode: any) => {
  const POSTAL_CODE_REGEXP = /^[A-Za-z]\d[A-Za-z][ -]\d[A-Za-z]\d$/;

  return POSTAL_CODE_REGEXP.test(postalCode);
};
