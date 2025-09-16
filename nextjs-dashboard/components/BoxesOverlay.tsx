'use client';
import useSwr from 'swr';


type Box = { 
    id: number;
    coordinates: [number, number][]; // Array of [x,y] coordinate pairs
    availability: number;            // 0 = available, 1 = occupied
};

const fetcher = (url: string) => fetch(url).then(r => r.json());

export function BoxesOverlay() {
    const { data: boxes, error } = useSwr<Box[]>('/api/boxes', fetcher, { refreshInterval: 5000, });

    if (error) return <p style={{color: 'red'}}>Failed to load boxes.</p>
    if (!boxes) return <p>Loading bounding boxes...</p>

    return (
        <svg width={640} height={480} style={{position:'absolute', top:0, left:0}}>
            {boxes.map(b => {
                // Convert 4-corner coordinates to polygon points string
                const points = b.coordinates.map(([x, y]) => `${x},${y}`).join(' ');
                
                return (
                    <polygon
                        key={b.id}
                        points={points}
                        stroke={b.availability === 1 ? "red" : "lime"}
                        fill="transparent"
                        strokeWidth={2}
                    />
                );
            })}
        </svg>
    )
}