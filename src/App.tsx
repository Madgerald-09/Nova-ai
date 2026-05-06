import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useTranslation } from "react-i18next";
import { useTheme } from "next-themes";
import { motion, AnimatePresence, type Variants } from "framer-motion";
import {
  Globe,
  Rocket,
  Search,
  ShieldCheck,
  Target,
  Activity,
  Zap,
  CheckCircle2,
  BarChart,
  FolderGit2,
  Users,
  Building2,
  Workflow,
  ArrowRight,
  Bot,
  FileText,
  Users2,
  Workflow as WorkflowIcon,
  DollarSign,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import AuthPage from "@/components/AuthPage";
import Overview from "./Overview";
import PublicProfileView from "./PublicProfileView";
import { JoinTeamView } from "./sections/JoinTeamView";
import { useApp } from "@/state/AppContext";
import type { Profile } from "@/types";
import type { AuthSuccessData } from "@/components/AuthPage";
import "./App.css";

function App() {
  const { t, i18n } = useTranslation();
  const { theme, setTheme } = useTheme();
  const [isLoading, setIsLoading] = useState(true);
  const [authOpen, setAuthOpen] = useState(false);
  const [authView, setAuthView] = useState<"signin" | "signup">("signup");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const { state, dispatch } = useApp();

  useEffect(() => {
    // Ensuring dark theme is explicitly set if somehow missed
    if (theme !== "dark") setTheme("dark");

    // Loader timeout
    const timer = setTimeout(() => setIsLoading(false), 2000);
    return () => clearTimeout(timer);
  }, [theme, setTheme]);

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
  };

  const openAuth = (view: "signin" | "signup") => {
    setAuthView(view);
    setAuthOpen(true);
  };

  const closeAuth = () => setAuthOpen(false);

  const handleAuthSuccess = (data: AuthSuccessData) => {
    if (data.type === "signup") {
      const mappedRole = ["investor", "founder", "recruiter"].includes(
        data.role,
      )
        ? "company"
        : "builder";
      const industry =
        data.role === "investor"
          ? "Venture Capital"
          : data.role === "recruiter"
            ? "Recruiting"
            : "Technology";

      const newProfile: Partial<Profile> = {
        userId: `user_${Date.now()}`,
        role: mappedRole,
        fullName: data.name || "New User",
        username: data.email?.split("@")[0] || `user${Date.now()}`,
        avatarUrl: `https://api.dicebear.com/7.x/avataaars/svg?seed=${Date.now()}`,
        email: data.email || "",
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };

      if (mappedRole === "builder") {
        Object.assign(newProfile, {
          skills: [],
          experienceLevel: "beginner",
          bio: "",
          portfolioLinks: [],
          availabilityStatus: "available",
          hoursPerWeek: 40,
          reputationScore: 0,
          completedProjects: 0,
        });
      } else if (mappedRole === "company") {
        Object.assign(newProfile, {
          companyName: data.name || "New Company",
          industry,
          companySize: "1-10",
          website: "",
          bio: "",
          postedProjects: 0,
        });
      }

      dispatch({ type: "NEW_SIGNUP", payload: newProfile as Profile });
    } else {
      const builder = state.builders.find((b) => b.email === data.email);
      const company = state.companies.find((c) => c.email === data.email);

      if (builder) {
        dispatch({ type: "LOGIN_USER", payload: builder });
      } else if (company) {
        dispatch({ type: "LOGIN_USER", payload: company });
      } else {
        dispatch({ type: "SWITCH_USER", payload: "builder" });
      }
    }

    setIsLoggedIn(true);
    setAuthOpen(false);
  };

  // Animation variants
  const staggerContainer: Variants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const fadeInUp: Variants = {
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
  };

  if (isLoggedIn) {
    return (
      <BrowserRouter>
        <Routes>
          <Route path="/profile/:userId" element={<PublicProfileView />} />
          <Route path="/" element={<Overview />} />
          <Route path="/join" element={<JoinTeamView />} />
        </Routes>
      </BrowserRouter>
    );
  }

  if (authOpen) {
    return (
      <BrowserRouter>
        <Routes>
          <Route path="/profile/:userId" element={<PublicProfileView />} />
          <Route
            path="/"
            element={
              <AuthPage
                view={authView}
                onClose={closeAuth}
                onViewChange={setAuthView}
                onSuccess={handleAuthSuccess}
              />
            }
          />
          <Route
            path="/join"
            element={
              <AuthPage
                view={authView}
                onClose={closeAuth}
                onViewChange={setAuthView}
                onSuccess={handleAuthSuccess}
              />
            }
          />
        </Routes>
      </BrowserRouter>
    );
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/profile/:userId" element={<PublicProfileView />} />
        <Route path="/join" element={<JoinTeamView />} />
        <Route
          path="/"
          element={
            <>
              <AnimatePresence>
                {isLoading && (
                  <motion.div
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.5, ease: "easeInOut" }}
                    className="fixed inset-0 z-[100] flex items-center justify-center bg-[#0a0a0a]"
                  >
                    <motion.div
                      animate={{
                        opacity: [0.3, 1, 0.3],
                        scale: [0.95, 1.05, 0.95],
                      }}
                      transition={{
                        duration: 1.2,
                        repeat: Infinity,
                        ease: "easeInOut",
                      }}
                      className="relative flex items-center justify-center w-32 h-32 rounded-[2rem] overflow-hidden shadow-2xl shadow-indigo-500/20"
                    >
                      <img
                        src="/Picsart_26-04-10_14-37-41-214.png"
                        alt="Loading NOVA..."
                        className="w-full h-full object-contain bg-[#0a0a0a] p-2"
                      />
                    </motion.div>
                  </motion.div>
                )}
              </AnimatePresence>

              <div className="min-h-screen bg-[#0a0a0a] text-slate-50 font-sans selection:bg-indigo-500 selection:text-white overflow-x-hidden">
                {/* Navigation */}
                <motion.nav
                  initial={{ y: -100, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{
                    duration: 0.6,
                    ease: [0.22, 1, 0.36, 1],
                    delay: 0.2,
                  }}
                  className="fixed top-0 w-full z-50 flex items-center justify-between px-6 py-4 bg-[#0a0a0a]/70 backdrop-blur-md border-b border-white/5 transition-all"
                >
                  <div className="flex items-center gap-3">
                    <div className="relative flex items-center justify-center w-10 h-10 rounded-xl overflow-hidden shadow-lg shadow-indigo-500/20">
                      <img
                        src="/Picsart_26-04-10_14-37-41-214.png"
                        alt="NOVA Logo"
                        className="w-full h-full object-contain bg-[#0a0a0a] p-1"
                      />
                    </div>
                    <div className="text-2xl font-bold tracking-tighter bg-clip-text text-transparent bg-gradient-to-r from-white to-slate-400">
                      NOVA
                    </div>
                  </div>
                  <div className="flex items-center gap-6">
                    <a
                      href="#how-it-works"
                      className="hidden md:block text-sm font-medium text-slate-400 hover:text-indigo-400 transition-colors"
                    >
                      {t("nav.howItWorks")}
                    </a>
                    <a
                      href="#features"
                      className="hidden md:block text-sm font-medium text-slate-400 hover:text-indigo-400 transition-colors"
                    >
                      {t("nav.features")}
                    </a>

                    <div className="flex items-center gap-3">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="w-9 h-9 text-slate-400 hover:bg-white/5 rounded-full"
                          >
                            <Globe className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent
                          align="end"
                          className="dark:bg-[#121212] dark:border-white/10 rounded-xl"
                        >
                          <DropdownMenuItem
                            onClick={() => changeLanguage("en")}
                            className="hover:bg-white/5"
                          >
                            English
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={() => changeLanguage("es")}
                            className="hover:bg-white/5"
                          >
                            Español
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={() => changeLanguage("fr")}
                            className="hover:bg-white/5"
                          >
                            Français
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={() => changeLanguage("de")}
                            className="hover:bg-white/5"
                          >
                            Deutsch
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={() => changeLanguage("pt")}
                            className="hover:bg-white/5"
                          >
                            Português
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>

                      <Button
                        variant="ghost"
                        className="hidden sm:flex text-sm font-medium hover:bg-white/5 rounded-full px-5"
                        onClick={() => openAuth("signin")}
                      >
                        {t("nav.signIn")}
                      </Button>
                      <Button
                        className="bg-white text-slate-900 hover:bg-slate-100 rounded-full px-6 shadow-xl shadow-white/10 transition-all hover:scale-105 active:scale-95"
                        onClick={() => openAuth("signup")}
                      >
                        {t("nav.getStarted")}
                      </Button>
                    </div>
                  </div>
                </motion.nav>

                {/* 1. HERO SECTION */}
                <section className="relative pt-40 pb-24 lg:pt-56 lg:pb-32 px-6 overflow-hidden flex flex-col items-center text-center">
                  <motion.div
                    animate={{ scale: [1, 1.1, 1], opacity: [0.3, 0.5, 0.3] }}
                    transition={{
                      duration: 8,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-indigo-500/20 blur-[120px] rounded-full pointer-events-none"
                  />
                  <motion.div
                    animate={{ scale: [1, 1.2, 1], opacity: [0.2, 0.4, 0.2] }}
                    transition={{
                      duration: 10,
                      repeat: Infinity,
                      ease: "easeInOut",
                      delay: 1,
                    }}
                    className="absolute top-0 right-0 w-[600px] h-[600px] bg-cyan-400/10 blur-[100px] rounded-full pointer-events-none"
                  />

                  <motion.div
                    variants={staggerContainer}
                    initial="hidden"
                    animate="show"
                    className="relative z-10 flex flex-col items-center max-w-5xl"
                  >
                    <motion.h1
                      variants={fadeInUp}
                      className="text-6xl md:text-8xl font-black tracking-tighter text-white mb-8 leading-[1.1]"
                    >
                      {t("hero.title1")}{" "}
                      <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 to-cyan-400">
                        {t("hero.title2")}
                      </span>
                    </motion.h1>

                    <motion.div
                      variants={fadeInUp}
                      className="flex flex-col items-center gap-4 mb-12"
                    >
                      <p className="text-xl md:text-2xl text-slate-400 max-w-3xl leading-relaxed font-medium">
                        {t("hero.subtitle")}
                      </p>
                    </motion.div>

                    <motion.div
                      variants={fadeInUp}
                      className="flex flex-col sm:flex-row gap-5"
                    >
                      <Button
                        size="lg"
                        className="h-14 px-10 text-lg bg-indigo-600 hover:bg-indigo-700 text-white rounded-full shadow-lg shadow-indigo-500/25 transition-all hover:-translate-y-1 group"
                        onClick={() => openAuth("signup")}
                      >
                        <Rocket className="mr-2 h-5 w-5 group-hover:animate-bounce" />
                        {t("hero.startBuilding")}
                      </Button>
                      <Button
                        variant="outline"
                        size="lg"
                        className="h-14 px-10 text-lg border-2 border-white/10 hover:border-white/20 hover:bg-white/5 text-white rounded-full transition-all hover:-translate-y-1"
                        onClick={() => openAuth("signin")}
                      >
                        <Search className="mr-2 h-5 w-5" />
                        {t("hero.exploreTalent")}
                      </Button>
                    </motion.div>

                    <motion.p
                      variants={fadeInUp}
                      className="text-sm font-medium text-slate-500 mt-10 uppercase tracking-widest"
                    >
                      {t("hero.tagline")}
                    </motion.p>
                  </motion.div>
                </section>

                {/* 2. PROBLEM SECTION */}
                <section className="py-24 lg:py-32 px-6 bg-[#0f0f11] border-y border-white/5 relative overflow-hidden">
                  <div className="max-w-6xl mx-auto flex flex-col md:flex-row gap-16 items-center relative z-10">
                    <motion.div
                      initial={{ opacity: 0, x: -50 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true, margin: "-100px" }}
                      transition={{ duration: 0.8 }}
                      className="flex-1 space-y-8"
                    >
                      <h2 className="text-4xl md:text-6xl font-black text-white tracking-tight leading-tight">
                        {t("problem.title1")} <br />
                        <span
                          className="text-red-400 glitch-text drop-shadow-[0_0_15px_rgba(239,68,68,0.5)]"
                          data-text={t("problem.title2")}
                        >
                          {t("problem.title2")}
                        </span>
                      </h2>
                      <p className="text-2xl font-light text-slate-400">
                        {t("problem.desc1")} <br />
                        <strong className="text-white font-bold">
                          {t("problem.desc2")}
                        </strong>
                      </p>
                    </motion.div>
                    <motion.div
                      variants={staggerContainer}
                      initial="hidden"
                      whileInView="show"
                      viewport={{ once: true, margin: "-100px" }}
                      className="flex-1 space-y-6"
                    >
                      {[
                        t("problem.point1"),
                        t("problem.point2"),
                        t("problem.point3"),
                      ].map((point, index) => (
                        <motion.div
                          key={index}
                          variants={fadeInUp}
                          className="flex items-start gap-4 p-6 bg-black/50 border border-white/5 rounded-2xl"
                        >
                          <div className="w-8 h-8 rounded-full bg-red-500/10 flex items-center justify-center shrink-0 mt-1">
                            <span className="text-red-400 font-bold">
                              &times;
                            </span>
                          </div>
                          <p className="text-xl font-medium text-slate-200">
                            {point}
                          </p>
                        </motion.div>
                      ))}
                    </motion.div>
                  </div>
                </section>

                {/* 3. SOLUTION SECTION */}
                <section className="py-32 px-6 relative overflow-hidden flex flex-col items-center text-center bg-[#050505]">
                  <div className="absolute inset-0 bg-[url('/noise.png')] opacity-[0.03] mix-blend-overlay"></div>
                  <motion.div
                    animate={{ scale: [1, 1.2, 1], opacity: [0.1, 0.3, 0.1] }}
                    transition={{ duration: 8, repeat: Infinity }}
                    className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-64 bg-indigo-500/20 blur-[100px] rounded-[100%] pointer-events-none"
                  />

                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.8 }}
                    className="max-w-4xl z-10"
                  >
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/20 text-sm font-semibold text-indigo-300 mb-8">
                      <Zap className="h-4 w-4" /> {t("solution.tag")}
                    </div>
                    <h2 className="text-4xl md:text-6xl font-black text-white tracking-tight mb-8">
                      {t("solution.title")}
                    </h2>
                    <p className="text-xl md:text-2xl text-slate-300 font-light mb-12 max-w-3xl mx-auto leading-relaxed">
                      {t("solution.desc")}
                    </p>
                    <div className="inline-block p-[2px] rounded-3xl bg-gradient-to-r from-indigo-500 via-purple-500 to-cyan-400 shadow-[0_0_40px_rgba(99,102,241,0.4)] transform hover:scale-[1.02] transition-transform duration-500">
                      <div className="bg-black px-8 py-6 md:px-12 md:py-8 rounded-[22px] backdrop-blur-xl">
                        <p className="text-2xl md:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-slate-400">
                          {t("solution.highlight1")}{" "}
                          <br className="hidden md:block" />
                          <span className="text-indigo-400">
                            {t("solution.highlight2")}
                          </span>
                        </p>
                      </div>
                    </div>
                  </motion.div>
                </section>

                {/* 4. HOW IT WORKS */}
                <section
                  id="how-it-works"
                  className="py-32 px-6 bg-[#0a0a0a] overflow-hidden"
                >
                  <div className="max-w-6xl mx-auto">
                    <motion.div
                      initial={{ opacity: 0, y: 30 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      className="text-center mb-20"
                    >
                      <h2 className="text-4xl md:text-5xl font-black text-white tracking-tight mb-6">
                        {t("flow.title")}
                      </h2>
                      <p className="text-xl text-slate-400 font-medium">
                        {t("flow.subtitle")}
                      </p>
                    </motion.div>

                    <motion.div
                      variants={staggerContainer}
                      initial="hidden"
                      whileInView="show"
                      viewport={{ once: true, margin: "-100px" }}
                      className="grid md:grid-cols-3 gap-8 relative"
                    >
                      <div className="hidden md:block absolute top-[120px] left-[15%] right-[15%] h-0.5 bg-gradient-to-r from-transparent via-white/10 to-transparent z-0" />

                      <motion.div
                        variants={fadeInUp}
                        className="relative z-10 flex flex-col items-center text-center p-8 bg-[#121212] rounded-3xl border border-white/5 hover:-translate-y-2 transition-transform duration-300"
                      >
                        <div className="w-24 h-24 rounded-2xl bg-indigo-500/10 flex items-center justify-center mb-8 rotate-3">
                          <Workflow className="w-10 h-10 text-indigo-400" />
                        </div>
                        <div className="h-8 flex items-center justify-center px-4 rounded-full bg-white/10 text-sm font-bold text-slate-300 mb-6">
                          {t("flow.step1.tag")}
                        </div>
                        <h3 className="text-2xl font-bold text-white mb-4">
                          {t("flow.step1.title")}
                        </h3>
                        <p className="text-slate-400 leading-relaxed">
                          {t("flow.step1.desc")}
                        </p>
                      </motion.div>

                      <motion.div
                        variants={fadeInUp}
                        className="relative z-10 flex flex-col items-center text-center p-8 bg-[#121212] rounded-3xl border border-white/5 hover:-translate-y-2 transition-transform duration-300"
                      >
                        <div className="w-24 h-24 rounded-2xl bg-cyan-500/10 flex items-center justify-center mb-8 -rotate-3">
                          <ShieldCheck className="w-10 h-10 text-cyan-400" />
                        </div>
                        <div className="h-8 flex items-center justify-center px-4 rounded-full bg-white/10 text-sm font-bold text-slate-300 mb-6">
                          {t("flow.step2.tag")}
                        </div>
                        <h3 className="text-2xl font-bold text-white mb-4">
                          {t("flow.step2.title")}
                        </h3>
                        <p className="text-slate-400 leading-relaxed">
                          {t("flow.step2.desc")}
                        </p>
                      </motion.div>

                      <motion.div
                        variants={fadeInUp}
                        className="relative z-10 flex flex-col items-center text-center p-8 bg-[#121212] rounded-3xl border border-white/5 hover:-translate-y-2 transition-transform duration-300"
                      >
                        <div className="w-24 h-24 rounded-2xl bg-emerald-500/10 flex items-center justify-center mb-8 rotate-3">
                          <Target className="w-10 h-10 text-emerald-400" />
                        </div>
                        <div className="h-8 flex items-center justify-center px-4 rounded-full bg-white/10 text-sm font-bold text-slate-300 mb-6">
                          {t("flow.step3.tag")}
                        </div>
                        <h3 className="text-2xl font-bold text-white mb-4">
                          {t("flow.step3.title")}
                        </h3>
                        <p className="text-slate-400 leading-relaxed">
                          {t("flow.step3.desc")}
                        </p>
                      </motion.div>
                    </motion.div>

                    <motion.div
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      transition={{ delay: 0.6, duration: 0.8 }}
                      viewport={{ once: true }}
                      className="mt-16 flex justify-center items-center gap-4 text-xl font-bold text-slate-400"
                    >
                      <span className="text-white">
                        {t("flow.step1.title")}
                      </span>
                      <ArrowRight className="w-5 h-5" />
                      <span className="text-white">
                        {t("flow.step2.title")}
                      </span>
                      <ArrowRight className="w-5 h-5" />
                      <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 to-cyan-400 border-b-2 border-indigo-500 pb-1">
                        {t("flow.step3.title")}
                      </span>
                    </motion.div>
                  </div>
                </section>

                {/* 5. CORE FEATURES */}
                <section
                  id="features"
                  className="py-32 px-6 bg-[#0f0f11] border-y border-white/5"
                >
                  <div className="max-w-6xl mx-auto">
                    <motion.div
                      initial={{ opacity: 0, y: 30 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      className="text-center mb-20"
                    >
                      <h2 className="text-4xl md:text-5xl font-black text-white tracking-tight mb-6">
                        {t("feat.title")}
                      </h2>
                      <p className="text-xl text-slate-400 mb-12">
                        {t("feat.subtitle")}
                      </p>
                    </motion.div>

                    <motion.div
                      variants={staggerContainer}
                      initial="hidden"
                      whileInView="show"
                      viewport={{ once: true, margin: "-100px" }}
                      className="grid md:grid-cols-3 gap-6"
                    >
                      <motion.div
                        variants={fadeInUp}
                        className="p-8 rounded-3xl bg-[#141414] border border-white/5 hover:border-blue-500/50 transition-colors group"
                      >
                        <div className="w-14 h-14 rounded-xl bg-black border border-white/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform shadow-sm">
                          <Bot className="w-7 h-7 text-blue-500" />
                        </div>
                        <h3 className="text-xl font-bold text-white mb-3">
                          {t("feat.f1.title")}
                        </h3>
                        <p className="text-base text-slate-400 leading-relaxed">
                          {t("feat.f1.desc")}
                        </p>
                      </motion.div>

                      <motion.div
                        variants={fadeInUp}
                        className="p-8 rounded-3xl bg-[#141414] border border-white/5 hover:border-green-500/50 transition-colors group"
                      >
                        <div className="w-14 h-14 rounded-xl bg-black border border-white/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform shadow-sm">
                          <FileText className="w-7 h-7 text-green-500" />
                        </div>
                        <h3 className="text-xl font-bold text-white mb-3">
                          {t("feat.f2.title")}
                        </h3>
                        <p className="text-base text-slate-400 leading-relaxed">
                          {t("feat.f2.desc")}
                        </p>
                      </motion.div>

                      <motion.div
                        variants={fadeInUp}
                        className="p-8 rounded-3xl bg-[#141414] border border-white/5 hover:border-sky-500/50 transition-colors group"
                      >
                        <div className="w-14 h-14 rounded-xl bg-black border border-white/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform shadow-sm">
                          <Search className="w-7 h-7 text-sky-500" />
                        </div>
                        <h3 className="text-xl font-bold text-white mb-3">
                          {t("feat.global.title")}
                        </h3>
                        <p className="text-base text-slate-400 leading-relaxed">
                          {t("feat.global.desc")}
                        </p>
                      </motion.div>

                      <motion.div
                        variants={fadeInUp}
                        className="p-8 rounded-3xl bg-[#141414] border border-white/5 hover:border-purple-500/50 transition-colors group"
                      >
                        <div className="w-14 h-14 rounded-xl bg-black border border-white/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform shadow-sm">
                          <Users2 className="w-7 h-7 text-purple-500" />
                        </div>
                        <h3 className="text-xl font-bold text-white mb-3">
                          {t("feat.f3.title")}
                        </h3>
                        <p className="text-base text-slate-400 leading-relaxed">
                          {t("feat.f3.desc")}
                        </p>
                      </motion.div>

                      <motion.div
                        variants={fadeInUp}
                        className="p-8 rounded-3xl bg-[#141414] border border-white/5 hover:border-orange-500/50 transition-colors group"
                      >
                        <div className="w-14 h-14 rounded-xl bg-black border border-white/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform shadow-sm">
                          <WorkflowIcon className="w-7 h-7 text-orange-500" />
                        </div>
                        <h3 className="text-xl font-bold text-white mb-3">
                          {t("feat.f4.title")}
                        </h3>
                        <p className="text-base text-slate-400 leading-relaxed">
                          {t("feat.f4.desc")}
                        </p>
                      </motion.div>

                      <motion.div
                        variants={fadeInUp}
                        className="p-8 rounded-3xl bg-[#141414] border border-white/5 hover:border-yellow-500/50 transition-colors group"
                      >
                        <div className="w-14 h-14 rounded-xl bg-black border border-white/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform shadow-sm">
                          <DollarSign className="w-7 h-7 text-yellow-500" />
                        </div>
                        <h3 className="text-xl font-bold text-white mb-3">
                          {t("feat.f5.title")}
                        </h3>
                        <p className="text-base text-slate-400 leading-relaxed">
                          {t("feat.f5.desc")}
                        </p>
                      </motion.div>

                      <motion.div
                        variants={fadeInUp}
                        className="p-8 rounded-3xl bg-[#141414] border border-white/5 hover:border-indigo-500/50 transition-colors group"
                      >
                        <div className="w-14 h-14 rounded-xl bg-black border border-white/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform shadow-sm">
                          <CheckCircle2 className="w-7 h-7 text-indigo-500" />
                        </div>
                        <h3 className="text-xl font-bold text-white mb-3">
                          {t("feat.f6.title")}
                        </h3>
                        <p className="text-base text-slate-400 leading-relaxed">
                          {t("feat.f6.desc")}
                        </p>
                      </motion.div>

                      <motion.div
                        variants={fadeInUp}
                        className="p-8 rounded-3xl bg-[#141414] border border-white/5 hover:border-cyan-500/50 transition-colors group"
                      >
                        <div className="w-14 h-14 rounded-xl bg-black border border-white/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform shadow-sm">
                          <BarChart className="w-7 h-7 text-cyan-500" />
                        </div>
                        <h3 className="text-xl font-bold text-white mb-3">
                          {t("feat.f7.title")}
                        </h3>
                        <p className="text-base text-slate-400 leading-relaxed">
                          {t("feat.f7.desc")}
                        </p>
                      </motion.div>

                      <motion.div
                        variants={fadeInUp}
                        className="p-8 rounded-3xl bg-[#141414] border border-white/5 hover:border-pink-500/50 transition-colors group"
                      >
                        <div className="w-14 h-14 rounded-xl bg-black border border-white/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform shadow-sm">
                          <FolderGit2 className="w-7 h-7 text-pink-500" />
                        </div>
                        <h3 className="text-xl font-bold text-white mb-3">
                          {t("feat.f8.title")}
                        </h3>
                        <p className="text-base text-slate-400 leading-relaxed">
                          {t("feat.f8.desc")}
                        </p>
                      </motion.div>

                      <motion.div
                        variants={fadeInUp}
                        className="p-8 rounded-3xl bg-[#141414] border border-white/5 hover:border-emerald-500/50 transition-colors group"
                      >
                        <div className="w-14 h-14 rounded-xl bg-black border border-white/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform shadow-sm">
                          <Globe className="w-7 h-7 text-emerald-500" />
                        </div>
                        <h3 className="text-xl font-bold text-white mb-3">
                          {t("feat.f9.title")}
                        </h3>
                        <p className="text-base text-slate-400 leading-relaxed">
                          {t("feat.f9.desc")}
                        </p>
                      </motion.div>
                    </motion.div>
                  </div>
                </section>

                {/* 6. MISSION SECTION */}
                <section className="py-32 px-6 bg-[#050505] text-center relative overflow-hidden">
                  <motion.div
                    animate={{ x: [0, 50, 0], opacity: [0.1, 0.2, 0.1] }}
                    transition={{
                      duration: 15,
                      repeat: Infinity,
                      ease: "linear",
                    }}
                    className="absolute top-0 right-0 w-[800px] h-[800px] bg-cyan-600/10 blur-[150px] rounded-full pointer-events-none"
                  />
                  <motion.div
                    animate={{ x: [0, -50, 0], opacity: [0.1, 0.2, 0.1] }}
                    transition={{
                      duration: 15,
                      repeat: Infinity,
                      ease: "linear",
                    }}
                    className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-indigo-600/10 blur-[120px] rounded-full pointer-events-none"
                  />

                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="max-w-4xl mx-auto relative z-10"
                  >
                    <h2 className="text-5xl md:text-7xl font-black text-white tracking-tight mb-10">
                      {t("mission.title")}
                    </h2>
                    <p className="text-2xl md:text-3xl text-slate-300 font-light leading-relaxed mb-12">
                      {t("mission.desc1")}
                      <br />
                      <strong className="text-white font-bold">
                        {t("mission.desc2")}
                      </strong>
                    </p>
                    <div className="inline-flex flex-col md:flex-row items-center justify-center gap-4 md:gap-8 px-8 py-5 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md hover:bg-white/10 transition-colors">
                      <span className="text-xl text-slate-400">
                        {t("mission.w1")}
                      </span>
                      <ArrowRight className="w-5 h-5 text-indigo-400 hidden md:block" />
                      <span className="text-xl text-slate-200 font-semibold">
                        {t("mission.w2")}
                      </span>
                      <ArrowRight className="w-5 h-5 text-cyan-400 hidden md:block" />
                      <span className="text-xl text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-cyan-300 font-bold">
                        {t("mission.w3")}
                      </span>
                    </div>
                  </motion.div>
                </section>

                {/* 7. FOR WHO */}
                <section className="py-32 px-6 bg-[#0a0a0a]">
                  <div className="max-w-7xl mx-auto">
                    <motion.div
                      variants={staggerContainer}
                      initial="hidden"
                      whileInView="show"
                      viewport={{ once: true, margin: "-100px" }}
                      className="grid lg:grid-cols-3 gap-8"
                    >
                      <motion.div
                        variants={fadeInUp}
                        className="p-12 rounded-[2.5rem] bg-indigo-950/20 border border-indigo-900/30"
                      >
                        <Users className="w-12 h-12 text-indigo-400 mb-8" />
                        <h3 className="text-3xl font-bold text-white mb-6">
                          {t("users.b.title")}
                        </h3>
                        <ul className="space-y-4">
                          <li className="flex items-center gap-3 text-lg text-slate-300">
                            <CheckCircle2 className="w-5 h-5 text-indigo-500" />{" "}
                            {t("users.b.1")}
                          </li>
                          <li className="flex items-center gap-3 text-lg text-slate-300">
                            <CheckCircle2 className="w-5 h-5 text-indigo-500" />{" "}
                            {t("users.b.2")}
                          </li>
                          <li className="flex items-center gap-3 text-lg text-slate-300">
                            <CheckCircle2 className="w-5 h-5 text-indigo-500" />{" "}
                            {t("users.b.3")}
                          </li>
                        </ul>
                      </motion.div>

                      <motion.div
                        variants={fadeInUp}
                        className="p-12 rounded-[2.5rem] bg-cyan-950/20 border border-cyan-900/30"
                      >
                        <Building2 className="w-12 h-12 text-cyan-400 mb-8" />
                        <h3 className="text-3xl font-bold text-white mb-6">
                          {t("users.c.title")}
                        </h3>
                        <ul className="space-y-4">
                          <li className="flex items-center gap-3 text-lg text-slate-300">
                            <CheckCircle2 className="w-5 h-5 text-cyan-500" />{" "}
                            {t("users.c.1")}
                          </li>
                          <li className="flex items-center gap-3 text-lg text-slate-300">
                            <CheckCircle2 className="w-5 h-5 text-cyan-500" />{" "}
                            {t("users.c.2")}
                          </li>
                          <li className="flex items-center gap-3 text-lg text-slate-300">
                            <CheckCircle2 className="w-5 h-5 text-cyan-500" />{" "}
                            {t("users.c.3")}
                          </li>
                        </ul>
                      </motion.div>

                      <motion.div
                        variants={fadeInUp}
                        className="p-12 rounded-[2.5rem] bg-emerald-950/20 border border-emerald-900/30"
                      >
                        <Activity className="w-12 h-12 text-emerald-400 mb-8" />
                        <h3 className="text-3xl font-bold text-white mb-6">
                          {t("users.e.title")}
                        </h3>
                        <ul className="space-y-4">
                          <li className="flex items-center gap-3 text-lg text-slate-300">
                            <CheckCircle2 className="w-5 h-5 text-emerald-500" />{" "}
                            {t("users.e.1")}
                          </li>
                          <li className="flex items-center gap-3 text-lg text-slate-300">
                            <CheckCircle2 className="w-5 h-5 text-emerald-500" />{" "}
                            {t("users.e.2")}
                          </li>
                          <li className="flex items-center gap-3 text-lg text-slate-300">
                            <CheckCircle2 className="w-5 h-5 text-emerald-500" />{" "}
                            {t("users.e.3")}
                          </li>
                        </ul>
                      </motion.div>
                    </motion.div>
                  </div>
                </section>

                {/* 8. SOCIAL PROOF */}
                <section className="py-24 px-6 border-y border-white/5 bg-[#121212]">
                  <div className="max-w-6xl mx-auto text-center">
                    <motion.h2
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      className="text-3xl md:text-4xl font-bold text-white mb-16 tracking-tight"
                    >
                      {t("proof.title")}
                    </motion.h2>

                    <motion.div
                      variants={staggerContainer}
                      initial="hidden"
                      whileInView="show"
                      viewport={{ once: true }}
                      className="grid grid-cols-1 md:grid-cols-3 gap-12 divide-y md:divide-y-0 md:divide-x divide-white/10"
                    >
                      <motion.div
                        variants={fadeInUp}
                        className="flex flex-col items-center pt-8 md:pt-0"
                      >
                        <div className="text-5xl md:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 to-indigo-400 mb-4">
                          {t("proof.stat1Num", "10k+")}
                        </div>
                        <div className="text-lg font-medium text-slate-400">
                          {t("proof.lbl1")}
                        </div>
                      </motion.div>
                      <motion.div
                        variants={fadeInUp}
                        className="flex flex-col items-center pt-8 md:pt-0"
                      >
                        <div className="text-5xl md:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-500 to-cyan-400 mb-4">
                          {t("proof.stat2Num", "5k+")}
                        </div>
                        <div className="text-lg font-medium text-slate-400">
                          {t("proof.lbl2")}
                        </div>
                      </motion.div>
                      <motion.div
                        variants={fadeInUp}
                        className="flex flex-col items-center pt-8 md:pt-0"
                      >
                        <div className="text-5xl md:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-emerald-500 to-emerald-400 mb-4">
                          {t("proof.stat3Num", "96%")}
                        </div>
                        <div className="text-lg font-medium text-slate-400">
                          {t("proof.lbl3")}
                        </div>
                      </motion.div>
                    </motion.div>
                  </div>
                </section>

                {/* 9. TRUST SECTION */}
                <section className="py-32 px-6 bg-[#0a0a0a]">
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95, y: 30 }}
                    whileInView={{ opacity: 1, scale: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.7 }}
                    className="max-w-4xl mx-auto text-center bg-[#141414] p-12 md:p-20 rounded-[3rem] border border-white/5 shadow-2xl hover:shadow-indigo-500/10 transition-shadow duration-500"
                  >
                    <ShieldCheck className="w-16 h-16 text-indigo-500 mx-auto mb-8" />
                    <h2 className="text-4xl md:text-5xl font-black text-white tracking-tight mb-10">
                      {t("trust.title")}
                    </h2>
                    <div className="flex flex-col md:flex-row justify-center gap-6 md:gap-12 text-left">
                      <div className="flex items-start gap-4">
                        <div className="w-2 h-2 rounded-full bg-indigo-500 mt-2.5 shrink-0" />
                        <div>
                          <h4 className="text-xl font-bold text-white mb-2">
                            {t("trust.t1.title")}
                          </h4>
                          <p className="text-slate-400">{t("trust.t1.desc")}</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-4">
                        <div className="w-2 h-2 rounded-full bg-cyan-500 mt-2.5 shrink-0" />
                        <div>
                          <h4 className="text-xl font-bold text-white mb-2">
                            {t("trust.t2.title")}
                          </h4>
                          <p className="text-slate-400">{t("trust.t2.desc")}</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-4">
                        <div className="w-2 h-2 rounded-full bg-emerald-500 mt-2.5 shrink-0" />
                        <div>
                          <h4 className="text-xl font-bold text-white mb-2">
                            {t("trust.t3.title")}
                          </h4>
                          <p className="text-slate-400">{t("trust.t3.desc")}</p>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                </section>

                {/* 10. FINAL CTA */}
                <section className="py-40 px-6 relative overflow-hidden bg-black flex flex-col items-center text-center">
                  <div className="absolute inset-0 bg-gradient-to-b from-transparent to-indigo-950/50 pointer-events-none" />
                  <motion.div
                    animate={{ scale: [1, 1.2, 1], opacity: [0.1, 0.3, 0.1] }}
                    transition={{
                      duration: 10,
                      repeat: Infinity,
                      ease: "linear",
                    }}
                    className="absolute right-0 top-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-cyan-500/10 blur-[100px] rounded-full pointer-events-none"
                  />

                  <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="relative z-10 max-w-3xl"
                  >
                    <h2 className="text-5xl md:text-7xl font-black text-white tracking-tight leading-tight mb-8">
                      {t("cta.title")}
                    </h2>
                    <p className="text-2xl text-indigo-200 font-light mb-12">
                      {t("cta.desc1")}{" "}
                      <strong className="text-white font-bold">
                        {t("cta.desc2")}
                      </strong>
                    </p>

                    <div className="flex flex-col sm:flex-row justify-center gap-5">
                      <Button
                        size="lg"
                        className="h-16 px-12 text-xl bg-gradient-to-r from-indigo-500 to-cyan-500 hover:from-indigo-600 hover:to-cyan-600 text-white rounded-full shadow-xl shadow-indigo-500/25 transition-all hover:scale-105"
                        onClick={() => openAuth("signup")}
                      >
                        <Rocket className="mr-2 h-6 w-6" />
                        {t("cta.btn1")}
                      </Button>
                      <Button
                        variant="outline"
                        size="lg"
                        className="h-16 px-12 text-xl border-2 border-white/20 hover:border-white/40 hover:bg-white/10 text-white rounded-full transition-all hover:scale-105 backdrop-blur-sm bg-white/5"
                        onClick={() => openAuth("signin")}
                      >
                        {t("cta.btn2")}
                      </Button>
                    </div>
                  </motion.div>
                </section>

                {/* 11. FOOTER */}
                <footer className="pt-20 pb-10 px-6 bg-[#050505] border-t border-white/5">
                  <div className="max-w-7xl mx-auto">
                    <motion.div
                      initial={{ opacity: 0, y: 30 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.6 }}
                      className="flex flex-col md:flex-row justify-between items-center md:items-start gap-12 mb-16"
                    >
                      <div className="flex flex-col items-center md:items-start">
                        <div className="flex items-center gap-3 mb-4">
                          <div className="flex items-center justify-center w-8 h-8 rounded-lg overflow-hidden bg-[#0a0a0a] p-1">
                            <img
                              src="/Picsart_26-04-10_14-37-41-214.png"
                              alt="NOVA Logo"
                              className="w-full h-full object-contain"
                            />
                          </div>
                          <div className="text-2xl font-bold tracking-tighter text-white">
                            NOVA
                          </div>
                        </div>
                        <div className="flex flex-col gap-1">
                          <p className="text-slate-400 font-medium tracking-widest uppercase text-sm">
                            Build. Prove. Grow.
                          </p>
                          <p className="text-slate-500 text-xs font-medium">
                            powered by UGENESIS
                          </p>
                        </div>
                      </div>

                      <div className="flex gap-12 md:gap-24 text-center md:text-left">
                        <div className="flex flex-col gap-4">
                          <h5 className="font-bold text-white">
                            {t("foot.plat")}
                          </h5>
                          <a
                            href="#"
                            className="text-slate-400 hover:text-indigo-500 transition-colors"
                          >
                            {t("foot.p1")}
                          </a>
                          <a
                            href="#"
                            className="text-slate-400 hover:text-indigo-500 transition-colors"
                          >
                            {t("foot.p2")}
                          </a>
                          <a
                            href="#how-it-works"
                            className="text-slate-400 hover:text-indigo-500 transition-colors"
                          >
                            {t("nav.howItWorks")}
                          </a>
                        </div>
                        <div className="flex flex-col gap-4">
                          <h5 className="font-bold text-white">
                            {t("foot.conn")}
                          </h5>
                          <a
                            href="#"
                            className="text-slate-400 hover:text-indigo-500 transition-colors"
                          >
                            {t("foot.c1")}
                          </a>
                          <a
                            href="#"
                            className="text-slate-400 hover:text-indigo-500 transition-colors"
                          >
                            {t("foot.c2")}
                          </a>
                          <a
                            href="#"
                            className="text-slate-400 hover:text-indigo-500 transition-colors"
                          >
                            {t("foot.c3")}
                          </a>
                        </div>
                      </div>
                    </motion.div>

                    <motion.div
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.6, delay: 0.2 }}
                      className="flex flex-col md:flex-row justify-between items-center pt-8 border-t border-white/5 text-sm text-slate-400"
                    >
                      <p>
                        &copy; {new Date().getFullYear()} {t("foot.copy")}
                      </p>
                      <div className="flex gap-6 mt-4 md:mt-0">
                        <a
                          href="#"
                          className="hover:text-slate-300 transition-colors"
                        >
                          {t("foot.priv")}
                        </a>
                        <a
                          href="#"
                          className="hover:text-slate-300 transition-colors"
                        >
                          {t("foot.terms")}
                        </a>
                      </div>
                    </motion.div>
                  </div>
                </footer>
              </div>
            </>
          }
        />
        <Route
          path="/join"
          element={
            <AuthPage
              view={authView}
              onClose={closeAuth}
              onViewChange={setAuthView}
              onSuccess={handleAuthSuccess}
            />
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
