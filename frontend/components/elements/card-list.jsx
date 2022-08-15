export default function CardList({ cards }) {
  return (
    <ul role="list" className="space-y-3">
      {cards.map((card) => (
        <li
          key={card.id}
          className="bg-white shadow overflow-hidden rounded-md px-6 py-4"
        >
          {}
        </li>
      ))}
    </ul>
  );
}
