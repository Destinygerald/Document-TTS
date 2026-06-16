import { banner } from "@/styles";
import { IconType } from "react-icons";

interface ICard {
  label: string;
  icon: IconType;
}

export function Card({ label, icon: Icon }: ICard) {
  return (
    <div className={banner.how_it_works_card}>
      <span>
        <Icon />
      </span>
      <span>{label}</span>
    </div>
  );
}
