import { Router } from "express";
import { avistamientoModel } from "../models/Avistamiento.js";

const router = Router();

router.get("/", async (req, res) => {
    try {
        const result = await avistamientoModel.find().sort({ fechaRegistro: -1 }).lean();
        res.render("home", { title: "BioCaquetá - Avistamientos", avistamientos: result });
    } catch (error) {
        res.status(500).send("Error al consultar los avistamientos: " + error.message);
    }
});

router.get("/editar/:id", async (req, res) => {
    const { id } = req.params;
    try {
        const result = await avistamientoModel.findById(id).lean();
        if (!result) return res.status(404).send("Avistamiento no encontrado");
        res.render("editar", {
            title: "Editar avistamiento",
            avistamiento: result,
            esPreocupacion: result.estadoConservacion === "Preocupación menor",
            esVulnerable: result.estadoConservacion === "Vulnerable",
            esPeligro: result.estadoConservacion === "En peligro"
        });
    } catch (error) {
        res.status(400).send("Error al buscar el avistamiento: " + error.message);
    }
});

export default router;
