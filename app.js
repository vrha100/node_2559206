const express = require('express');
const mongoose = require('mongoose');
const Colegio = require('./models/colegioModel');
const Reporte = require('./models/reporteModel');

const app = express();
app.use(express.json());

// Configurar la conexión a MongoDB
const mongoURI = 'mongodb://localhost:27017/gestion-colegios';
mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log('Connected to MongoDB');
        app.listen(3000, () => {
            console.log('API server listening on port 3000');
        });
    })
    .catch((err) => console.error('Error connecting to MongoDB:', err));

// Rutas para los colegios
app.get('/colegios', async (req, res) => {
    try {
        const colegios = await Colegio.find();
        res.json(colegios);
    } catch (err) {
        res.status(500).json({ error: 'Error al obtener los colegios' });
    }
});

app.post('/colegios', async (req, res) => {
    try {
        const colegio = new Colegio(req.body);
        await colegio.save();
        res.status(201).json(colegio);
    } catch (err) {
        res.status(400).json({ error: 'Error al crear el colegio' });
    }
});

app.get('/colegios/:id', async (req, res) => {
    try {
        const colegio = await Colegio.findById(req.params.id);
        if (colegio) {
            res.json(colegio);
        } else {
            res.status(404).json({ error: 'Colegio no encontrado' });
        }
    } catch (err) {
        res.status(500).json({ error: 'Error al obtener el colegio' });
    }
});

app.put('/colegios/:id', async (req, res) => {
    try {
        const colegio = await Colegio.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (colegio) {
            res.json(colegio);
        } else {
            res.status(404).json({ error: 'Colegio no encontrado' });
        }
    } catch (err) {
        res.status(400).json({ error: 'Error al actualizar el colegio' });
    }
});

app.delete('/colegios/:id', async (req, res) => {
    try {
        const colegio = await Colegio.findByIdAndDelete(req.params.id);
        if (colegio) {
            res.json({ message: 'Colegio eliminado correctamente' });
        } else {
            res.status(404).json({ error: 'Colegio no encontrado' });
        }
    } catch (err) {
        res.status(500).json({ error: 'Error al eliminar el colegio' });
    }
});

// Rutas para los reportes
app.get('/reportes', async (req, res) => {
    try {
        const reportes = await Reporte.find().populate('colegio');
        res.json(reportes);
    } catch (err) {
        res.status(500).json({ error: 'Error al obtener los reportes' });
    }
});

app.post('/reportes', async (req, res) => {
    try {
        const reporte = new Reporte(req.body);
        await reporte.save();
        res.status(201).json(reporte);
    } catch (err) {
        res.status(400).json({ error: 'Error al crear el reporte' });
    }
});

app.get('/reportes/:id', async (req, res) => {
    try {
        const reporte = await Reporte.findById(req.params.id).populate('colegio');
        if (reporte) {
            res.json(reporte);
        } else {
            res.status(404).json({ error: 'Reporte no encontrado' });
        }
    } catch (err) {
        res.status(500).json({ error: 'Error al obtener el reporte' });
    }
});

app.put('/reportes/:id', async (req, res) => {
    try {
        const reporte = await Reporte.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (reporte) {
            res.json(reporte);
        } else {
            res.status(404).json({ error: 'Reporte no encontrado' });
        }
    } catch (err) {
        res.status(400).json({ error: 'Error al actualizar el reporte' });
    }
});

app.delete('/reportes/:id', async (req, res) => {
    try {
        const reporte = await Reporte.findByIdAndDelete(req.params.id);
        if (reporte) {
            res.json({ message: 'Reporte eliminado correctamente' });
        } else {
            res.status(404).json({ error: 'Reporte no encontrado' });
        }
    } catch (err) {
        res.status(500).json({ error: 'Error al eliminar el reporte' });
    }
});

module.exports = app;

