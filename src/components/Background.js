import { useEffect } from "react";
import Particles from 'particlesjs'
import './Background.css'

export default function ParticleBackground() {
    useEffect(() => {
        Particles.init({
            selector: '.background',
            connectParticles: true,
            color: '#4a1e2f',
            responsive: [
                {
                    breakpoint: 768,
                    options: {
                        maxParticles: 150,
                        color: '#48F2E3',
                        connectParticles: true
                    }
                }, {
                    breakpoint: 425,
                    options: {
                        maxParticles: 100,
                        connectParticles: false
                    }
                }, {
                    breakpoint: 320,
                    options: {
                        maxParticles: 0
                    }
                }
            ]
        });
    })
    return (
        <canvas className="background"></canvas>
    );
}