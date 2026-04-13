"use client";
import "../components/Flower.scss";


import { useEffect } from "react";

export default function FlowersBackground() {
    useEffect(() => {
        const script = document.createElement("script");
        script.src = "/flower.js";
        script.async = true;
        document.body.appendChild(script);

        return () => {
            document.body.removeChild(script);
        };
    }, []);

    return (
        <div className="not-loaded">
            <div className="night"></div>

            <div className="flowers">
                <div className="flower flower--1">
                    <div className="flower__leafs flower__leafs--1">
                        {[...Array(4)].map((_, i) => (
                            <div key={i} className={`flower__leaf flower__leaf--${i + 1}`} />
                        ))}
                        <div className="flower__white-circle"></div>

                        {[...Array(8)].map((_, i) => (
                            <div key={i} className={`flower__light flower__light--${i + 1}`} />
                        ))}
                    </div>
                </div>

                {/* Tambahkan bagian lain sesuai kebutuhan (boleh copy dari versi sebelumnya) */}
            </div>
        </div>
    );
}