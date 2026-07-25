import "../styles/AppEnhancement.css";
import { useEffect, useState, useRef } from "react";
import ReCAPTCHA from "react-google-recaptcha";
import { GoogleLogin } from "@react-oauth/google";
import { motion, AnimatePresence } from "framer-motion";
// import logo from "../assets/Logo.png";

const signupLayoutArt = "https://illustrations.popsy.co/yellow/creative-work.svg";
const signupGuideFigureArt = "https://illustrations.popsy.co/yellow/painting.svg";

const signupGuideScenes = {
  1: {
    left: "47.5%",
    top: "50.5%",
    message: "What is your full name?",
  },
  2: {
    left: "47.5%",
    top: "50.5%",
    message: "What is your email?",
  },
  3: {
  left: "42%",
  top: "63%",
  message: "Create a strong password.",
},
4: {
  left: "42%",
  top: "68%",
  message: "Enter your mobile number.",
},
5: {
  left: "42%",
  top: "52%",
  message: "Select your role to continue.",
},

};

const signupGuideOriginFallback = {
  left: "95%",
  top: "72%",
};

function GuideCharacter({
  className = "",
  walking = false,
  gliding = false,
  ghost = false,
}) {
  const classes = [
    "signup-character",
    gliding
      ? "signup-character--glide"
      : walking
        ? "signup-character--walking"
        : "signup-character--idle",
    ghost ? "signup-character--ghost" : "",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div className={classes} aria-hidden="true">
      <span className="signup-character__shadow" />
      <img
        src={signupGuideFigureArt}
        alt=""
        className="signup-character__image"
        loading="lazy"
      />
    </div>
  );
}

function SignupWalkGuide({
  step,
  introActive,
  isReturning,
  origin,
  dropTop,
  sceneTargets,
  onIntroComplete,
  onReturnComplete,
}) {
  const scene = sceneTargets[step] || signupGuideScenes[step] || signupGuideScenes[1];
  const isIntroWalk = introActive && step === 1;
  const isReturnWalk = isReturning && step === 6;
  const showBubble = !introActive && !isReturnWalk && step > 0 && step < 7;
  const guideOrigin = origin || signupGuideOriginFallback;
  const guideOriginLeft = parseFloat(guideOrigin.left);
  const sceneLeftValue = parseFloat(scene.left);
  const returnScene = sceneTargets[5] || signupGuideScenes[5];
  const introDropStepCount = 188;
  const introLeftStepCount = 130;
  const introApproachStepCount = 18;
  
  
  const introDropEndTop = (
    dropTop
      ? Math.min(parseFloat(dropTop) + 12, 90)
      : 88
  );
  const layoutExitLeft = `${Math.max(
    sceneLeftValue + 10,
    guideOriginLeft - 38
  )}%`;
  const totalPathWeight =
    introDropStepCount + introLeftStepCount + introApproachStepCount;
  const dropPhaseEnd = introDropStepCount / totalPathWeight;
  const leftPhaseEnd = (introDropStepCount + introLeftStepCount) / totalPathWeight;
  const introLeftPath = [
    guideOrigin.left,
    guideOrigin.left,
    layoutExitLeft,
    scene.left,
  ];
  const introTopPath = [
    guideOrigin.top,
    `${introDropEndTop}%`,
    `${introDropEndTop}%`,
    scene.top,
  ];
  const returnLeftPath = [
    returnScene.left,
    layoutExitLeft,
    guideOrigin.left,
    guideOrigin.left,
  ];
  const returnTopPath = [
    returnScene.top,
    `${introDropEndTop}%`,
    `${introDropEndTop}%`,
    guideOrigin.top,
  ];
  const introScalePath = [1.16, 1.16, 1.08, 1];
  const returnScalePath = [1, 1.08, 1.16, 1.16];
  const pathTimes = [0, dropPhaseEnd, leftPhaseEnd, 1];

  return (
    <div className="pointer-events-none absolute inset-0 z-20 hidden lg:block">
      {!isIntroWalk && !isReturnWalk && (
        <motion.div
          className="signup-guide__origin"
          style={{ left: guideOrigin.left, top: guideOrigin.top }}
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.14, 0.32, 0.14],
          }}
          transition={{
            duration: 2.4,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      )}

      <motion.div
        className={`signup-guide ${isIntroWalk ? "signup-guide--intro" : ""}`}
        initial={
          isIntroWalk
            ? {
                left: guideOrigin.left,
                top: guideOrigin.top,
                opacity: 0,
                scale: 1.16,
              }
            : false
        }
        animate={
          isIntroWalk
            ? {
                left: introLeftPath,
                top: introTopPath,
                opacity: 1,
                scale: introScalePath,
              }
            : isReturnWalk
              ? {
                  left: returnLeftPath,
                  top: returnTopPath,
                  opacity: 1,
                  scale: returnScalePath,
                }
            : {
                left: scene.left,
                top: scene.top,
                opacity: 1,
                scale: 1,
              }
        }
        transition={
          isIntroWalk
            ? {
                left: {
                  duration: 1.1,
                  ease: "linear",
                  times: pathTimes,
                },
                top: {
                  duration: 1.1,
                  ease: "linear",
                  times: pathTimes,
                },
                scale: {
                  duration: 1.1,
                  ease: "linear",
                  times: pathTimes,
                },
                opacity: {
                  duration: 0.08,
                  ease: "linear",
                },
              }
            : isReturnWalk
              ? {
                  left: {
                    duration: 2.19,
                    ease: "linear",
                    times: pathTimes,
                  },
                  top: {
                    duration: 2.19,
                    ease: "linear",
                    times: pathTimes,
                  },
                  scale: {
                    duration: 2.19,
                    ease: "linear",
                    times: pathTimes,
                  },
                  opacity: {
                    duration: 0.08,
                    ease: "linear",
                  },
                }
            : {
                type: "spring",
                stiffness: 82,
                damping: 14,
                mass: 0.9,
              }
        }
        onAnimationComplete={() => {
          if (isIntroWalk) {
            onIntroComplete();
          }
          if (isReturnWalk) {
            onReturnComplete();
          }
        }}
      >
        <GuideCharacter
          className="signup-guide__walker"
          gliding={isIntroWalk || isReturnWalk}
        />

        <AnimatePresence mode="wait">
          {showBubble && (
          <motion.div
            key={step}
            className="signup-guide__bubble"
            initial={{ opacity: 0, y: 16, scale: 0.92 }}
            animate={{
              opacity: 1,
              y: 0,
              scale: 1,
            }}
            exit={{ opacity: 0, y: -10, scale: 0.92 }}
            transition={{ duration: 0.35, ease: "easeOut" }}
          >
            <p>{scene.message}</p>
          </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}

export default function App() {

  /* 🔹 SLIDE STATE */
  const [isSignup, setIsSignup] = useState(false);
  const [signupStep, setSignupStep] = useState(0);
  const [signupIntroActive, setSignupIntroActive] = useState(false);
  const [signupGuideReturning, setSignupGuideReturning] = useState(false);
  const [signupGuideOriginPosition, setSignupGuideOriginPosition] = useState(
    signupGuideOriginFallback
  );
  const [signupGuideDropTopPosition, setSignupGuideDropTopPosition] = useState("79%");
  const [signupGuideSceneTargets, setSignupGuideSceneTargets] = useState(signupGuideScenes);

  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [error, setError] = useState("");
  const [showSuccess, setShowSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const [captchaVerified, setCaptchaVerified] = useState(false);

  // 🔹 Signup States
const [name, setName] = useState("");
const [signupEmail, setSignupEmail] = useState("");
const [signupPassword, setSignupPassword] = useState("");
const [role, setRole] = useState("");
const [mobile, setMobile] = useState("");
const [country, setCountry] = useState("");
const [artTypes, setArtTypes] = useState([]);
const [signupTerms, setSignupTerms] = useState(false);
const [signupCaptchaVerified, setSignupCaptchaVerified] = useState(false);

const [countryCode, setCountryCode] = useState("+91");
const [ccOpen, setCcOpen] = useState(false);

const countryCodes = [
  {code:"+91",name:"India"},{code:"+1",name:"USA"},{code:"+44",name:"UK"},
  {code:"+61",name:"Australia"},{code:"+81",name:"Japan"},{code:"+86",name:"China"},
  {code:"+49",name:"Germany"},{code:"+33",name:"France"},{code:"+39",name:"Italy"},
  {code:"+34",name:"Spain"},{code:"+7",name:"Russia"},{code:"+55",name:"Brazil"},
  {code:"+52",name:"Mexico"},{code:"+27",name:"South Africa"},{code:"+971",name:"UAE"},
  {code:"+966",name:"Saudi Arabia"},{code:"+65",name:"Singapore"},{code:"+60",name:"Malaysia"},
  {code:"+63",name:"Philippines"},{code:"+92",name:"Pakistan"},{code:"+880",name:"Bangladesh"},
  {code:"+94",name:"Sri Lanka"},{code:"+977",name:"Nepal"},{code:"+31",name:"Netherlands"},
  {code:"+46",name:"Sweden"},{code:"+47",name:"Norway"},{code:"+45",name:"Denmark"},
  {code:"+41",name:"Switzerland"},{code:"+43",name:"Austria"},{code:"+32",name:"Belgium"},
  {code:"+351",name:"Portugal"},{code:"+30",name:"Greece"},{code:"+48",name:"Poland"},
  {code:"+90",name:"Turkey"},{code:"+20",name:"Egypt"},{code:"+234",name:"Nigeria"},
  {code:"+254",name:"Kenya"},{code:"+233",name:"Ghana"},{code:"+62",name:"Indonesia"},
  {code:"+66",name:"Thailand"},{code:"+84",name:"Vietnam"},{code:"+82",name:"South Korea"},
  {code:"+64",name:"New Zealand"},{code:"+54",name:"Argentina"},{code:"+56",name:"Chile"},
  {code:"+57",name:"Colombia"},{code:"+51",name:"Peru"},
];

  const [showForgotModal, setShowForgotModal] = useState(false);
  const [resetEmail, setResetEmail] = useState("");
  const [resetMessage, setResetMessage] = useState("");

  const recaptchaRef = useRef();
  const signupSectionRef = useRef(null);
  const signupLayoutHelperRef = useRef(null);
  const signupLayoutArtRef = useRef(null);
  const signupEmailInputRef = useRef(null);
  const signupPasswordInputRef = useRef(null);
  const signupRoleGroupRef = useRef(null);
  const signupFormRef = useRef(null);

  const emailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(loginEmail);
  const passwordValid = loginPassword.length >= 6;
  const resetEmailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(resetEmail);

  // 🔹 Signup Validations
const nameValid = /^[A-Za-z ]{3,}$/.test(name);
const signupEmailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(signupEmail);
const signupPasswordValid =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/.test(signupPassword);

  const handleLogin = () => {
    if (!emailValid) {
      setError("Enter a valid email address.");
      return;
    }
    if (!passwordValid) {
      setError("Password must be at least 6 characters.");
      return;
    }
    if (!termsAccepted) {
      setError("Please accept Terms & Conditions.");
      return;
    }
    if (!captchaVerified) {
      setError("Please verify that you are not a robot.");
      return;
    }

    setError("");
    setLoading(true);

    setTimeout(() => {
      if (
        loginEmail === "admin@gmail.com" &&
        loginPassword === "Admin@123"
      ) {
        setShowSuccess(true);
      } else {
        setError("Invalid email or password.");
      }
      setLoading(false);
      recaptchaRef.current.reset();
      setCaptchaVerified(false);
    }, 1200);
  };

  const handleResetPassword = () => {
    if (!resetEmailValid) {
      setResetMessage("Enter a valid email address.");
      return;
    }

    setResetMessage("Sending reset link...");

    setTimeout(() => {
      setResetMessage("Password reset link sent successfully!");
    }, 1000);
  };

  const handleGoogleSuccess = () => {
    setShowSuccess(true);
  };

  const handleGoogleError = () => {
    setError("Google Login Failed.");
  };

  const openSignupPanel = () => {
    setIsSignup(true);
    setSignupStep(0);
    setSignupIntroActive(false);
    setSignupGuideReturning(false);
    window.scrollTo({ top: window.innerHeight, behavior: "smooth" });
  };

  const closeSignupPanel = () => {
    setIsSignup(false);
    setSignupStep(0);
    setSignupIntroActive(false);
    setSignupGuideReturning(false);
  };

  const syncSignupGuideOrigin = () => {
    if (
      !signupSectionRef.current ||
      !signupLayoutHelperRef.current ||
      !signupLayoutArtRef.current
    ) {
      return;
    }

    const sectionRect = signupSectionRef.current.getBoundingClientRect();
    const helperRect = signupLayoutHelperRef.current.getBoundingClientRect();
    const layoutArtRect = signupLayoutArtRef.current.getBoundingClientRect();

    const leftPx = helperRect.left - sectionRect.left - 8;
    const topPx = helperRect.top - sectionRect.top;
    const maxVisibleTopPx = sectionRect.height - helperRect.height - 20;
    const safeDropTopPx = Math.min(
      Math.max(
        topPx + 40,
        layoutArtRect.bottom - sectionRect.top - helperRect.height + 10
      ),
      maxVisibleTopPx
    );

    setSignupGuideOriginPosition({
      left: `${(leftPx / sectionRect.width) * 100}%`,
      top: `${(topPx / sectionRect.height) * 100}%`,
    });
    setSignupGuideDropTopPosition(`${(safeDropTopPx / sectionRect.height) * 100}%`);
  };

  const syncSignupGuideTargets = () => {
    if (!signupSectionRef.current || !signupEmailInputRef.current) {
      return;
    }

    const sectionRect = signupSectionRef.current.getBoundingClientRect();
    const whitePanelWidthPx = sectionRect.width * 0.5;
    const guideWidthPx = 190;
    const helperSeamAllowancePx = 36;
    const maxLeftPx = whitePanelWidthPx - guideWidthPx + helperSeamAllowancePx;
    const calcLeftPercent = (rect, offsetPx) => {
      const leftPx = Math.min(
        Math.max(rect.right - sectionRect.left + offsetPx, 0),
        maxLeftPx
      );
      return `${(leftPx / sectionRect.width) * 100}%`;
    };
    const calcTopPercent = (rect, offsetPx) => {
      const topPx = Math.max(
        rect.top - sectionRect.top + rect.height * 0.5 - offsetPx,
        0
      );
      return `${(topPx / sectionRect.height) * 100}%`;
    };

    const emailRect = signupEmailInputRef.current.getBoundingClientRect();
    const passwordRect =
      signupPasswordInputRef.current?.getBoundingClientRect() || emailRect;
    
    const roleRect =
      signupRoleGroupRef.current?.getBoundingClientRect() || passwordRect;

    setSignupGuideSceneTargets({
      ...signupGuideScenes,
      1: {
        ...signupGuideScenes[1],
        left: calcLeftPercent(emailRect, 30),
        top: calcTopPercent(emailRect, 112),
      },
      2: {
        ...signupGuideScenes[2],
        left: calcLeftPercent(emailRect, 30),
        top: calcTopPercent(emailRect, 112),
      },
      3: {
  ...signupGuideScenes[3],
  left: calcLeftPercent(emailRect, 30),
  top: calcTopPercent(passwordRect, 112),
},
4: {
  ...signupGuideScenes[4],
  left: calcLeftPercent(emailRect, 30),
  top: calcTopPercent(passwordRect, 112),
},
    });
  };

  useEffect(() => {
    if (!isSignup || signupStep !== 0) {
      return undefined;
    }

    const timer = window.setTimeout(() => {
      syncSignupGuideOrigin();
      setSignupStep(1);
      setSignupIntroActive(true);
    }, 780);

    return () => window.clearTimeout(timer);
  }, [isSignup, signupStep]);

  useEffect(() => {
  if (signupStep === 6) {
    setSignupGuideReturning(true);
  }
}, [signupStep]);


useEffect(() => {
  if (window.innerWidth < 1024 && signupFormRef.current) {
    setTimeout(() => {
      signupFormRef.current.scrollTo({
        top: signupFormRef.current.scrollHeight,
        behavior: 'smooth'
      });
    }, 150);
  }
}, [signupStep, signupEmailValid, signupPasswordValid, role, signupCaptchaVerified, signupTerms]);

  useEffect(() => {
    if (!isSignup) {
      setSignupGuideOriginPosition(signupGuideOriginFallback);
      return undefined;
    }

    const runSync = () => syncSignupGuideOrigin();
    const rafId = window.requestAnimationFrame(runSync);

    window.addEventListener("resize", runSync);

    return () => {
      window.cancelAnimationFrame(rafId);
      window.removeEventListener("resize", runSync);
    };
  }, [isSignup]);

  useEffect(() => {
    if (!isSignup) {
      setSignupGuideSceneTargets(signupGuideScenes);
      return undefined;
    }
  
   

    const runSync = () => syncSignupGuideTargets();
    const rafId = window.requestAnimationFrame(runSync);
    const timerId = window.setTimeout(runSync, 120);

    window.addEventListener("resize", runSync);

    return () => {
      window.cancelAnimationFrame(rafId);
      window.clearTimeout(timerId);
      window.removeEventListener("resize", runSync);
    };
  }, [isSignup, signupStep, signupEmailValid, signupPasswordValid, role]);

  return (

    /* 🔥 OUTER WRAPPER (NEW) */
   <div className="relative min-h-screen w-screen bg-[#f8f5ec] pt-25">
    {/* <img
  src={logo}
  alt="logo"
  className="absolute top-3 right-4 lg:top-4 z-50 w-12 lg:w-20 bg-white p-2 rounded-xl shadow-lg transition-all duration-700"
  style={{
    right: isSignup ? "auto" : "20px",
    left: isSignup ? "20px" : "auto"
  }}
/> */}

    <motion.div
  className="hidden lg:block absolute top-0 h-full w-[50%] bg-gradient-to-br from-yellow-400 to-yellow-500 z-0"
  animate={{
    left: isSignup ? "50%" : "0%",
    clipPath: isSignup
      ? "polygon(15% 0%,100% 0%,100% 100%,15% 100%,0% 50%)"
      : "polygon(0% 0%,85% 0%,100% 50%,85% 100%,0% 100%)"
  }}
  transition={{ duration: 0.8, ease: "easeInOut" }}
/>

      

      {/* 🔥 SLIDING CONTAINER (NEW) */}
      <div
  className={`relative z-10 flex flex-col lg:flex-row w-full lg:w-[200%] h-full transition-transform duration-700 ${
    isSignup ? "lg:-translate-x-1/2" : "translate-x-0"
  }`}
>

        {/* ================= LOGIN SECTION (UNCHANGED) ================= */}
        <div className={`w-full lg:w-1/2 flex flex-col lg:flex-row ${isSignup ? "hidden lg:flex" : ""}`}>

          {/* LEFT GOLD SECTION */}
          <div
  className="w-full lg:w-1/2 flex flex-col items-center justify-center text-black lg:text-white text-center px-6 lg:px-16 mt-0 lg:mt-0 bg-yellow-400 lg:bg-transparent pt-12 pb-8 lg:py-0"
  style={{
    clipPath: window.innerWidth < 1024
      ? "ellipse(160% 85% at 50% 0%)"
      : "none"
  }}
>
            <h2 className="text-3xl lg:text-5xl font-semibold mb-4 lg:mb-6">New here ?</h2>

            <p className="text-sm lg:text-lg mb-2 lg:mb-10 max-w-md">
              Unleash your creativity & explore a world of art.
              Join our community today and discover unique pieces
              that inspire you!
            </p>

            {/* 🔥 ONLY CHANGE: onClick added */}
            <button
  onClick={openSignupPanel}
              className="border-2 border-black lg:border-white px-10 py-3 rounded-full hover:bg-white hover:text-yellow-500 transition mt-2"
            >
              JOIN US
            </button>

            <div className="mt-4">
              <img
                src="https://illustrations.popsy.co/yellow/web-design.svg"
                alt="illustration"
                className="hidden lg:block w-full max-w-xs animate-float"
              />
            </div>
            

          </div>

          {/* RIGHT LOGIN SECTION */}
          <div className="relative w-full lg:w-1/2 flex flex-col justify-start lg:justify-center px-6 lg:px-24 mt-0 lg:mt-0 opacity-0 animate-fadeIn items-center">

            <h2 className="text-3xl lg:text-4xl font-semibold mb-1 text-center lg:text-left">LOGIN</h2>
            <p className="text-gray-500 mb-6 lg:mb-10 text-center lg:text-left">
              Enter Login details to get access
            </p>

            
  <div className="mb-4 w-full max-w-xs">
  <input
    type="email"
    value={loginEmail}
    onChange={(e) => setLoginEmail(e.target.value)}
    placeholder="Email Address"
    className={`w-full px-4 py-2 border rounded-lg bg-white/80 backdrop-blur-sm text-gray-800 placeholder-gray-400 outline-none 
    transition-all duration-300 
    focus:ring-2 focus:ring-yellow-500 
    focus:shadow-md focus:-translate-y-1 ${
      loginEmail && !emailValid
        ? "border-red-500"
        : "border-gray-300"
    }`}
  />
</div>

            {loginEmail.length > 3 && !emailValid && (
              <p className="text-red-500 text-sm mb-4">
                Invalid email format.
              </p>
            )}

            

            <div className="relative mb-2 w-full max-w-xs">
              <input
                type={showPassword ? "text" : "password"}
                value={loginPassword}
                onChange={(e) => setLoginPassword(e.target.value)}
                placeholder="Password"
                className={`w-full px-4 py-2 border rounded-lg bg-white/80 backdrop-blur-sm text-gray-800 placeholder-gray-400 outline-none 
transition-all duration-300 
focus:ring-2 focus:ring-yellow-500 
focus:shadow-md focus:-translate-y-1 ${
  loginPassword && !passwordValid
    ? "border-red-500"
    : "border-gray-300"
}`}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-4 text-sm text-gray-500"
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>

            {loginPassword && !passwordValid && (
              <p className="text-red-500 text-sm mb-4">
                Password must be at least 6 characters.
              </p>
            )}

            <div className="w-full max-w-xs flex justify-end items-center mt-1 mb-3">
              <button
                onClick={() => {
                  setShowForgotModal(true);
                  setResetEmail("");
                  setResetMessage("");
                }}
                className="text-yellow-600 hover:underline text-sm ml-auto pr-3"
              >
                Forgot Password?
              </button>
            </div>

           <label className="mb-3 flex items-center gap-2 w-full max-w-xs mx-auto lg:mx-0">
  <input
    type="checkbox"
    className="mt-1 flex-shrink-0"
    checked={termsAccepted}
    onChange={(e) => setTermsAccepted(e.target.checked)}
  />
  <span className="text-xs lg:text-sm leading-tight">
    I Accept The Terms & Conditions & Privacy Policy.
  </span>
</label>

            <div className="mb-3">
              <ReCAPTCHA
                sitekey="6Le_DHQsAAAAAAJW1W3PhcnsUWmmLx_bBdh6m-Pw"
                onChange={() => setCaptchaVerified(true)}
                ref={recaptchaRef}
              />
            </div>

            {error && (
              <p className="text-red-500 mb-4">{error}</p>
            )}

            <button
  onClick={handleLogin}
  disabled={loading}
  className={`mx-auto lg:mx-auto w-60 py-3 rounded-full text-base font-medium text-white transition-all duration-200 ${
  loading
    ? "bg-yellow-300 cursor-not-allowed"
    : "bg-yellow-600 hover:bg-yellow-700 hover:scale-105 active:scale-95 active:shadow-inner"
}`}
            >
              {loading ? "Logging in..." : "LOGIN"}
            </button>

            <div className="flex items-center my-5 w-full max-w-xs mx-auto">
              <div className="flex-1 border-t"></div>
              <span className="px-4 text-gray-400">OR</span>
              <div className="flex-1 border-t"></div>
            </div>

            <div className="mx-auto w-60 flex justify-center lg:mx-auto">
  <GoogleLogin
    onSuccess={handleGoogleSuccess}
    onError={handleGoogleError}
    theme="outline"
    size="large"
    text="signin_with"
    shape="pill"
    width="240"
  />
</div>

          </div>
        </div>

        {/* ================= EMPTY SIGNUP SECTION (FOR NOW) ================= */}
        {/* ================= SIGNUP SECTION ================= */}
<div
  ref={signupSectionRef}
  className={`relative w-full lg:w-1/2 flex flex-col lg:flex-row h-full ${!isSignup ? "hidden lg:flex" : ""}`}
>

  {isSignup && (signupIntroActive || (signupStep > 0 && signupStep < 6) || signupGuideReturning) && (
    <SignupWalkGuide
      step={signupStep}
      introActive={signupIntroActive}
      isReturning={signupGuideReturning}
      origin={signupGuideOriginPosition}
      dropTop={signupGuideDropTopPosition}
      sceneTargets={signupGuideSceneTargets}
      onIntroComplete={() => setSignupIntroActive(false)}
      onReturnComplete={() => {
  setSignupGuideReturning(false);
  
}}
    />
  )}

  {/* LEFT SIGNUP FORM */}
  <div ref={signupFormRef} className={`relative w-full lg:w-1/2 flex flex-col justify-start lg:justify-center items-center pt-10 lg:pb-0 lg:pt-0 px-6 lg:px-24 min-h-[calc(100vh-200px)] lg:min-h-0 lg:h-auto overflow-y-auto lg:overflow-visible ${signupTerms ? 'pb-[170px]' : signupCaptchaVerified ? 'pb-[220px]' : role === 'artist' ? 'pb-[220px]' : role ? 'pb-[220px]' : signupPasswordValid ? 'pb-[220px]' : signupEmailValid ? 'pb-[220px]' : 'pb-[220px]'}`}>

    <h2 className="text-4xl font-semibold mb-2">JOIN US</h2>
    <p className="text-gray-500 mb-4">
      Enter your details to get access
    </p>
<div className="signup-anim-container w-full lg:max-w-md">
{/* NAME + EMAIL ROW */}
<div className="relative w-full mx-auto mb-3 lg:mb-6 grid grid-cols-1 lg:grid-cols-2 gap-3">

  <p className="block lg:hidden text-xs font-medium text-gray-600 mb-1">Full Name</p>
  <input
    type="text"
    value={name}
    onFocus={() => setSignupStep(1)}
    onChange={(e) => {
      const nextName = e.target.value;
      setName(nextName);
      if (/^[A-Za-z ]{3,}$/.test(nextName)) {
        setSignupStep(2);
      }
    }}
    placeholder="Full Name"
    className={`signup-anim-field px-4 py-3 border rounded-lg bg-white/80 backdrop-blur-sm text-gray-800 placeholder-transparent lg:placeholder-gray-400 w-full focus:ring-2 focus:ring-yellow-500 transition ${
      name && !nameValid ? "border-red-500" : "border-gray-300"
    }`}
  />

  {(nameValid || window.innerWidth >= 1024) && (
  <>
  <p className="block lg:hidden text-xs font-medium text-gray-600 mb-1">Email Address</p>
  <input
    ref={signupEmailInputRef}
    type="email"
    value={signupEmail}
    onFocus={() => setSignupStep(2)}
    onChange={(e) => {
      const nextEmail = e.target.value;
      setSignupEmail(nextEmail);
      if (
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(nextEmail)
      ) {
        setSignupStep(3);
      }
    }}
    placeholder="Email"
    className={`signup-anim-field px-4 py-3 border rounded-lg bg-white/80 backdrop-blur-sm text-gray-800 placeholder-transparent lg:placeholder-gray-400 w-full focus:ring-2 focus:ring-yellow-500 transition ${
      signupEmail && !signupEmailValid
        ? "border-red-500"
        : "border-gray-300"
    }`}
  />
  </>
)}

</div>

{name && !nameValid && (
  <p className="text-red-500 text-sm mb-4">
    Name must be at least 3 letters (no special characters).
  </p>
)}

{signupEmail && !signupEmailValid && (
  <p className="text-red-500 text-sm mb-4">
    Enter a valid email address.
  </p>
)}



{/* PASSWORD (SHOW ONLY IF EMAIL VALID) */}
{signupEmailValid && (
  <>

  <div className="relative w-full lg:max-w-md mx-auto mb-3 lg:mb-6 grid grid-cols-1 lg:grid-cols-2 gap-3">

  {/* PASSWORD */}
  <p className="block lg:hidden text-xs font-medium text-gray-600 mb-1">Password</p>
  <input
    ref={signupPasswordInputRef}
    type="password"
    value={signupPassword}
    onFocus={() => setSignupStep(3)}
    onChange={(e) => {
      const nextPassword = e.target.value;
      setSignupPassword(nextPassword);
      if (
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/.test(nextPassword)
      ) {
        setSignupStep(4);
      }
    }}
    placeholder="Password"
    className={`signup-anim-field px-4 py-3 border rounded-lg bg-white/80 backdrop-blur-sm text-gray-800 placeholder-transparent lg:placeholder-gray-400 w-full focus:ring-2 focus:ring-yellow-500 transition ${
      signupPassword && !signupPasswordValid
        ? "border-red-500"
        : "border-gray-300"
    }`}
  />

  {/* MOBILE */}
<div className={`grid grid-cols-[30%_65%] gap-3 ${!signupPasswordValid ? 'hidden lg:grid' : ''}`}>
  <p className="block lg:hidden text-xs font-medium text-gray-600 mb-1 col-span-2">Mobile Number</p>

  {/* COUNTRY CODE */}
  <div className="relative signup-anim-field">
    <button
      type="button"
      onClick={() => setCcOpen(!ccOpen)}
      className="cc-button px-1 py-3 border border-gray-300 rounded-lg w-full focus:ring-2 focus:ring-yellow-500 outline-none text-left flex items-center justify-between"
    >
      <span>{countryCode}</span>
      <span className="text-gray-400 text-xs">▾</span>
    </button>
    {ccOpen && (
      <div className="absolute left-0 top-full z-[70] bg-white border border-gray-300 rounded-lg shadow-xl max-h-48 overflow-y-auto w-44 mt-1">
        {countryCodes.map(({code, name}) => (
          <div
            key={code}
            onClick={() => { setCountryCode(code); setCcOpen(false); }}
            className="px-3 py-2 hover:bg-yellow-50 cursor-pointer text-sm"
          >
            {code} ({name})
          </div>
        ))}
      </div>
    )}
  </div>

  {/* MOBILE */}
  <input
  type="text"
  value={mobile}
  onFocus={() => setSignupStep(4)}
  onChange={(e) => {
    const val = e.target.value.replace(/\D/g, ""); // only numbers

    if (val.length <= 10) {
      setMobile(val);

    if (val.length === 10 && signupStep === 4) {
  setSignupStep(5);
}
    }
  }}
  className="signup-anim-field px-4 py-3 border border-gray-300 rounded-lg bg-white/80 backdrop-blur-sm text-gray-800 placeholder-gray-400 w-full focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 outline-none"
  />

</div>

</div>

    {signupPassword && !signupPasswordValid && (
      <p className="text-red-500 text-sm mb-4">
        Password must contain 1 uppercase, 1 lowercase,
        1 number, 1 special character (min 8 chars).
      </p>
    )}


    {/* ROLE SELECTION (SHOW ONLY IF PASSWORD VALID) */}
{signupPasswordValid && mobile.length === 10 && (
  <div
  ref={signupRoleGroupRef}
  className="flex flex-col w-full items-center mb-1 mt-0"
>
  <div style={{display:'flex', flexDirection:'row', justifyContent:'center', alignItems:'center', gap:'24px', width:'100%', marginBottom:'4px'}}>
    <label className="flex items-center gap-2 text-xs">
      <input
        type="radio"
        value="collector"
        checked={role === "collector"}
        onFocus={() => setSignupStep(4)}
        onChange={(e) => {
  setRole(e.target.value);
  setSignupStep(6); // 🔥 MOVE FORWARD IMMEDIATELY
}}
      />
      Art Lover / Collector
    </label>

    <label className="flex items-center gap-2 text-xs">
      <input
        type="radio"
        value="artist"
        checked={role === "artist"}
        onFocus={() => setSignupStep(4)}
        onChange={(e) => {
  setRole(e.target.value);
  setSignupStep(6); // 🔥 MOVE FORWARD IMMEDIATELY
}}
      />
      Artist
    </label>
      </div>

    {/* EXTRA FIELDS ONLY FOR ARTIST */}
{role === "artist" && (
  <div className="w-full flex flex-col gap-4 mt-4">

    {/* ART TYPES */}
    <div className="signup-anim-field grid grid-cols-3 lg:grid-cols-2 gap-3 w-full max-w-md mx-auto text-sm">
      {["Painting", "Sculpture", "Digital Art", "Drawing", "Photography", "Prints"].map((type) => (
        <label key={type} className="flex items-center gap-2 justify-start">
          <input
            type="checkbox"
            checked={artTypes.includes(type)}
            onChange={(e) => {
              if (e.target.checked) {
                setArtTypes([...artTypes, type]);
              } else {
                setArtTypes(artTypes.filter((t) => t !== type));
              }
            }}
          />
          {type}
        </label>
      ))}
    </div>

    {/* COUNTRY */}
    <div className="relative w-full max-w-xs lg:max-w-md mx-auto mb-3 lg:mb-6">
  <p className="block lg:hidden text-xs font-medium text-gray-600 mb-1">Country</p>    
  <select
    value={country}
    onChange={(e) => setCountry(e.target.value)}
    className="signup-anim-field px-4 py-3 border border-gray-300 rounded-lg bg-white/80 backdrop-blur-sm text-gray-800 w-full text-center focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 outline-none"
  >
    <option value="">Select Country</option>
    <option>Afghanistan</option><option>Albania</option><option>Algeria</option>
    <option>Argentina</option><option>Australia</option><option>Austria</option>
    <option>Bangladesh</option><option>Belgium</option><option>Brazil</option>
    <option>Canada</option><option>Chile</option><option>China</option>
    <option>Colombia</option><option>Croatia</option><option>Czech Republic</option>
    <option>Denmark</option><option>Egypt</option><option>Ethiopia</option>
    <option>Finland</option><option>France</option><option>Germany</option>
    <option>Ghana</option><option>Greece</option><option>Hungary</option>
    <option>India</option><option>Indonesia</option><option>Iran</option>
    <option>Iraq</option><option>Ireland</option><option>Israel</option>
    <option>Italy</option><option>Japan</option><option>Jordan</option>
    <option>Kenya</option><option>Kuwait</option><option>Malaysia</option>
    <option>Mexico</option><option>Morocco</option><option>Myanmar</option>
    <option>Nepal</option><option>Netherlands</option><option>New Zealand</option>
    <option>Nigeria</option><option>Norway</option><option>Pakistan</option>
    <option>Peru</option><option>Philippines</option><option>Poland</option>
    <option>Portugal</option><option>Qatar</option><option>Romania</option>
    <option>Russia</option><option>Saudi Arabia</option><option>Singapore</option>
    <option>South Africa</option><option>South Korea</option><option>Spain</option>
    <option>Sri Lanka</option><option>Sweden</option><option>Switzerland</option>
    <option>Thailand</option><option>Turkey</option><option>UAE</option>
    <option>Uganda</option><option>Ukraine</option><option>United Kingdom</option>
    <option>USA</option><option>Vietnam</option><option>Zimbabwe</option>
  </select>
</div>

  </div>
)}

  </div>
)}




{/* SIGNUP CAPTCHA (SHOW ONLY IF ROLE SELECTED) */}
{role && (
  <div className="signup-anim-field mb-4 relative w-full flex justify-center items-center">
    <ReCAPTCHA
      sitekey="6Le_DHQsAAAAAAJW1W3PhcnsUWmmLx_bBdh6m-Pw"
      onChange={() => {
        setSignupCaptchaVerified(true);
        setSignupStep(6);
      }}
    />
  </div> 
)}

{/* TERMS (SHOW ONLY IF CAPTCHA VERIFIED) */}
{signupCaptchaVerified && (
  <label className="signup-anim-field flex items-center justify-center gap-2 text-xs mb-6 text-center">
    <input
type="checkbox"
className="mt-0"
checked={signupTerms}
onChange={(e) => {
  setSignupTerms(e.target.checked);
  setSignupStep(e.target.checked ? 7 : 6);
}}
/>
    By registering, I accept the Terms & Conditions & Privacy Policy.
  </label>
)}
  </>
)}

   {/* JOIN BUTTON (SHOW ONLY IF TERMS ACCEPTED) */}
{signupTerms && (
  <button
  className="signup-anim-field w-full bg-yellow-500 text-white py-4 rounded-full mt-2 mb-4 lg:mb-0 hover:bg-yellow-600 transition"
>
  JOIN US
</button>
)}
</div>
<div
className="lg:hidden fixed bottom-0 left-0 w-full bg-yellow-400 text-center pt-2 pb-10"
style={{clipPath:"ellipse(160% 85% at 50% 100%)"}}
>

 <h2 className="text-xl font-semibold mt-10 mb-2">One of us?</h2>

  <p className="text-xs mb-3 px-6">
    Welcome back to your artistic haven! Log in to continue.
  </p>

  <button
    onClick={closeSignupPanel}
    className="border-2 border-black px-8 py-3 rounded-full hover:bg-black hover:text-white transition"
  >
    LOGIN
  </button>

</div>

  </div>

  {/* RIGHT GOLD PANEL */}
  <div className="hidden lg:flex relative w-full lg:w-1/2 flex-col items-center justify-center text-white text-center px-6 lg:px-16">

    <h2 className="text-5xl font-semibold mb-6">One of us ?</h2>

    <p className="text-lg mb-10 max-w-md">
      Welcome back to your artistic haven! Log in to continue.
    </p>

    <button
      onClick={closeSignupPanel}
      className="border-2 border-white px-10 py-3 rounded-full hover:bg-white hover:text-yellow-500 transition"
    >
      LOGIN
    </button>

    <div className="mt-10 relative w-full max-w-sm signup-layout-frame">
      <div className="hidden lg:block signup-layout-scene animate-float">
        {isSignup && !signupGuideReturning && (signupStep === 0 || signupStep >= 6) && (
          <motion.img
            src={signupGuideFigureArt}
            alt=""
            aria-hidden="true"
            ref={signupLayoutHelperRef}
            className="signup-layout-helper"
            initial={false}
            animate={
              signupIntroActive
                ? {
                    opacity: [1, 0],
                    scale: [1, 0.985],
                  }
                : signupGuideReturning
                  ? {
                      opacity: [0, 0.18, 1],
                      scale: [0.98, 1, 1],
                    }
                  : {
                      opacity: 1,
                      scale: 1,
                    }
            }
            transition={
              signupIntroActive
                ? {
                    duration: 0.06,
                    ease: "easeOut",
                  }
                : signupGuideReturning
                  ? {
                      duration: 0.34,
                      ease: "easeInOut",
                      times: [0, 0.42, 1],
                    }
                  : {
                      duration: 0.2,
                      ease: "easeOut",
                    }
            }
          />
        )}
        <img
          ref={signupLayoutArtRef}
          src={signupLayoutArt}
          alt="Artists collaborating illustration"
          className="w-full max-w-sm signup-layout-art"
        />
      </div>
    </div>

  </div>

</div>

      </div>

    </div>
  );
}
