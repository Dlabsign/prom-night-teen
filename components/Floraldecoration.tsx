"use client";

interface FloralDecorationProps {
    position: "top-left" | "top-right" | "bottom-left" | "bottom-right";
    size?: number;
}

export default function FloralDecoration({ position, size = 200 }: FloralDecorationProps) {
    // HANYA menyimpan logika flip (cermin), tidak ada posisi absolut!
    const posClass = {
        "top-left": "",
        "top-right": "scale-x-[-1]",
        "bottom-left": "scale-y-[-1]",
        "bottom-right": "scale-[-1]",
    }[position];
    return (
        <div className={`${posClass} pointer-events-none`} style={{ width: size, height: size }}>
            <svg
                width={size}
                height={size}
                viewBox="0 0 200 200"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
            >
                {/* Marigold cluster - center large */}
                <g transform="translate(30, 30)">
                    {[0, 45, 90, 135, 180, 225, 270, 315].map((angle, i) => {
                        const cx = Number((Math.cos((angle * Math.PI) / 180) * 18).toFixed(4));
                        const cy = Number((Math.sin((angle * Math.PI) / 180) * 18).toFixed(4));
                        return (
                            <ellipse
                                key={i}
                                cx={cx}
                                cy={cy}
                                rx="10"
                                ry="5"
                                transform={`rotate(${angle} ${cx} ${cy})`}
                                fill={i % 2 === 0 ? "#FF6B1A" : "#FFD700"}
                                opacity="0.85"
                            />
                        );
                    })}
                    <circle cx="0" cy="0" r="8" fill="#FF8C00" opacity="0.9" />
                </g>

                {/* Small marigold top-right area */}
                <g transform="translate(75, 15)">
                    {[0, 60, 120, 180, 240, 300].map((angle, i) => {
                        const cx = Number((Math.cos((angle * Math.PI) / 180) * 10).toFixed(4));
                        const cy = Number((Math.sin((angle * Math.PI) / 180) * 10).toFixed(4));
                        return (
                            <ellipse
                                key={i}
                                cx={cx}
                                cy={cy}
                                rx="6"
                                ry="3"
                                transform={`rotate(${angle} ${cx} ${cy})`}
                                fill={i % 2 === 0 ? "#FF3CAC" : "#FF6B1A"}
                                opacity="0.8"
                            />
                        );
                    })}
                    <circle cx="0" cy="0" r="4" fill="#FF0080" opacity="0.9" />
                </g>

                {/* Tiny purple flower */}
                <g transform="translate(15, 80)">
                    {[0, 72, 144, 216, 288].map((angle, i) => {
                        const cx = Number((Math.cos((angle * Math.PI) / 180) * 7).toFixed(4));
                        const cy = Number((Math.sin((angle * Math.PI) / 180) * 7).toFixed(4));
                        return (
                            <ellipse
                                key={i}
                                cx={cx}
                                cy={cy}
                                rx="5"
                                ry="2.5"
                                transform={`rotate(${angle} ${cx} ${cy})`}
                                fill="#9B5DE5"
                                opacity="0.9"
                            />
                        );
                    })}
                    <circle cx="0" cy="0" r="3" fill="#7B2FBE" opacity="0.9" />
                </g>

                {/* Curved stem/vine */}
                <path
                    d="M 5 160 C 20 130, 40 120, 60 100 C 80 80, 90 60, 110 40"
                    stroke="#00F5C4"
                    strokeWidth="1.5"
                    fill="none"
                    opacity="0.5"
                    strokeDasharray="4 3"
                />
                <path
                    d="M 0 100 C 15 85, 35 75, 55 60 C 70 48, 85 35, 100 20"
                    stroke="#FFD700"
                    strokeWidth="1"
                    fill="none"
                    opacity="0.4"
                    strokeDasharray="3 4"
                />

                {/* Leaf shapes */}
                <ellipse cx="50" cy="85" rx="12" ry="5" transform="rotate(-35, 50, 85)" fill="#00A86B" opacity="0.6" />
                <ellipse cx="70" cy="65" rx="10" ry="4" transform="rotate(-50, 70, 65)" fill="#00C853" opacity="0.5" />

                {/* Papel picado diamond shapes */}
                <g transform="translate(95, 50)">
                    <rect x="-5" y="-5" width="10" height="10" transform="rotate(45)" fill="#00E5FF" opacity="0.6" />
                </g>
                <g transform="translate(55, 130)">
                    <rect x="-4" y="-4" width="8" height="8" transform="rotate(45)" fill="#FF3CAC" opacity="0.5" />
                </g>
                <g transform="translate(110, 20)">
                    <rect x="-3" y="-3" width="6" height="6" transform="rotate(45)" fill="#FFD700" opacity="0.7" />
                </g>

                {/* Tiny star sparkles */}
                {[[120, 55], [85, 110], [40, 155], [140, 35], [160, 80]].map(([x, y], i) => (
                    <g key={i} transform={`translate(${x},${y})`}>
                        <line x1="0" y1="-4" x2="0" y2="4" stroke={["#FFD700", "#FF6B1A", "#00E5FF", "#FF3CAC", "#9B5DE5"][i]} strokeWidth="1.2" opacity="0.7" />
                        <line x1="-4" y1="0" x2="4" y2="0" stroke={["#FFD700", "#FF6B1A", "#00E5FF", "#FF3CAC", "#9B5DE5"][i]} strokeWidth="1.2" opacity="0.7" />
                    </g>
                ))}

                {/* Glow overlay */}
                <defs>
                    <radialGradient id="glowOrange" cx="30" cy="30" r="40" gradientUnits="userSpaceOnUse">
                        <stop offset="0%" stopColor="#FF6B1A" stopOpacity="0.2" />
                        <stop offset="100%" stopColor="#FF6B1A" stopOpacity="0" />
                    </radialGradient>
                </defs>
                <circle cx="30" cy="30" r="40" fill="url(#glowOrange)" />
            </svg>
        </div>
    );
}