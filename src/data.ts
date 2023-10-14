export const patientData = {
  personal: {
    name: "John Smith",
    age: "37",
  },
  pgx: {
    recommendations: [
      ["Drug", "Gene", "Phenotype", "Recommendation"],
      ["Pazonib", "DYPD", "Normal Metabolizer", "Take more"],
      ["Afectanib", "DPY2C6", "High Metabolizer", "Cut back"],
      ["Drugatinab", "DYPD2", "Low Metabolizer", "Double down"],
    ],
  },
  oncology: {
    cosmic: [
      ["Gene", "Tumour", "Genotype"],
      ...Array.from(Array(50).keys()).map(() => {
        return ["BRAF", "H2A1", "V600E"];
      }),
    ],
  },
};

// export const schemaData = {
//     personal: [
//         {
//             "field": "name",
//             "type": "string"
//         },
//         {
//             "field": "age",
//             "type": "number"
//         }
//     ],
//     pgx: [
//         {
//             "field": "recommendations",
//             "type": "table"
//         }
//     ]
// }
