import React, { useState } from 'react';
import axios from 'axios';
import '../App.css';

const API_URL = 'https://ameziane-store-backend.vercel.app';

function AddComp({ onProductAdded }) { // Optional: callback to refresh list
    const [nom, setNom] = useState('');
    const [prix, setPrix] = useState('');
    const [categorie, setCategorie] = useState('');
    const [image, setImage] = useState(null);
    const [message, setMessage] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        setMessage('');

        const formData = new FormData();
        formData.append('nom', nom);
        formData.append('prix', prix);
        formData.append('categorie', categorie);
        if (image) {
            formData.append('image', image);
        }

        try {
            const res = await axios.post(`${API_URL}/api/products`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            if (res.status === 201) {
                setMessage('Succès : Artefact enregistré !');
                setNom('');
                setPrix('');
                setCategorie('');
                setImage(null);
                // Reset file input visually if needed
                document.getElementById('file-upload').value = null;
                if (onProductAdded) onProductAdded();
            }
        } catch (error) {
            console.error(error);
            setMessage('Erreur critique lors de la création.');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="add-container glassy-panel">
            <h3 className="section-title">Nouvel Artefact</h3>

            {/* Cyberpunk Modal */}
            {message && (
                <div className="modal-overlay" onClick={() => setMessage('')}>
                    <div className="modal-content" onClick={e => e.stopPropagation()}>
                        <h2 className="modal-title">
                            {message.includes('Succès') ? 'ACCÈS AUTORISÉ' : 'ACCÈS REFUSÉ'}
                        </h2>
                        <p className="modal-message">{message}</p>
                        <button className="modal-close" onClick={() => setMessage('')}>
                            {message.includes('Succès') ? 'TERMINER' : 'RETOUR'}
                        </button>
                    </div>
                </div>
            )}

            <form onSubmit={handleSubmit} className="modern-form">
                <div className="form-group">
                    <label>Nom de l'objet</label>
                    <input
                        className="modern-input"
                        type="text"
                        value={nom}
                        onChange={(e) => setNom(e.target.value)}
                        required
                    />
                </div>

                <div className="form-row">
                    <div className="form-group">
                        <label>Prix (€)</label>
                        <input
                            className="modern-input"
                            type="number"
                            step="0.01"
                            value={prix}
                            onChange={(e) => setPrix(e.target.value)}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label>Catégorie</label>
                        <input
                            className="modern-input"
                            type="text"
                            value={categorie}
                            onChange={(e) => setCategorie(e.target.value)}
                            required
                        />
                    </div>
                </div>

                <div className="form-group">
                    <label>Image Holographique</label>
                    <input
                        id="file-upload"
                        className="file-input"
                        type="file"
                        onChange={(e) => setImage(e.target.files[0])}
                        required
                    />
                </div>

                <button type="submit" className="modern-button primary" disabled={isSubmitting}>
                    {isSubmitting ? 'Materialisation...' : 'Ajouter au Stock'}
                </button>
            </form>
        </div>
    );
}

export default AddComp;
