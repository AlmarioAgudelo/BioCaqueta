import mongoose from "mongoose";

const avistamientoCollection = "avistamientos";

const avistamientoSchema = new mongoose.Schema({
    nombreComun: { type: String, required: true },
    nombreCientifico: { type: String, required: true },
    categoria: {
        type: String,
        required: true,
        enum: ["Mamífero", "Ave", "Reptil", "Anfibio", "Flora"]
    },
    zona: { type: String, required: true },
    estadoConservacion: {
        type: String,
        enum: ["Preocupación menor", "Vulnerable", "En peligro"],
        default: "Preocupación menor"
    },
    investigador: { type: String, required: true },
    fechaRegistro: { type: Date, default: Date.now }
});

export const avistamientoModel = mongoose.model(avistamientoCollection, avistamientoSchema);
