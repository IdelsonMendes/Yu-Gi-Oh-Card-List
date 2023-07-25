import React, { useState, useEffect } from "react";
import axios from "axios";

const CardList = () => {
  const [originalCards, setOriginalCards] = useState([]); // Dados originais da API
  const [filteredCards, setFilteredCards] = useState([]); // Cartas filtradas para exibição

  const [selectedCard, setSelectedCard] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  // Função para buscar as cartas da API
  const fetchCards = async () => {
    try {
      const response = await axios.get(
        "https://db.ygoprodeck.com/api/v7/cardinfo.php"
      );
      setOriginalCards(response.data.data);
    } catch (error) {
      console.error("Erro ao buscar as cartas:", error);
    }
  };

  useEffect(() => {
    fetchCards();
  }, []);

  useEffect(() => {
    // Função para filtrar as cartas localmente
    const filterCards = () => {
      const filtered = originalCards.filter((card) =>
        card.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredCards(filtered);
    };

    filterCards();
  }, [searchTerm, originalCards]);

  const handleCardClick = (card) => {
    setSelectedCard(card);
    setModalOpen(true);
  };

  const closeModal = () => {
    setSelectedCard(null);
    setModalOpen(false);
  };

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  return (
    <div className="cards-container">
      <nav id="nav">
        <h1>Lista de Cartas</h1>
        <input
          id="search-card"
          type="text"
          placeholder="Buscar cartas"
          value={searchTerm}
          onChange={handleSearch}
        ></input>
      </nav>
      <hr></hr>
      <ul className="cards-list">
        {filteredCards.map((card) => (
          <li
            className="card"
            key={card.id}
            onClick={() => handleCardClick(card)}
          >
            <img
              className="card-image"
              src={card.card_images[0].image_url}
              alt={card.name}
            />
          </li>
        ))}
      </ul>
      {modalOpen && selectedCard && (
        <div className="modal" onClick={closeModal}>
          <img
            src={selectedCard.card_images[0].image_url}
            alt={selectedCard.name}
          />
        </div>
      )}
    </div>
  );
};

export default CardList;
