export const patientData = {
    personal: {
        "name": "John Smith",
        "age": "37"
    },
    pgx: {
        recommendations: [
            ['Drug', 'Gene', 'Phenotype', 'Recommendation'],
            ['Pazonib', 'DYPD', 'Normal Metabolizer', 'Take more'],
            ['Afectanib', 'DPY2C6', 'High Metabolizer', 'Cut back'],
            ['Drugatinab', 'DYPD2', 'Low Metabolizer', 'Double down'],
        ]
    }
}

export const schemaData = {
    personal: [
        {
            "field": "name",
            "type": "string"
        },
        {
            "field": "age",
            "type": "number"
        }
    ],
    pgx: [
        {
            "field": "recommendations",
            "type": "table"
        }
    ]
}