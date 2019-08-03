import { generateFileHTML } from "./generateFileHTML";
import * as Print from 'expo-print';

export const createPDF = async values => {
  const html = generateFileHTML(values);
  const options = {
    html,
    fileName: "test",
    directory: "Documents"
  };
  const pdf = await Print.printToFileAsync({ html });  
  return pdf;
  //return await RNHTMLtoPDF.convert(options);
};