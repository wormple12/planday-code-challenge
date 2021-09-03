import React, { Suspense } from 'react';
import { useRecoilValue } from 'recoil';

import { SuspenseLoader } from '@Components/utilities';

export const AddImage: React.FC = props => {

    return (
        <div className="content">
            {/* Needs error boundary for handling fetch errors */}
            <Suspense fallback={<SuspenseLoader />}>
                <h1>Testing Suspense</h1>
                <p className="sectionDesc">Here are the results that pass your requirements.</p>
                <br />
                <h3>Starships:</h3>
                <h3>Pilot:</h3>
            </Suspense>
        </div>
    );
};

const SuspendedGrid: React.FC<{ resource }> = ({ resource }) => {
    let starships = resource.read();
    starships.forEach(e => e.cost_in_credits = `${parseInt(e.cost_in_credits, 10) / 1000}K`);

    return (
        <></>
    );
};

const SuspendedInfoBox: React.FC<{ resource }> = ({ resource }) => {
    const pilot = resource.read();

    return (
        <div style={{ width: "100%", backgroundColor: "greenyellow", border: "2px dotted black", padding: "10px" }}>
            <label><b>Name:</b></label>
            <p>{pilot.name}</p>
            <label><b>Height:</b></label>
            <p>{pilot.height}</p>
            <label><b>Mass:</b></label>
            <p>{pilot.mass}</p>
            <label><b>Birth Year:</b></label>
            <p>{pilot.birth_year}</p>
            <label><b>Level of Experience:</b></label>
            <p>{pilot.vehicles.length + pilot.starships.length}</p>
        </div>
    );
};