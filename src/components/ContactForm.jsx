import React, { useState, useRef, useEffect } from 'react';
import { gsap } from 'gsap';

const ContactForm = () => {
    const formRef = useRef(null);
    const buttonRef = useRef(null);
    const [submitted, setSubmitted] = useState(false);

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        mobile: '',
        country: '',
        message: ''
    });

    const [countryCode, setCountryCode] = useState('+91');

    const countryCodes = [
        { code: '+91', flag: '🇮🇳', name: 'IN' },
        { code: '+1', flag: '🇺🇸', name: 'US' },
        { code: '+44', flag: '🇬🇧', name: 'UK' },
        { code: '+61', flag: '🇦🇺', name: 'AU' },
        { code: '+971', flag: '🇦🇪', name: 'UAE' },
        { code: '+65', flag: '🇸🇬', name: 'SG' },
        { code: '+49', flag: '🇩🇪', name: 'DE' },
        { code: '+33', flag: '🇫🇷', name: 'FR' },
        { code: '+81', flag: '🇯🇵', name: 'JP' },
        { code: '+86', flag: '🇨🇳', name: 'CN' },
        { code: '+7', flag: '🇷🇺', name: 'RU' },
        { code: '+55', flag: '🇧🇷', name: 'BR' },
        { code: '+27', flag: '🇿🇦', name: 'ZA' },
        { code: '+234', flag: '🇳🇬', name: 'NG' },
        { code: '+92', flag: '🇵🇰', name: 'PK' },
        { code: '+880', flag: '🇧🇩', name: 'BD' },
        { code: '+94', flag: '🇱🇰', name: 'LK' },
        { code: '+977', flag: '🇳🇵', name: 'NP' },
    ];

    const [errors, setErrors] = useState({});
    const [focused, setFocused] = useState('');
    const [captchaVerified, setCaptchaVerified] = useState(false);
    const [captchaAnim, setCaptchaAnim] = useState(false);

    useEffect(() => {
        gsap.fromTo(
            formRef.current,
            { opacity: 0, y: 40 },
            { opacity: 1, y: 0, duration: 1, ease: 'power3.out', delay: 0.3 }
        );
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
        if (errors[name]) setErrors({ ...errors, [name]: '' });
    };

    const validateForm = () => {
        let newErrors = {};
        if (!formData.name.trim()) newErrors.name = 'Required';
        if (!formData.email.trim()) newErrors.email = 'Required';
        else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Invalid email';
        if (!formData.message.trim()) newErrors.message = 'Required';
        if (!captchaVerified) newErrors.captcha = 'Please verify you are human';
        return newErrors;
    };

    const handleCaptcha = () => {
        if (captchaVerified) return;
        setCaptchaAnim(true);
        setTimeout(() => {
            setCaptchaAnim(false);
            setCaptchaVerified(true);
        }, 800);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const validationErrors = validateForm();
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            gsap.to(formRef.current, { x: [-8, 8, -8, 8, 0], duration: 0.4, ease: 'power2.out' });
            return;
        }
        gsap.to(buttonRef.current, { scale: 0.95, duration: 0.1, yoyo: true, repeat: 1 });
        setSubmitted(true);
        setTimeout(() => {
            setSubmitted(false);
            setFormData({ name: '', email: '', mobile: '', country: '', message: '' });
        }, 3000);
    };

    return (
        <div className="dramatic-form-wrapper" ref={formRef}>

            {submitted ? (
                <div className="form-success-state">
                    <div className="success-checkmark">✦</div>
                    <h3>MESSAGE SENT</h3>
                    <p>We'll be in touch soon.</p>
                </div>
            ) : (
                <form onSubmit={handleSubmit} className="dramatic-form" noValidate>

                    {/* Row 1 — Name + Email */}
                    <div className="df-row df-row-split">
                        <div className={`df-field-card ${errors.name ? 'df-card-error' : ''}`}>
                            <label className="df-card-label">YOUR NAME</label>
                            <input
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                onFocus={() => setFocused('name')}
                                onBlur={() => setFocused('')}
                                className={`df-card-input${focused === 'name' ? ' df-card-focused' : ''}`}
                                placeholder="e.g. Riya Sharma"
                                autoComplete="off"
                            />
                            {errors.name && <span className="df-card-err">{errors.name}</span>}
                        </div>

                        <div className={`df-field-card ${errors.email ? 'df-card-error' : ''}`}>
                            <label className="df-card-label">EMAIL ADDRESS</label>
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                onFocus={() => setFocused('email')}
                                onBlur={() => setFocused('')}
                                className={`df-card-input${focused === 'email' ? ' df-card-focused' : ''}`}
                                placeholder="you@example.com"
                                autoComplete="off"
                            />
                            {errors.email && <span className="df-card-err">{errors.email}</span>}
                        </div>
                    </div>

                    {/* Row 2 — Phone + Country */}
                    <div className="df-row df-row-split">

                        <div className="df-field-card">
                            <label className="df-card-label">PHONE NUMBER <span className="df-card-optional">(optional)</span></label>
                            <div className="df-phone-row">
                                <select
                                    className="df-country-select"
                                    value={countryCode}
                                    onChange={e => setCountryCode(e.target.value)}
                                >
                                    {countryCodes.map(c => (
                                        <option key={c.code} value={c.code}>
                                            {c.flag} {c.code}
                                        </option>
                                    ))}
                                </select>
                                <div className="df-phone-input-wrap">
                                    <input
                                        type="tel"
                                        name="mobile"
                                        value={formData.mobile}
                                        onChange={handleChange}
                                        onFocus={() => setFocused('mobile')}
                                        onBlur={() => setFocused('')}
                                        className={`df-card-input${focused === 'mobile' ? ' df-card-focused' : ''}`}
                                        placeholder="00000 00000"
                                        autoComplete="off"
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="df-field-card">
                            <label className="df-card-label">COUNTRY NAME</label>
                            <input
                                type="text"
                                name="country"
                                value={formData.country}
                                onChange={handleChange}
                                onFocus={() => setFocused('country')}
                                onBlur={() => setFocused('')}
                                className={`df-card-input${focused === 'country' ? ' df-card-focused' : ''}`}
                                placeholder="e.g. India"
                                autoComplete="off"
                            />
                        </div>

                    </div>

                    {/* Row 3 — Message */}
                    <div className="df-row">
                        <div className={`df-field-card ${errors.message ? 'df-card-error' : ''}`}>
                            <label className="df-card-label">YOUR MESSAGE</label>
                            <textarea
                                name="message"
                                value={formData.message}
                                onChange={handleChange}
                                onFocus={() => setFocused('message')}
                                onBlur={() => setFocused('')}
                                className={`df-card-input df-card-textarea${focused === 'message' ? ' df-card-focused' : ''}`}
                                placeholder="Tell us about your vision, artwork inquiry or project idea…"
                                rows="4"
                            />
                            {errors.message && <span className="df-card-err">{errors.message}</span>}
                        </div>
                    </div>

                    {/* Captcha */}
                    <div className="df-row df-captcha-row">
                        <div
                            className={`df-captcha-box${captchaVerified ? ' df-captcha-verified' : ''}${captchaAnim ? ' df-captcha-animating' : ''}${errors.captcha ? ' df-captcha-error' : ''}`}
                            onClick={handleCaptcha}
                            role="checkbox"
                            aria-checked={captchaVerified}
                            tabIndex={0}
                            onKeyDown={e => e.key === ' ' && handleCaptcha()}
                        >
                            <span className="df-captcha-check">
                                {captchaAnim ? (
                                    <span className="df-captcha-spinner"></span>
                                ) : captchaVerified ? (
                                    <svg viewBox="0 0 20 20" fill="none" stroke="#d4af37" strokeWidth="2.5"><polyline points="4 10 8 14 16 6" /></svg>
                                ) : (
                                    <span className="df-captcha-empty"></span>
                                )}
                            </span>
                            <span className="df-captcha-label">I'm not a robot</span>
                            <span className="df-captcha-logo">
                                <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <circle cx="32" cy="32" r="30" stroke="#4A90D9" strokeWidth="2" opacity="0.6" />
                                    <text x="50%" y="54%" dominantBaseline="middle" textAnchor="middle" fontSize="22" fill="#4A90D9" opacity="0.85" fontFamily="serif">rC</text>
                                </svg>
                                <span className="df-captcha-logo-text">reCAPTCHA</span>
                                <span className="df-captcha-logo-sub">Privacy · Terms</span>
                            </span>
                        </div>
                        {errors.captcha && <span className="df-card-err df-captcha-err-msg">{errors.captcha}</span>}
                    </div>

                    {/* Submit */}
                    <div className="df-submit-row">
                        <button type="submit" className="df-card-submit" ref={buttonRef}>
                            <span>SEND MESSAGE</span>
                            <span className="df-card-submit-arrow">→</span>
                        </button>
                    </div>

                </form>
            )}
        </div>
    );
};

export default ContactForm;
