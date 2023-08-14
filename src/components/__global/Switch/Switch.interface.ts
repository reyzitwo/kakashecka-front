export default interface Switch {
  value: boolean;
  onToggle: (value: boolean) => void;
  className?: string;
}
