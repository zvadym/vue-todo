export default {
  getCardById: state => id => state.cards.find(card => card.id === id)
}
