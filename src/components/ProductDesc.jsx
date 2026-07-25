import { useState, useRef, useEffect } from "react";
import '../styles/ProductDesc.css'

export default function ProductDesc({ text }) {
    const [expanded, setExpanded] = useState(false);
    const [showBtn, setShowBtn] = useState(false);
    const pRef = useRef(null);

    useEffect(() => {
        const el = pRef.current;

        if (el && el.scrollHeight > el.clientHeight) {
            setShowBtn(true);
        }
    }, []);

    return (
        <div>
            <p ref={pRef} className={expanded ? "expanded" : ""}>
                {text}
            </p>

            {showBtn && (

                <button
                    className="see-more-btn" style={{ fontWeight: 300, fontSize: '12px', color: "#b09848" }}
                    onClick={() => setExpanded(!expanded)}>
                    {expanded ? "...See less" : "See more..."}
                </button>
            )}
        </div>
    );
}