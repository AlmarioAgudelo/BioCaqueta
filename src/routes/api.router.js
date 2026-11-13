import { Router } from "express";
import { avistamientoModel } from "../models/Avistamiento.js";

const router = Router();

router.get("/", async (req, res) => {
    const { categoria } = req.query;
    const filtro = categoria ? { categoria } : {};
    try {
        const result = await avistamientoModel.find(filtro).sort({ fechaRegistro: -1 });
        res.status(200).json(result);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

router.post("/", async (req, res) => {
    const newAvistamiento = req.body;
    const esFormulario = req.headers["content-type"]?.includes("application/x-www-form-urlencoded");
    try {
        const result = await avistamientoModel.create(newAvistamiento);
        if (esFormulario) {
            return res.redirect("/");
        }
        res.status(201).json(result);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

router.put("/:id", async (req, res) => {
    const { id } = req.params;
    const { zona, estadoConservacion } = req.body;
    const cambios = {};
    if (zona !== undefined) cambios.zona = zona;
    if (estadoConservacion !== undefined) cambios.estadoConservacion = estadoConservacion;
    try {
        const result = await avistamientoModel.findByIdAndUpdate(id, cambios, { new: true, runValidators: true });
        if (!result) return res.status(404).json({ error: "Avistamiento no encontrado" });
        res.status(200).json(result);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

router.post("/update/:id", async (req, res) => {
    const { id } = req.params;
    const { zona, estadoConservacion } = req.body;
    try {
        const result = await avistamientoModel.findByIdAndUpdate(
            id, { zona, estadoConservacion }, { runValidators: true }
        );
        if (!result) return res.status(404).send("Avistamiento no encontrado");
        res.redirect("/");
    } catch (error) {
        res.status(400).send("Error al actualizar: " + error.message);
    }
});

router.delete("/:id", async (req, res) => {
    const { id } = req.params;
    try {
        const result = await avistamientoModel.findByIdAndDelete(id);
        if (!result) return res.status(404).json({ error: "Avistamiento no encontrado" });
        res.status(200).json({ status: "success", data: result });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

router.post("/delete/:id", async (req, res) => {
    const { id } = req.params;
    try {
        const result = await avistamientoModel.findByIdAndDelete(id);
        if (!result) return res.status(404).send("Avistamiento no encontrado");
        res.redirect("/");
    } catch (error) {
        res.status(400).send("Error al eliminar: " + error.message);
    }
});

export default router;
