import "./card.css";

interface CardProps {
  title: string;
  text: string;
  image: string;
}

export const Card = (props: CardProps) => {
  return (
    <div className="card">
      <div
        className="card-image"
        style={{ backgroundImage: `url(${props.image})` }}
      />
      <div className="card-text p-4">
        <h3>{props.title}</h3>
        <p>{props.text}</p>
      </div>
    </div>
  );
};
