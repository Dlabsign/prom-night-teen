"use client";

export default function PapelPicadoDivider() {
    const colors = ["#FF6B1A", "#FFD700", "#FF3CAC", "#00E5FF", "#9B5DE5", "#FF6B1A", "#FFD700", "#FF3CAC"];

    return (
        <div className="relative w-full overflow-hidden py-2" aria-hidden="true">
            <div
                className="w-full h-px mt-2"
                style={{
                    background: "linear-gradient(to right, transparent, #FF6B1A55, #FFD70055, #FF3CAC55, #00E5FF55, transparent)", paddingTop:".80rem"
                }}
            />
            
            <svg
                width="100%"
                height="48"
                viewBox="0 0 800 48"
                preserveAspectRatio="xMidYMid meet"
                xmlns="http://www.w3.org/2000/svg"
            >
                {/* Hanging string */}
                <line x1="0" y1="0" x2="800" y2="0" stroke="#FFD700" strokeWidth="1" opacity="0.5" />

                {/* Papel picado banners */}
                {Array.from({ length: 16 }).map((_, i) => {
                    const x = i * 50 + 10;
                    const color = colors[i % colors.length];
                    const w = 36;
                    const h = 36;
                    return (
                        <g key={i} transform={`translate(${x}, 4)`}>
                            {/* Banner shape */}
                            <polygon
                                points={`0,0 ${w},0 ${w},${h} ${w / 2},${h + 6} 0,${h}`}
                                fill={color}
                                opacity="0.75"
                            />
                            {/* Cut-out circle */}
                            <circle cx={w / 2} cy="18" r="7" fill="#0A0A0F" opacity="0.9" />
                            {/* Cut-out diamond */}
                            <rect x={w / 2 - 4} y="8" width="8" height="8" transform={`rotate(45, ${w / 2}, 12)`} fill="#0A0A0F" opacity="0.9" />
                            {/* String attachment */}
                            <line x1={w / 2} y1="0" x2={w / 2} y2="-4" stroke={color} strokeWidth="1.5" opacity="0.8" />
                        </g>
                    );
                })}
            </svg>

            {/* Glow line under */}
                       <div
                className="w-full h-px mt-2"
                style={{
                    background: "linear-gradient(to right, transparent, #FF6B1A55, #FFD70055, #FF3CAC55, #00E5FF55, transparent)", paddingBottom:".80rem"
                }}
            />
        </div>
    );
}