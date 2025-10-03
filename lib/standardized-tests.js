export const tests = [
  {
    id: "boston-naming-test",
    name: "Test de Denominación de Boston (BNT)",
    description: "Evaluación de la capacidad de denominación visual",
    category: "afasia",
    ageRange: "18-95",
    baremos: [
      {
        ageRange: "18-95",
        baremo: [
          { min: 0, max: 10, scoreRange: "0-10", ds: "< P5", interpretation: "Severamente Alterado" },
          { min: 11, max: 20, scoreRange: "11-20", ds: "P5-P10", interpretation: "Moderadamente Alterado" },
          { min: 21, max: 35, scoreRange: "21-35", ds: "P10-P25", interpretation: "Levemente Alterado" },
          { min: 36, max: 45, scoreRange: "36-45", ds: "P25-P50", interpretation: "Límite Inferior" },
          { min: 46, max: 55, scoreRange: "46-55", ds: "P50-P75", interpretation: "Normal" },
          { min: 56, max: 60, scoreRange: "56-60", ds: "P75-P95", interpretation: "Superior" },
        ],
      },
    ],
  },
  {
    id: "boston-diagnostic-aphasia",
    name: "Examen Diagnóstico de Afasia de Boston (BDAE)",
    description: "Evaluación comprensiva de las habilidades del lenguaje",
    category: "afasia",
    ageRange: "18-95",
    baremos: [
      {
        ageRange: "18-95",
        baremo: [
          { min: 0, max: 25, scoreRange: "0-25", ds: "< P5", interpretation: "Severamente Alterado" },
          { min: 26, max: 50, scoreRange: "26-50", ds: "P5-P25", interpretation: "Moderadamente Alterado" },
          { min: 51, max: 75, scoreRange: "51-75", ds: "P25-P75", interpretation: "Normal" },
          { min: 76, max: 100, scoreRange: "76-100", ds: "P75-P95", interpretation: "Superior" },
        ],
      },
    ],
  },
]
