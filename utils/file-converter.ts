function onLoadFile(e: any) {
  const typedarray = new Uint8Array(e.target.result);
}

export function convertFileToBase64(e: any) {
  const file = e?.target?.files[0] || e.dataTransfer.files[0];
  const fileReader = new FileReader();

  fileReader.onload = onLoadFile;
  fileReader.readAsArrayBuffer(file);
}
