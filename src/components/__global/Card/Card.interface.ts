export default interface CardProps {
  id: number;
  image: string;
  header: string;
  subheader: string;
  price: number;
  onClick: () => void;
  className?: string;
}
