// Ice Cream Design System - collection of dumb components for ice cream store app

import { ChangeEventHandler, FC, useCallback } from "react";
import { FLAVORS, Flavor, Scoop, TOPPINGS, Topping } from "./idl";

interface PickerProps<T extends string> {
  label: string;
  items: readonly T[];
  value: T;
  onSelect: (value: T) => void;
}

export const Picker = <T extends string>(
  { label, items, value, onSelect }: PickerProps<T>
) => {
  const onChange = useCallback<ChangeEventHandler<HTMLSelectElement>>(
    (e) => onSelect(e.target.value as T),
    [onSelect]
  );

  return (
    <div>
      <label>
        {label}:{" "}
        <select onChange={onChange} value={value}>
          {items.map((item) => (
            <option key={item} value={item}>
              {item}
            </option>
          ))}
        </select>
      </label>
    </div>
  );
};

interface ScoopCardProps extends Scoop {
  onSelectFlavor: (flavor: Flavor) => void;
  onSelectTopping: (topping: Topping) => void;
}

export const ScoopCard: FC<ScoopCardProps> = (
  { flavor, topping, onSelectFlavor, onSelectTopping }
) => (
  <div className="scoop-card">
    <Picker
      label="Flavor"
      items={FLAVORS}
      value={flavor}
      onSelect={onSelectFlavor}
    />
    <Picker
      label="Topping"
      items={TOPPINGS}
      value={topping}
      onSelect={onSelectTopping}
    />
  </div>
);
