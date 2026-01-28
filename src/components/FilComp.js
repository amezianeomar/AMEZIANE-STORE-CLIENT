import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../App.css';

function FilComp() {
    // State for filters
    const [search, setSearch] = useState('');
    const [category, setCategory] = useState('');
    const [priceMax, setPriceMax] = useState('');

    // State for data
    const [products, setProducts] = useState([]);
    const [pagination, setPagination] = useState({});
    const [loading, setLoading] = useState(true);

    const fetchProducts = (page = 1) => {
        setLoading(true);

        const params = {
            page: page,
            search: search,
            category: category,
            max_price: priceMax
        };

        axios.get(`http://localhost:8000/api/products`, { params })
            .then(res => {
                // Laravel paginate() wraps items in 'data' and provides meta in top level
                setProducts(res.data.data);
                setPagination({
                    current_page: res.data.current_page,
                    last_page: res.data.last_page,
                    total: res.data.total
                });
                setLoading(false);
            })
            .catch(err => {
                console.error("Error fetching data", err);
                setLoading(false);
            });
    };

    // Fetch on mount and when filters change (optional - or use button)
    // Let's use a button to trigger search/filter to avoid too many requests while typing
    useEffect(() => {
        fetchProducts(1);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const handleSearch = () => {
        fetchProducts(1); // Reset to page 1 on new filter
    };

    const handlePageChange = (newPage) => {
        if (newPage >= 1 && newPage <= pagination.last_page) {
            fetchProducts(newPage);
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    };

    return (
        <div className="fil-container">
            <h3 className="section-title">Catalogue des Artefacts</h3>

            {/* Filters Section */}
            <div className="filters-panel glass-panel mb-4">
                <div className="form-row">
                    <div className="form-group">
                        <label>Recherche</label>
                        <input
                            type="text"
                            className="modern-input"
                            placeholder="Nom..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                        />
                    </div>
                    <div className="form-group">
                        <label>Catégorie</label>
                        <input
                            type="text"
                            className="modern-input"
                            placeholder="Ex: Armes"
                            value={category}
                            onChange={(e) => setCategory(e.target.value)}
                        />
                    </div>
                    <div className="form-group">
                        <label>Prix Max (€)</label>
                        <input
                            type="number"
                            className="modern-input"
                            placeholder="Budget Max"
                            value={priceMax}
                            onChange={(e) => setPriceMax(e.target.value)}
                        />
                    </div>
                </div>
                <button className="modern-button primary full-width mt-2" onClick={handleSearch}>
                    Appliquer les Filtres
                </button>
            </div>

            {/* Results */}
            {loading ? (
                <div className="loading">Chargement des reliques...</div>
            ) : (
                <>
                    <div className="products-grid">
                        {products.length > 0 ? products.map(p => (
                            <div key={p.id} className="product-card">
                                <div className="product-image-container">
                                    <img src={p.image} alt={p.nom} className="product-image" />
                                </div>
                                <div className="product-info">
                                    <h4 className="product-name">{p.nom}</h4>
                                    <span className="product-category">{p.categorie}</span>
                                    <div className="product-price">{p.prix} €</div>
                                </div>
                            </div>
                        )) : (
                            <div className="no-results">Aucun artefact trouvé.</div>
                        )}
                    </div>

                    {/* Pagination Controls */}
                    {pagination.last_page > 1 && (
                        <div className="pagination-controls">
                            <button
                                className="modern-button"
                                onClick={() => handlePageChange(pagination.current_page - 1)}
                                disabled={pagination.current_page === 1}
                            >
                                &laquo; Précédent
                            </button>
                            <span className="page-indicator">
                                Page {pagination.current_page} sur {pagination.last_page}
                            </span>
                            <button
                                className="modern-button"
                                onClick={() => handlePageChange(pagination.current_page + 1)}
                                disabled={pagination.current_page === pagination.last_page}
                            >
                                Suivant &raquo;
                            </button>
                        </div>
                    )}
                </>
            )}
        </div>
    );
}

export default FilComp;
