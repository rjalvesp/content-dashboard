export const downloadCustomJSON = (function () {
  const a = document.createElement('a');
  document.body.appendChild(a);
  a.style = 'display: none';
  return function (data, fileName) {
    const json = JSON.stringify(data),
      blob = new Blob([json], { type: 'octet/stream' }),
      url = window.URL.createObjectURL(blob);
    a.href = url;
    a.target = '_blank';
    a.click();
    window.URL.revokeObjectURL(url);
  };
})();
