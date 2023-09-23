import { useAtom, useAtomValue, useSetAtom } from "jotai";
import { FC, useCallback } from "react";
import { CONE_TYPES, Flavor, Topping } from "./idl";
import { Picker, ScoopCard } from "./ids";
import {
  addScoopAtom,
  coneAtom,
  iceCreamConeAtom,
  scoopIdsAtom,
  toppingsIssueAtom,
  updateFlavorAtom,
  updateToppingAtom,
  useScoop,
} from "./state";

const IceCreamInspector: FC = () => {
  const iceCream = useAtomValue(iceCreamConeAtom);
  return (
    <div>
      <div className="section-title">Inspector:</div>
      <div className="inspector">{JSON.stringify(iceCream, null, 4)}</div>
    </div>
  );
};

const StatefulConePicker: FC = () => {
  const [cone, setCone] = useAtom(coneAtom);
  return (
    <Picker label="Cone" items={CONE_TYPES} value={cone} onSelect={setCone} />
  );
};

const StatefulScoopCard: FC<{ scoopId: string }> = ({ scoopId }) => {
  const scoop = useScoop(scoopId);
  const updateFlavor = useSetAtom(updateFlavorAtom);
  const updateTopping = useSetAtom(updateToppingAtom);
  
  const onSelectFlavor = useCallback((flavor: Flavor) => {
    updateFlavor(scoopId, flavor);
  }, [scoopId, updateFlavor]);
  
  const onSelectTopping = useCallback((topping: Topping) => {
    updateTopping(scoopId, topping);
  }, [scoopId, updateTopping]);

  if (!scoop) {
    throw new Error(`No scoop with id ${scoopId}`);
  }

  const { flavor, topping } = scoop;
  return (
    <ScoopCard
      id={scoopId}
      flavor={flavor}
      topping={topping}
      onSelectFlavor={onSelectFlavor}
      onSelectTopping={onSelectTopping}
    />
  );
};

const Scoops: FC = () => {
  const scoopIds = useAtomValue(scoopIdsAtom);
  const addScoop = useSetAtom(addScoopAtom);

  return (
    <div className="scoops">
      <div>Scoops:</div>
      {scoopIds.map((id) => (
        <StatefulScoopCard key={id} scoopId={id} />
      ))}
      <button className="add-scoop-btn" onClick={addScoop}>+</button>
    </div>
  );
};

const IceCreamForm: FC = () => (
  <div>
    <div className="section-title">Ice Cream Cone:</div>
    <StatefulConePicker />
    <Scoops />
  </div>
);

const IceCreamIssues: FC = () => {
  const toppingsIssue = useAtomValue(toppingsIssueAtom);

  return (
    <div>
      <div className="section-title">Issues:</div>
      <div className="issues">{toppingsIssue}</div>
    </div>
  );
}

export const IDLExample: FC = () => (
  <div className="example">
    <div className="example-title">Ice Cream Cone Editor</div>
    <IceCreamInspector />
    <IceCreamForm />
    <IceCreamIssues />
  </div>
);
