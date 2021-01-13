import "twin.macro";
import { useSelector } from "react-redux";

import { curry, mapValues, transform } from "lodash";

import { pick } from "lib";

import { TileCollection } from "components/modules/TileCollection";

import { useScreen, useStatusUpdate } from "hooks";

import { StateTable } from "./StateTable";
import { SensorTile } from "./SensorTile";
import { ValveStatus } from "./ValveStatus";

const Tiling = ({ columns }: { columns: number }) => {
    const status = useSelector(state => state.status);
    const { pressure, waterFlow, temperature, barometric, waterVolume, waterDepth } = mapValues(
        pick(
            status,
            "pressure",
            "waterFlow",
            "temperature",
            "barometric",
            "waterVolume",
            "waterDepth"
        ),
        value => value?.toFixed(2) ?? "?"
    );

    return (
        <TileCollection columns={columns} title="Sensor Data" tw="p-0">
            <SensorTile title="Presssure" value={pressure} unit="psi" />
            <SensorTile title="Flow" value={waterFlow} unit="mm/s" />
            <SensorTile title="Temperature" value={temperature} unit="°C" />
            <SensorTile title="Barometeric" value={barometric} unit="bar" />
            <SensorTile title="Volume" value={waterVolume} unit="liter" />
            <SensorTile title="Depth" value={waterDepth} unit="meter" />
        </TileCollection>
    );
};

export const Monitoring = () => {
    const { min, max } = useScreen();
    const { status, reload } = useStatusUpdate();
    return (
        <div>
            <h1 tw="text-display text-primary p-8 pb-0 mx-auto w-full max-w-screen-xl">
                Montoring
            </h1>

            {/* <div tw="p-8 mx-auto w-full max-w-screen-xl">
            <Button text="Pause" onClick={() => setPause(!pause)} />
            <ConnectionBadge status={result.status} />
            </div> */}
            <main
                tw="grid w-full max-w-screen-xl gap-8 mx-auto p-8"
                css={
                    min`md`
                        ? "grid-template-columns: 1fr min-content;"
                        : "grid-template-columns: 1fr"
                }>
                <div tw="grid gap-8 content-start">
                    <ValveStatus />
                    {max`md` && <Tiling columns={2} />}
                    <StateTable />
                </div>
                {min`md` && <Tiling columns={min`xl` ? 2 : 1} />}
            </main>
        </div>
    );
};
