'use client';
import useSwr from 'swr';
import { Box } from '@/lib/boxStore';

const fetcher = ( url: string ) => fetch(url).then(r => r.json());

export function BoxesOverlay() {
    const { data: boxes, error } = useSwr<Box[]>('/api/boxes', fetcher, { refreshInterval: 1000, });

    if (error) return <p style={{color: 'red'}}>Failed to load boxes.</p>
    if (!boxes) return <p>Loading bounding boxes...</p>

    return (
        <svg width={640} height={480} style={{position:'absolute', top:0, left:0}}>
            {boxes.map(b => (
                <rect
                key={b.box_id}
                x={b.x1}
                y={b.y1}
                width={b.x2 - b.x1}
                height={b.y2 - b.y1}
                stroke="lime"
                fill="transparent"
                strokeWidth={2}
                />
            ))}
        </svg>
    )
}